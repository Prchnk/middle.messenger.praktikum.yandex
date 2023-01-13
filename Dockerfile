FROM node:lts

WORKDIR /messenger

COPY . .

RUN npm install && npm run start

EXPOSE 3000

CMD npm run start-server
