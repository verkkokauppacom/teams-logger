FROM node:alpine

COPY bin /bin
COPY lib /lib
COPY index.js /index.js

COPY package.json package-lock.json /
RUN npm ci --production
RUN rm /package-lock.json

ENTRYPOINT [ "/bin/teams-logger.js" ]
