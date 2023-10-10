FROM node:18.18.0-alpine

WORKDIR /app

ENV NODE_AUTH_TOKEN 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

ADD . .

COPY .npmrc .npmrc

RUN npm i -g ts-node

RUN npm ci && npm run build && npm prune --production

EXPOSE 8080

CMD ["npm", "run", "start:prod"]
