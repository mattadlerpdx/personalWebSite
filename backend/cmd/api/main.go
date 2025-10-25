package main

import (
	"log"
	"net/http"
	"os"
	"path/filepath"

	"github.com/mattadlerpdx/personalWebsite/backend/internal/config"
	"github.com/mattadlerpdx/personalWebsite/backend/internal/handlers"
	"github.com/mattadlerpdx/personalWebsite/backend/internal/middleware"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
	"golang.org/x/time/rate"
)

func main() {

	config.Load()

	// === Router Setup ===
	r := mux.NewRouter()

	// === Create Rate Limiter for Contact Form ===
	// 1 request every 3 seconds with burst of 5
	contactLimiter := middleware.NewIPRateLimiter(rate.Limit(1.0/3.0), 5)
	go contactLimiter.Cleanup() // Start cleanup goroutine

	// === API Routes ===
	r.HandleFunc("/projects", handlers.ProjectsHandler).Methods("GET")
	r.HandleFunc("/about", handlers.AboutHandler).Methods("GET")
	r.Handle("/contact", contactLimiter.Limit(http.HandlerFunc(handlers.ContactHandler))).Methods("POST")
	r.HandleFunc("/logs", handlers.LogVisitHandler).Methods("POST")

	// === Serve Static Files ===
	buildPath := filepath.Join("..", "..", "frontend", "build")
	fs := http.FileServer(http.Dir(buildPath))

	r.PathPrefix("/static/").Handler(fs)
	r.PathPrefix("/assets/").Handler(fs)
	r.PathPrefix("/images/").Handler(fs)

	// === Serve index.html for SPA Routes ===
	r.PathPrefix("/").HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		indexPath := filepath.Join(buildPath, "index.html")
		http.ServeFile(w, r, indexPath)
	})

	// === Not Found Handler (Optional fallback for API) ===
	r.NotFoundHandler = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		http.NotFound(w, r)
	})

	// === CORS Configuration ===
	allowedOrigins := []string{
		"http://localhost:3000",
		"https://personal-frontend-service-684800965366.us-west1.run.app",
		"https://mattadler.dev",
	}

	c := cors.New(cors.Options{
		AllowedOrigins:   allowedOrigins,
		AllowedMethods:   []string{"GET", "POST", "OPTIONS"},
		AllowedHeaders:   []string{"Content-Type", "Authorization"},
		AllowCredentials: false,
	})

	// === Compose Final Handler with Middleware Stack ===
	finalHandler := middleware.Logging(middleware.SecureHeaders(c.Handler(r)))

	// === Determine Port for Cloud Run / Local ===
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Server running on port %s", port)
	log.Fatal(http.ListenAndServe(":"+port, finalHandler))
}
