package main

import (
	"log"
	"net/http"
	"os"
	"path/filepath"
	"personalbackend/internal/handlers"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

func main() {
	// Set up the router
	r := mux.NewRouter()

	// Simple API routes matching frontend paths
	r.HandleFunc("/projects", handlers.ProjectsHandler).Methods("GET")
	r.HandleFunc("/about", handlers.AboutHandler).Methods("GET")
	r.HandleFunc("/contact", handlers.ContactHandler).Methods("POST")
	r.HandleFunc("/resume", handlers.ResumeHandler).Methods("GET")

	// Serve static files from the React app
	buildPath := filepath.Join("..", "..", "frontend", "build")
	fs := http.FileServer(http.Dir(buildPath))

	// Serve static assets
	r.PathPrefix("/static/").Handler(fs)
	r.PathPrefix("/assets/").Handler(fs)
	r.PathPrefix("/images/").Handler(fs)

	// Serve index.html for all other routes (for SPA)
	r.PathPrefix("/").HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		indexPath := filepath.Join(buildPath, "index.html")
		http.ServeFile(w, r, indexPath)
	})

	// Configure CORS for development
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Content-Type", "Authorization"},
		AllowCredentials: true,
		Debug:            true, // Enable CORS debugging in development
	})

	// Apply CORS middleware to the router
	handler := c.Handler(r)

	// Get the server port from environment variables or use a default
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	// Start the server
	log.Printf("Server running on port %s", port)
	log.Fatal(http.ListenAndServe(":"+port, handler))
}
