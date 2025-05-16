FROM node:slim

WORKDIR /app/src

COPY ./src ./src
COPY package.json package-lock.json ./  

RUN npm install

EXPOSE 3000

CMD ["npx", "next", "dev"]