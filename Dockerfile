FROM node:slim

WORKDIR /app

COPY . .

RUN npm install
RUN npx next build --no-lint
EXPOSE 3000
EXPOSE 80

CMD ["npx" , "next" , "start", "-p" , "80"]