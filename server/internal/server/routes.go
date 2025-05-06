package server

import (
	"log"
	"net/http"
	"os"

	"github.com/elltja/finance-tracker/internal/auth"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func RegisterRoutes() *gin.Engine {
	r := gin.New()
	r.Use(gin.Logger())
	r.Use(gin.Recovery())
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{os.Getenv("FRONTEND_URL")},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},
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
	{
		authRoutes.POST("/register", auth.RegisterHandler)
		authRoutes.POST("/login", auth.LoginHandler)
		authRoutes.GET("/:provider", auth.OAuthHandler)
		authRoutes.GET("/:provider/callback", auth.OAuthCallbackHandler)
		authRoutes.GET("/me", auth.MeHandler)
	}

	return r
}
