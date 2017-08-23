FROM node:8-alpine
USER root

WORKDIR /

RUN yarn global add pm2

COPY yarn.lock /yarn.lock
COPY .babelrc /.babelrc
COPY package.json /package.json
COPY server.js /server.js

COPY ./application /application
COPY ./__tests__ /__tests__
COPY ./webpack /webpack

RUN yarn install --flat