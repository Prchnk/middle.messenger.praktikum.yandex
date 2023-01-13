FROM node:lts

WORKDIR /messenger

COPY . .

RUN npm install && npm run prod-client

EXPOSE 3000

CMD npm run start-server