ARG N8N_VERSION=latest
FROM n8nio/n8n:$N8N_VERSION as build

RUN npm install --global --unsafe-perm n8n

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

RUN npm install

RUN npm run build && npm link

WORKDIR /usr/local/lib/node_modules/n8n

RUN npm link n8n-nodes-stellar

CMD ["n8n", "start"]

EXPOSE 5678