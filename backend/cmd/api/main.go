package main

import (
    "log"
    "net/http"
    "github.com/gorilla/mux"
    "personalbackend/internal/handlers"
)

func main() {
    r := mux.NewRouter()

    r.HandleFunc("/", handlers.HomeHandler).Methods("GET")
    r.HandleFunc("/resume", handlers.ResumeHandler).Methods("GET")
    r.HandleFunc("/projects", handlers.ProjectsHandler).Methods("GET")
    r.HandleFunc("/contact", handlers.ContactHandler).Methods("POST")

    log.Println("Listening on :8080")
    http.ListenAndServe(":8080", r)
}
