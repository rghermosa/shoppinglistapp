FROM node:18.6.0-alpine

WORKDIR /usr/app

COPY ./user-management ./user-management

COPY ./shared ./shared

WORKDIR /usr/app/shared

RUN npm install

WORKDIR /usr/app/user-management

RUN npm install

EXPOSE 3000

CMD [ "node", "dist/user-management/app/start.js" ]