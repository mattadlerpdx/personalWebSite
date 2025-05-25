package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	SMTPUser string
	SMTPPass string
	Port     string
}

var AppConfig Config

func Load() {
	// Load from .env if exists (local dev only)
	_ = godotenv.Load()

	AppConfig = Config{
		SMTPUser: getEnv("SMTP_USER", ""),
		SMTPPass: getEnv("SMTP_PASS", ""),
		Port:     getEnv("PORT", "8080"),
	}

	if AppConfig.SMTPUser == "" || AppConfig.SMTPPass == "" {
		log.Println("[WARNING] SMTP credentials are missing. Emails will fail.")
	}
}

func getEnv(key string, fallback string) string {
	if value, exists := os.LookupEnv(key); exists {
		return value
	}
	return fallback
}
