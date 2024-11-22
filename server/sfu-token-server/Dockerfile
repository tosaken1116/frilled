ARG GO_VERSION=1.23.3
FROM golang:${GO_VERSION}

WORKDIR /app

COPY . .

RUN go mod tidy

RUN go build -o app main.go

ENTRYPOINT ["./app"]
