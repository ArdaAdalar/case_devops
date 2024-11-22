
# Base image olarak Node.js kullan
FROM node:18 as build

# Çalışma dizinini ayarla
WORKDIR /app/mern-project/client

# Paket dosyalarını kopyala ve bağımlılıkları yükle
COPY package*.json ./
RUN npm install

# Uygulamayı build et
COPY . .
RUN npm run build

# Final image için Nginx kullan
FROM nginx:alpine

# Build edilmiş dosyaları Nginx'e kopyala
COPY --from=build /app/build /usr/share/nginx/html

# Nginx portunu aç
EXPOSE 80

# Nginx'i çalıştır
CMD ["nginx", "-g", "daemon off;"]
