FROM node:slim

WORKDIR /src/app

COPY . .

RUN npm install
RUN npx next build --no-lint
EXPOSE 80
CMD ["npx" , "next" , "start", "-p" , "80"]