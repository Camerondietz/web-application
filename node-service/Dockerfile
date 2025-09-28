FROM node:22-alpine	

RUN npm install -g npm@10.9.3

ADD package.json .
ADD server.js .
ADD models/Product.js .
COPY . .
RUN npm install

EXPOSE 4000

CMD [ "node", "server.js" ]