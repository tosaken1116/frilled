package main

import (
	"fmt"
	"net/http"

	"github.com/labstack/echo/v4"
)

func healthCheckHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "OK")
}

func main() {
	app := echo.New()

	app.GET("/health", func(c echo.Context) error {
		return c.String(http.StatusOK, "OK")
	})

	app.Logger.Fatal(app.Start(":8080"))
}
