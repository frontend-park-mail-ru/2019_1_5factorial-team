FROM ubuntu:18.04
MAINTAINER  5!team-front

ENV PGVER 11
ENV PORT 4000
EXPOSE $PORT

RUN apt-get update
RUN apt-get install -y curl gnupg2 --fix-missing

RUN apt-get update

RUN curl -sL https://deb.nodesource.com/setup_11.x | bash
RUN apt-get install -y nodejs

COPY . .

USER root
WORKDIR .
RUN pwd
RUN ls
RUN npm -v
RUN npm install

CMD npm start
