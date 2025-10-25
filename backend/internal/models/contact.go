package models

import (
	"errors"
	"html"
	"regexp"
	"strings"
	"unicode/utf8"
)

const (
	MaxNameLength    = 100
	MaxEmailLength   = 254 // RFC 5321
	MaxMessageLength = 5000
	MinNameLength    = 2
	MinMessageLength = 10
)

type ContactForm struct {
	Name    string `json:"name"`
	Email   string `json:"email"`
	Message string `json:"message"`
}

// Email regex pattern
var emailRegex = regexp.MustCompile(`^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$`)

// URL regex pattern for sanitization
var urlRegex = regexp.MustCompile(`https?://[^\s]+`)

// Validate performs comprehensive validation on the contact form
func (c *ContactForm) Validate() error {
	// Validate name
	c.Name = strings.TrimSpace(c.Name)
	if len(c.Name) < MinNameLength {
		return errors.New("name must be at least 2 characters")
	}
	if utf8.RuneCountInString(c.Name) > MaxNameLength {
		return errors.New("name must be less than 100 characters")
	}

	// Validate email
	c.Email = strings.TrimSpace(strings.ToLower(c.Email))
	if c.Email == "" {
		return errors.New("email is required")
	}
	if !emailRegex.MatchString(c.Email) {
		return errors.New("invalid email format")
	}
	if len(c.Email) > MaxEmailLength {
		return errors.New("email is too long")
	}

	// Validate message
	c.Message = strings.TrimSpace(c.Message)
	if len(c.Message) < MinMessageLength {
		return errors.New("message must be at least 10 characters")
	}
	if utf8.RuneCountInString(c.Message) > MaxMessageLength {
		return errors.New("message must be less than 5000 characters")
	}

	return nil
}

// Sanitize removes potentially dangerous content
func (c *ContactForm) Sanitize() {
	// Escape HTML to prevent XSS
	c.Name = html.EscapeString(c.Name)
	c.Email = html.EscapeString(c.Email)
	c.Message = html.EscapeString(c.Message)

	// Remove URLs from message
	c.Message = urlRegex.ReplaceAllString(c.Message, "[LINK REMOVED]")

	// Remove control characters except newlines
	c.Message = strings.Map(func(r rune) rune {
		if r < 32 && r != '\n' && r != '\r' && r != '\t' {
			return -1
		}
		return r
	}, c.Message)
}
