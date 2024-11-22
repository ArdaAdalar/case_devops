# Node.js tabanlı bir imaj kullanıyoruz
FROM node:18-alpine

# Çalışma dizinini ayarla
WORKDIR /app

# Bağımlılık dosyalarını kopyala
COPY package.json package-lock.json ./

# Bağımlılıkları yükle
RUN npm install

# Uygulama kodlarını kopyala
COPY . .

# Uygulama portunu aç
EXPOSE 5050

# Sunucuyu başlat
CMD ["node", "server.mjs"]
