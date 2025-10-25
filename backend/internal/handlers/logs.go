package handlers

import (
	"bytes"
	"encoding/json"
	"log"
	"net/http"
	"os"
)

// logVisitRequest is the data structure from frontend
type logVisitRequest struct {
	Route string `json:"route"`
}

// LogVisitHandler receives visit pings and logs them to Elasticsearch
func LogVisitHandler(w http.ResponseWriter, r *http.Request) {
	log.Println("🟢 /logs endpoint hit!")
	// var visit logVisitRequest
	// if err := json.NewDecoder(r.Body).Decode(&visit); err != nil || visit.Route == "" {
	// 	http.Error(w, "Invalid input", http.StatusBadRequest)
	// 	return
	// }

	// logEntry := map[string]interface{}{
	// 	"route":     visit.Route,
	// 	"timestamp": time.Now().Format(time.RFC3339),
	// 	"ip":        r.Header.Get("X-Forwarded-For"),
	// 	"userAgent": r.UserAgent(),
	// }

	// go sendToElastic(logEntry) // non-blocking log

	w.WriteHeader(http.StatusOK)
}

func sendToElastic(data map[string]interface{}) {
	jsonData, _ := json.Marshal(data)

	req, _ := http.NewRequest("POST", "https://your-elastic-endpoint/logs/_doc", bytes.NewBuffer(jsonData))
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "ApiKey "+os.Getenv("ELASTIC_API_KEY"))

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		// log or ignore
		return
	}
	defer resp.Body.Close()
}
