FROM node:alpine as builder

COPY . .
RUN npm ci
RUN npm run build

FROM node:alpine

COPY --from=builder /bin/*.js ./bin
COPY --from=builder /lib/*.js ./lib
COPY --from=builder /index.js /package.json /package-lock.json .

RUN npm ci --production && rm package-lock.json

ENTRYPOINT [ "/bin/teams-logger.js" ]
