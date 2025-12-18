FROM node:22.18-alpine3.21

WORKDIR /api

COPY package.json /api

COPY . /api

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "dev"]