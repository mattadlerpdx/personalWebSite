package handlers

import (
	"encoding/json"
	"net/http"
)

type AboutInfo struct {
	Name        string   `json:"name"`
	Title       string   `json:"title"`
	Description string   `json:"description"`
	Skills      []string `json:"skills"`
}

func AboutHandler(w http.ResponseWriter, r *http.Request) {
	about := AboutInfo{
		Name:        "Matt Adler",
		Title:       "Software Engineer",
		Description: "Passionate about building innovative solutions and creating impactful software.",
		Skills:      []string{"Go", "React", "TypeScript", "Docker", "AWS"},
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(about)
}
