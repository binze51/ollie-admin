### First Stage ###
FROM node:18.17.1-slim AS builder

WORKDIR /usr/src/app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

### Second Stage ###
FROM caddy:2.7.4-alpine

ARG CADDYFILE
COPY ${CADDYFILE} /etc/caddy/Caddyfile

COPY --from=builder /usr/src/app/dist/ /srv

EXPOSE 80

EXPOSE 443