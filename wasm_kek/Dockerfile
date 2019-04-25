FROM golang:1.11 AS builder

COPY ./ src/app/
RUN GOOS=js GOARCH=wasm go build -o test.wasm app

RUN ls src/app

FROM nlepage/golang_wasm:nginx

COPY index.html /usr/share/nginx/html/
COPY --from=builder /go/test.wasm /usr/share/nginx/html/