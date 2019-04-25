FROM ubuntu:18.04
MAINTAINER  pupa-zalupa

ENV PORT 4000
EXPOSE $PORT

RUN apt-get update
RUN apt-get install -y curl gnupg2 --fix-missing
RUN apt install -y git wget gcc gnupg

RUN apt-get update

RUN curl -sL https://deb.nodesource.com/setup_11.x | bash
RUN apt-get install -y nodejs

# Установка golang
RUN wget https://dl.google.com/go/go1.11.linux-amd64.tar.gz
RUN tar -xvf go1.11.linux-amd64.tar.gz
RUN mv go /usr/local

# Выставляем переменную окружения для сборки проекта
ENV GOROOT /usr/local/go
ENV GOPATH $HOME/go
ENV PATH $GOPATH/bin:$GOROOT/bin:$PATH

COPY . .

RUN GOOS=js GOARCH=wasm go build -o test.wasm

USER root
WORKDIR .
RUN pwd
RUN ls
RUN npm -v
RUN npm install

CMD npm start
