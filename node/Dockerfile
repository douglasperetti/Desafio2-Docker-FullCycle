FROM node:15

RUN apt-get clean
RUN apt-get install -y wget

ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh -O /usr/local/bin/wait-for-it.sh
RUN chmod +x /usr/local/bin/wait-for-it.sh

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD /usr/local/bin/wait-for-it.sh db:3306 -- node index.js

