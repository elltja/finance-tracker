package server

import (
	"fmt"
	"net/http"
	"os"
	"strconv"
	"time"
)

func NewServer() *http.Server {
	port, _ := strconv.Atoi(os.Getenv("PORT"))

	server := &http.Server{
		Addr:         fmt.Sprintf(":%d", port),
		Handler:      RegisterRoutes(),
		IdleTimeout:  time.Minute,
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 30 * time.Second,
	}

	return server

}
