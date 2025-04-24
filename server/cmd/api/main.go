package main

import (
	"log"
	"os"

	"github.com/elltja/go-project-starter/internal/database"
	"github.com/elltja/go-project-starter/internal/server"
	"github.com/joho/godotenv"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found, continuing with system environment variables")
	}

	database.Init()
	defer database.DB.Close()

	s := server.NewServer()

	port := os.Getenv("PORT")
	if port == "" {
		port = "8000"
	}

	log.Printf("Starting server on port %s...", port)
	if err := s.Run(":" + port); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
