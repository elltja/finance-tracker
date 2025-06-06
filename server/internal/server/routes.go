package server

import (
	"log"
	"net/http"
	"os"

	"github.com/elltja/finance-tracker/internal/auth"
	"github.com/elltja/finance-tracker/internal/transactions"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func RegisterRoutes(deps Dependencies) *gin.Engine {
	r := gin.New()
	r.Use(gin.Logger())
	r.Use(gin.Recovery())
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{os.Getenv("FRONTEND_URL")},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},
		AllowHeaders:     []string{"Content-Type"},
		AllowCredentials: true,
	}))

	if err := r.SetTrustedProxies([]string{"127.0.0.1"}); err != nil {
		log.Fatalf("Failed to set trusted proxies: %v", err)
	}

	r.GET("/", func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, gin.H{
			"message": "API is running",
		})
	})

	/* Auth */
	authRoutes := r.Group("/auth")
	auth.RegisterRoutes(authRoutes, auth.Config{
		DB:    deps.DB,
		Store: deps.Store,
	})

	transactionRoutes := r.Group("/transactions")

	transactions.RegisterRoutes(transactionRoutes, transactions.Config{
		DB:    deps.DB,
		Store: deps.Store,
	})

	return r
}
