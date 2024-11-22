FROM node:14-alpine
WORKDIR /mern-project/client
COPY . .
RUN npm install
RUN npm install -g live-server
RUN npm run build
CMD [ "live-server", "build"]



FROM node:14-alpine
WORKDIR /mern-project/client
COPY . .
RUN npm install
CMD [ "npm", "start"]
