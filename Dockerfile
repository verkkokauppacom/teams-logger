FROM node:alpine as builder

COPY . .
RUN npm ci
RUN npm run build

FROM node:alpine

LABEL org.opencontainers.image.source=https://github.com/verkkokauppacom/teams-logger
ENTRYPOINT [ "/bin/teams-logger.js" ]

COPY --from=builder /index.js /package.json /package-lock.json .
RUN npm ci --production && rm package-lock.json

COPY --from=builder /bin/*.js ./bin
COPY --from=builder /lib/*.js ./lib
