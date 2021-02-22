FROM node:alpine as builder

WORKDIR /teams-logger

COPY . .
RUN npm ci
RUN npm run build

FROM node:alpine

LABEL org.opencontainers.image.source=https://github.com/verkkokauppacom/teams-logger
WORKDIR /teams-logger
ENTRYPOINT ["node" ,"bin/teams-logger.js"]

COPY --from=builder /teams-logger/package.json /teams-logger/package-lock.json /teams-logger/
RUN npm ci --production && rm package-lock.json

COPY --from=builder /teams-logger/bin/*.js /teams-logger/bin/
COPY --from=builder /teams-logger/lib/*.js /teams-logger/lib/
