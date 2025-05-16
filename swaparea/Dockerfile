FROM node:slim

WORKDIR /src/app

COPY . .

RUN npm install

EXPOSE 3000

CMD ["npx" , "next" , "dev"]