# builder image
FROM node:14-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --no-optional

COPY . .

RUN npm run build

# production image
FROM node:14-alpine

ENV NODE_ENV=production

WORKDIR /app

COPY package*.json ./

RUN npm ci --no-optional &&\
    npm cache clean --force

COPY --from=builder /usr/src/app/build ./build/

EXPOSE 8080

USER node

CMD [ "node", "build/main.js" ]
