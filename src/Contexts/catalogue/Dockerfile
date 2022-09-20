FROM node:18.6.0-alpine

WORKDIR /usr/app

#COPY package*.json ./

COPY ./catalogue ./catalogue
COPY ./shared ./shared

WORKDIR /usr/app/shared

RUN npm install

WORKDIR /usr/app/catalogue

RUN npm install

EXPOSE 3000


CMD [ "node", "dist/catalogue/app/start.js" ]