package server

import (
	"fmt"

	"github.com/elltja/finance-tracker/internal/auth"
	"github.com/gin-gonic/gin"
)

func RegisterHandler(ctx *gin.Context) {
	var credentials auth.RegisterCredentials

	if err := ctx.BindJSON(&credentials); err != nil {
		return
	}

	fmt.Println(credentials)

	ctx.JSON(200, gin.H{
		"credentials": credentials,
	})
}
