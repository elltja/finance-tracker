package main

import (
	"log"
	"os"

	"github.com/elltja/finance-tracker/internal/auth"
	"github.com/elltja/finance-tracker/internal/database"
	"github.com/elltja/finance-tracker/internal/server"
	"github.com/joho/godotenv"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found, continuing with system environment variables")
	}

	db := database.Init()
	defer db.Close()

	store := auth.Init()

	deps := server.Dependencies{
		DB:    db,
		Store: store,
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "8000"
	}

	s := server.NewServer(deps, port)

	log.Printf("Starting server on port %s...", port)
	if err := s.ListenAndServe(); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
