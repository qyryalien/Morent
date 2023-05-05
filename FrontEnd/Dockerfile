FROM ubuntu:latest
LABEL authors="Я"

ENTRYPOINT ["top", "-b"]

FROM node:16-slim

WORKDIR /usr/share/node/html

COPY . .

RUN npm install

ENTRYPOINT ["npm", "run", "start"]
