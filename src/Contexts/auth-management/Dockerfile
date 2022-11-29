FROM node:18.6.0-alpine

WORKDIR /usr/app

COPY ./auth-management ./auth-management

COPY ./shared ./shared

WORKDIR /usr/app/shared

RUN npm install

WORKDIR /usr/app/auth-management

RUN npm install

EXPOSE 3000

CMD [ "node", "dist/auth-management/app/start.js" ]