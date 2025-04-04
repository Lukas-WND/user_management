FROM node:22.14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm rebuild bcrypt --build-from-source

CMD ["npm", "run", "start:dev"]
