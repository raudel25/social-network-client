# Paso 1: Utilizar una imagen base de Node.js
FROM node:latest AS build

# Paso 2: Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Paso 3: Copiar el archivo package.json y el archivo yarn.lock
COPY package.json yarn.lock ./

# Paso 4: Instalar las dependencias de la aplicación
RUN yarn install --frozen-lockfile

# Paso 5: Copiar todo el código fuente de la aplicación al contenedor
COPY . .

# Paso 6: Construir la aplicación de producción
RUN yarn build

# Paso 7: Instalar las dependencias para el servidor
RUN yarn add express serve-static

# Paso 8: Exponer el puerto en el que se ejecutará la aplicación
EXPOSE 3000

# Paso 9: Comando para iniciar la aplicación con Node.js
CMD ["node", "server.js"]
