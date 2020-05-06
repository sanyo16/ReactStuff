FROM node:13.12.0-alpine

LABEL maintainter="sanyo16@gmail.com"

RUN apk add --update nodejs nodejs-npm

COPY . /src

WORKDIR /src

COPY package.json ./
COPY package-lock.json ./
RUN npm install

EXPOSE 4000

# start app
CMD ["npm", "start"]