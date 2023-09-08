### First Stage ###
FROM node:18.17.1-slim AS builder
RUN mkdir -p /app
WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

### Second Stage ###
FROM caddy:2.7.4-alpine
RUN mkdir -p /app
WORKDIR /app
ARG SERVICE
ARG VERSION
ARG GIT_COMMIT

ENV SERVICE=${SERVICE}
ENV VERSION=${VERSION}
ENV GIT_COMMIT=${GIT_COMMIT}

COPY --from=builder /app/dist/ /app/srv

EXPOSE 80

EXPOSE 443