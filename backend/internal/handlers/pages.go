package handlers

import (
	"net/http"
	"path/filepath"
)

// servePage serves the React app's index.html for the given route
func servePage(w http.ResponseWriter, r *http.Request) {
	buildPath := filepath.Join("..", "..", "frontend", "build")
	indexPath := filepath.Join(buildPath, "index.html")
	http.ServeFile(w, r, indexPath)
}

// HomePageHandler serves the homepage
func HomePageHandler(w http.ResponseWriter, r *http.Request) {
	servePage(w, r)
}

// ProjectsPageHandler serves the projects page
func ProjectsPageHandler(w http.ResponseWriter, r *http.Request) {
	servePage(w, r)
}

// AboutPageHandler serves the about page
func AboutPageHandler(w http.ResponseWriter, r *http.Request) {
	servePage(w, r)
}

// ContactPageHandler serves the contact page
func ContactPageHandler(w http.ResponseWriter, r *http.Request) {
	servePage(w, r)
}

// ResumePageHandler serves the resume page
func ResumePageHandler(w http.ResponseWriter, r *http.Request) {
	servePage(w, r)
}
