# Construir la aplicación frontend
FROM node:18.17.1 AS build
WORKDIR /app
ARG APP_API_URL
ENV VITE_APP_API_URL=$APP_API_URL
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Configurar el servidor Nginx
FROM nginx:alpine
COPY --from=build /app/dist /var/www/app/
COPY ./default.conf /etc/nginx/conf.d/default.conf
EXPOSE 5175
CMD ["nginx", "-g", "daemon off;"]
