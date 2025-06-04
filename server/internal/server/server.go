package server

import (
	"fmt"
	"net/http"
	"time"
)

func NewServer(deps Dependencies, port string) *http.Server {

	server := &http.Server{
		Addr:         fmt.Sprintf(":%s", port),
		Handler:      RegisterRoutes(deps),
		IdleTimeout:  time.Minute,
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 30 * time.Second,
	}

	return server

}
