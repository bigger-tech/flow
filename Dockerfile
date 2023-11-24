ARG N8N_VERSION=latest
FROM n8nio/n8n:$N8N_VERSION as build

USER root

RUN npm install --global --unsafe-perm n8n typescript

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

RUN npm pkg delete scripts.prepare

RUN npm install --save-dev vitest && npm install

RUN npm run build && npm link

WORKDIR /usr/local/lib/node_modules/n8n

RUN npm link n8n-nodes-stellar

ENTRYPOINT ["tini", "--", "/docker-entrypoint.sh"]
