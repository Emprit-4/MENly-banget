FROM node:alpine
WORKDIR /usr/emprit
COPY ./ ./

RUN npm install

CMD npm run build:prod && npm run start:prod