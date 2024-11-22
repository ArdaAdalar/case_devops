# Node.js imajını kullan
FROM node:18 as build

# Çalışma dizini belirle
WORKDIR /app

# Paket dosyalarını kopyala ve bağımlılıkları yükle
COPY package.json package-lock.json ./
RUN npm install

# Kaynak dosyaları kopyala ve build et
COPY . .
RUN npm run build

# Nginx ile build edilmiş dosyaları sun
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
