# Etapa de construcción
FROM node:18-alpine as build

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos de configuración
COPY package.json yarn.lock ./

# Instalar dependencias
RUN yarn install --frozen-lockfile

# Copiar el código fuente
COPY . .

# Construir la aplicación
RUN yarn build

# Etapa de producción
FROM nginx:alpine

# Copiar los archivos de construcción desde la etapa anterior
COPY --from=build /app/build /usr/share/nginx/html

# Copiar la configuración personalizada de nginx (si es necesario)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto 3000
EXPOSE 3000

# Iniciar nginx
CMD ["nginx", "-g", "daemon off;"]