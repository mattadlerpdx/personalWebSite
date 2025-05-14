package handlers

import (
    "encoding/json"
    "net/http"
)

type Project struct {
    Title string `json:"title"`
    Link  string `json:"link"`
    Desc  string `json:"desc"`
}

func ProjectsHandler(w http.ResponseWriter, r *http.Request) {
    projects := []Project{
        {Title: "Cadence SCM", Link: "https://cadence.app", Desc: "AI-powered supply chain tool"},
        {Title: "Swedemom Test Automation", Link: "#", Desc: "eBay-integrated listing system"},
    }

    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(projects)
}
