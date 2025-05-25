package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"net/smtp"
	"os"
	"regexp"
	"strings"
	"time"

	"github.com/mattadlerpdx/personalWebsite/backend/internal/config"
)

// ContactForm represents the JSON payload
type ContactForm struct {
	Name    string `json:"name"`
	Email   string `json:"email"`
	Message string `json:"message"`
}

// sanitizeInput removes URLs from message body
func sanitizeInput(input string) string {
	re := regexp.MustCompile(`https?://[^\s]+`)
	return re.ReplaceAllString(input, "[LINK REMOVED]")
}

// logSubmission writes sanitized messages to a local file
func logSubmission(form ContactForm) {
	logEntry := fmt.Sprintf("[%s] Name: %s | Email: %s | Message: %s\n",
		time.Now().Format(time.RFC3339), form.Name, form.Email, form.Message)

	f, err := os.OpenFile("contact_submissions.log", os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
	if err == nil {
		defer f.Close()
		f.WriteString(logEntry)
	}
}

func ContactHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("X-Content-Type-Options", "nosniff")
	w.Header().Set("Referrer-Policy", "no-referrer")

	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var form ContactForm
	if err := json.NewDecoder(r.Body).Decode(&form); err != nil {
		http.Error(w, "Invalid JSON", http.StatusBadRequest)
		return
	}

	// Basic validation
	if strings.TrimSpace(form.Name) == "" || strings.TrimSpace(form.Email) == "" || strings.TrimSpace(form.Message) == "" {
		http.Error(w, "All fields are required", http.StatusBadRequest)
		return
	}

	form.Message = sanitizeInput(form.Message)
	logSubmission(form)

	// Compose message
	subject := "New Contact Form Submission"
	body := fmt.Sprintf("Name: %s\nEmail: %s\nMessage:\n%s", form.Name, form.Email, form.Message)

	// Email headers
	from := config.AppConfig.SMTPUser
	password := config.AppConfig.SMTPPass
	to := "matt.adler.pdx@gmail.com"

	headers := fmt.Sprintf(
		"From: %s\r\nReply-To: %s\r\nSubject: %s\r\n\r\n",
		from, form.Email, subject,
	)

	message := headers + body

	// Send via Gmail
	auth := smtp.PlainAuth("", from, password, "smtp.gmail.com")
	err := smtp.SendMail("smtp.gmail.com:587", auth, from, []string{to}, []byte(message))
	if err != nil {
		http.Error(w, `{"message":"Failed to send email"}`, http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte(`{"message":"Message sent successfully"}`))
}
