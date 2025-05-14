package handlers

import "net/http"

func ResumeHandler(w http.ResponseWriter, r *http.Request) {
    http.ServeFile(w, r, "./internal/infrastructure/static/Matt_Resume.pdf")
}
