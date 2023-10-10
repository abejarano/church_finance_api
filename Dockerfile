FROM node:18.18.0-alpine

WORKDIR /app

COPY dist /app

COPY package.json ./

COPY package-lock.json ./

RUN npm ci

EXPOSE 8080

CMD ["npm", "run", "start:prod"]
