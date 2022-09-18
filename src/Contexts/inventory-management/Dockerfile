FROM node:18.6.0-alpine

WORKDIR /usr/app

#COPY package*.json ./

COPY ./inventory-management ./inventory-management
COPY ./shared ./shared

WORKDIR /usr/app/shared

RUN npm install

WORKDIR /usr/app/inventory-management

RUN npm install

EXPOSE 3000


CMD [ "node", "dist/inventory-management/app/start.js" ]