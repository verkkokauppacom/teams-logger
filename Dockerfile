FROM node:alpine as builder

COPY . .
RUN npm ci
RUN npm run build

FROM node:alpine

LABEL org.opencontainers.image.source=https://github.com/verkkokauppacom/teams-logger
ENTRYPOINT [ "/teams-logger/bin.js" ]

RUN mkdir /teams-logger
WORKDIR /teams-logger

COPY --from=builder /package.json /package-lock.json .
RUN npm ci --production && rm package-lock.json

COPY --from=builder /dist/* .
