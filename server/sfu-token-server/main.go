package main

import (
	"log"
	"net/http"
	"os"
	"time"

	"github.com/labstack/echo/v4"
	"github.com/livekit/protocol/auth"
)

func getJoinToken(room, identity string) string {
	at := auth.NewAccessToken(os.Getenv("LIVEKIT_API_KEY"), os.Getenv("LIVEKIT_API_SECRET"))
	grant := &auth.VideoGrant{
		RoomJoin: true,
		Room:     room,
	}
	at.AddGrant(grant).
		SetIdentity(identity).
		SetValidFor(time.Hour)

	token, _ := at.ToJWT()
	return token
}

func main() {
	app := echo.New()

	// cors apply allow all
	app.Use(func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			c.Response().Header().Set("Access-Control-Allow-Origin", "*")
			c.Response().Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
			c.Response().Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
			return next(c)
		}
	})

	app.GET("/getToken", func(c echo.Context) error {
		roomId := c.QueryParam("room")
		userName := c.QueryParam("name")
		if roomId == "" || userName == "" {
			return c.String(http.StatusBadRequest, "room and name are required")
		}
		return c.String(http.StatusOK, getJoinToken(roomId, userName))
	})

	log.Fatal(app.Start(":8080"))

}
