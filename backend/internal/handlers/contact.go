package handlers

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"net/smtp"
	"os"
	"time"

	"github.com/mattadlerpdx/personalWebsite/backend/internal/config"
	"github.com/mattadlerpdx/personalWebsite/backend/internal/models"
)

// logSubmission writes sanitized messages to a local file
func logSubmission(form models.ContactForm) {
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

	if r.Method != http.MethodPost {
		http.Error(w, `{"error":"Method not allowed"}`, http.StatusMethodNotAllowed)
		return
	}

	var form models.ContactForm
	if err := json.NewDecoder(r.Body).Decode(&form); err != nil {
		http.Error(w, `{"error":"Invalid JSON"}`, http.StatusBadRequest)
		return
	}

	// Validate form
	if err := form.Validate(); err != nil {
		log.Printf("Validation error: %v", err)
		http.Error(w, fmt.Sprintf(`{"error":"%s"}`, err.Error()), http.StatusBadRequest)
		return
	}

	// Sanitize input
	form.Sanitize()
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
