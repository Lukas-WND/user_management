FROM node:22

WORKDIR /app

COPY . .

RUN npm install
RUN npm rebuild bcrypt --build-from-source

EXPOSE 3000

CMD ["npm", "run", "start:dev"]
