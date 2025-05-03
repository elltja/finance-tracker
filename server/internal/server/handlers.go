package server

import (
	"net/http"

	"github.com/elltja/finance-tracker/internal/auth"
	"github.com/elltja/finance-tracker/internal/models"
	"github.com/gin-gonic/gin"
)

func RegisterHandler(ctx *gin.Context) {
	var credentials models.RegisterCredentials

	if err := ctx.ShouldBindJSON(&credentials); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"message": "Invalid input data",
		})
		return
	}

	err := auth.Register(credentials)

	// TODO: Improve error handling

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"message": "Internal server error",
		})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"message": "Account successfully created",
	})
}

func LoginHandler(ctx *gin.Context) {
	var credentials models.LoginCredentials
	if err := ctx.ShouldBindJSON(&credentials); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"message": "Invalid input data",
		})
		return
	}

	err := auth.Login(credentials)

	// TODO: Improve error handling

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"message": "Internal server error",
		})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"message": "Successfully logged in",
	})
}
