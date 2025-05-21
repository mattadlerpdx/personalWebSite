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
		Description: "I love creating thoughtful software that blends technical excellence with practical impact—from streamlining government systems to using AI to automate pricing decisions. My passion lies in building tools that work smarter, not harder.",
		Skills: []string{
			"Go",            // Backend services, CGO, WebSocket libraries
			"C#",            // .NET development, WPF, MVVM architecture
			"React.js",      // Frontend UI development
			"JavaScript",    // Dynamic UI and interactivity
			"SQL",           // Query writing, schema integration
			"Docker",        // Containerization and deployment
			"Google Cloud",  // Cloud Run, Storage, API hosting
			"OpenAI API",    // AI integration for pricing and scoring
			"CI/CD",         // Automation pipelines, tool integration
			"GitHub/GitLab", // Version control, collaboration
		},
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(about)
}
