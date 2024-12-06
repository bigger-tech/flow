ARG N8N_VERSION=0.218.0

FROM n8nio/n8n:$N8N_VERSION AS build
FROM node:18-alpine AS nodebuilder

USER root

RUN apk add --no-cache tini

RUN npm install --global --unsafe-perm n8n@0.218.0 typescript

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

RUN npm pkg delete scripts.prepare && npm install

RUN npm run build && npm link

WORKDIR /usr/local/lib/node_modules/n8n

RUN npm link n8n-nodes-stellar

WORKDIR /usr/local/lib/node_modules

ENTRYPOINT ["tini", "--", "n8n"]
