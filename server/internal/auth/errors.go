package auth

import "errors"

var (
	ErrUserNotFound    = errors.New("user not found")
	ErrNoPassword      = errors.New("user does not have a password")
	ErrInvalidPassword = errors.New("invalid password")
	ErrUserAlreadyExit = errors.New("user already exit")
)
