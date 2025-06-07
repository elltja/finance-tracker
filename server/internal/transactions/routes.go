package transactions

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

	r.GET("/all", h.GetAll)

	r.POST("/create", h.Create)

	r.PUT("/update", h.Update)

	r.DELETE("/delete", h.Delete)
}
