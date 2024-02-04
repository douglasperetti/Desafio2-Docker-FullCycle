FROM golang:1.17-alpine3.15 AS builder

WORKDIR /usr/src/app

COPY go/full-cycle-rocks.go .

RUN go build -o app full-cycle-rocks.go

FROM scratch

COPY --from=builder /usr/src/app/app /app

WORKDIR /

CMD ["/app"]
