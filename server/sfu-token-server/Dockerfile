ARG GO_VERSION=1.23.3
FROM golang:${GO_VERSION}

WORKDIR /app

# from project root to server/sfu-token-server
COPY server/sfu-token-server .

RUN go mod tidy

RUN go build -o app main.go

ENTRYPOINT ["./app"]
