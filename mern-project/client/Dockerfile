# 1. Node.js temel imajını kullan
FROM node:18-alpine as build

# 2. Çalışma dizinini oluştur ve ayarla
WORKDIR /app

# 3. package.json ve package-lock.json dosyalarını kopyala
COPY package.json package-lock.json ./

# 4. Bağımlılıkları yükle
RUN npm install

# 5. Uygulama dosyalarını kopyala
COPY . .

# 6. Uygulamayı derle (production için)
RUN npm run build

# 7. Son aşama: nginx ile dağıtım için
FROM nginx:alpine

# 8. Derlenmiş uygulamayı nginx'e kopyala
COPY --from=build /app/build /usr/share/nginx/html

# 9. Varsayılan nginx ayarını kullan
EXPOSE 80

# 10. Nginx başlat
CMD ["nginx", "-g", "daemon off;"]

