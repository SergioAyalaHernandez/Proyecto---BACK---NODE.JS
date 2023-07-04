FROM node:12

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY src ./src

CMD ["node", "./index.js"]
