FROM node:12.13-alpine

WORKDIR /home-library

COPY package*.json .

RUN npm install

COPY . .

COPY ./dist ./dist

CMD ['npm', 'run', 'start']
