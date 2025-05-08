FROM node:23.11.0-bullseye-slim	

RUN npm install -g npm@9.1.3

ADD package.json .
ADD server.js .
ADD models/Product.js .
COPY . .
RUN npm install

EXPOSE 4000

CMD [ "node", "server.js" ]