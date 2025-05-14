package handlers

import (
	"fmt"
	"net/http"
)

func ContactHandler(w http.ResponseWriter, r *http.Request) {
	name := r.FormValue("name")
	email := r.FormValue("email")
	message := r.FormValue("message")

	fmt.Printf("New contact: %s (%s): %s\n", name, email, message)
	w.Write([]byte("Thanks for your message!"))
}
