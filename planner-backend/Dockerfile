FROM node:18-alpine

RUN apk add --no-cache bash

WORKDIR /app

COPY package*.json ./

RUN yarn install --production

COPY . .

RUN npx prisma generate

RUN yarn build

EXPOSE 4200

COPY wait-for-db.sh /app/wait-for-db.sh
RUN chmod +x /app/wait-for-db.sh

CMD ["/bin/sh", "/app/wait-for-db.sh"]
