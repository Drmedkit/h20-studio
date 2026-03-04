# Bouw-fase (Node.js)
FROM node:20-alpine as build
WORKDIR /app

# Kopieer package files
COPY package.json package-lock.json ./

# Installeer dependencies (gebruik ci)
RUN npm ci

# Kopieer de rest van de source code
COPY . .

# Bouw de Vite applicatie voor productie
RUN npm run build

# Webserver-fase (Nginx)
FROM nginx:alpine

# Kopieer de gebouwde statische bestanden vanuit de build-fase
COPY --from=build /app/dist /usr/share/nginx/html

# Exposeer de standaard Nginx poort
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
