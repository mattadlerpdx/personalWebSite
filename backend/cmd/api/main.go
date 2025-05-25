package main

import (
	"log"
	"net/http"
	"os"
	"path/filepath"

	"github.com/mattadlerpdx/personalWebsite/backend/internal/config"
	"github.com/mattadlerpdx/personalWebsite/backend/internal/handlers"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

// === Middleware: Secure HTTP Headers ===
func secureHeaders(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("X-Content-Type-Options", "nosniff")
		w.Header().Set("X-Frame-Options", "DENY")
		w.Header().Set("Referrer-Policy", "strict-origin-when-cross-origin")
		w.Header().Set("Content-Security-Policy", "default-src 'self'")
		next.ServeHTTP(w, r)
	})
}

// === Middleware: Logging Requests ===
func logMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		log.Printf("%s - %s %s", r.RemoteAddr, r.Method, r.URL.Path)
		next.ServeHTTP(w, r)
	})
}

func main() {

	config.Load()

	// === Router Setup ===
	r := mux.NewRouter()

	// === API Routes ===
	r.HandleFunc("/projects", handlers.ProjectsHandler).Methods("GET")
	r.HandleFunc("/about", handlers.AboutHandler).Methods("GET")
	r.HandleFunc("/contact", handlers.ContactHandler).Methods("POST")
	r.HandleFunc("/resume", handlers.ResumeHandler).Methods("GET")

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
	}

	c := cors.New(cors.Options{
		AllowedOrigins:   allowedOrigins,
		AllowedMethods:   []string{"GET", "POST", "OPTIONS"},
		AllowedHeaders:   []string{"Content-Type", "Authorization"},
		AllowCredentials: false,
	})

	// === Compose Final Handler with Middleware Stack ===
	finalHandler := logMiddleware(secureHeaders(c.Handler(r)))

	// === Determine Port for Cloud Run / Local ===
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Server running on port %s", port)
	log.Fatal(http.ListenAndServe(":"+port, finalHandler))
}
