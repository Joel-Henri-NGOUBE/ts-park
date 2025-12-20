FROM node:22.18-alpine3.21

WORKDIR /frontend

RUN cat ./index.html

RUN cat ./package.json

COPY ./package.json /frontend

COPY . /frontend

RUN npm install

EXPOSE 5173

CMD ["npm", "run", "dev"]