package auth

import (
	"database/sql"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/sessions"
)

type Config struct {
	DB    *sql.DB
	Store *sessions.CookieStore
}

func RegisterRoutes(r *gin.RouterGroup, c Config) {
	h := NewHandler(c.DB, c.Store)
	r.POST("/register", h.RegisterHandler)
	r.POST("/login", h.LoginHandler)
	r.GET("/:provider", h.OAuthHandler)
	r.GET("/:provider/callback", h.OAuthCallbackHandler)
	r.GET("/me", h.MeHandler)
}
