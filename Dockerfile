FROM node:18.18.0-alpine as builder

# Directorio de trabajo dentro de la imagen
WORKDIR /app

# Copia los archivos de configuración y los archivos necesarios
COPY package.json package-lock.json ./
COPY tsconfig.json tsconfig.build.json ./
COPY src/ ./src/

RUN npm install -g typescript

RUN npm install --production

# Compila la aplicación TypeScript
RUN npm run build

FROM node:18.18.0-alpine

WORKDIR /app

# Copia los archivos necesarios de la etapa anterior
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

# Expone el puerto en el que se ejecutará la aplicación (ajusta según tu aplicación)
EXPOSE 8080

CMD ["node", "dist/app.js"]

