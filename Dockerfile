FROM node

USER root

WORKDIR /app

RUN  apt update &&  apt install stress-ng -y \
    && apt install curl -y 

COPY package.json .

RUN npm i package.json

ENV AWS_ACCESS_KEY_ID=AKIAWCIZBREJGT
ENV AWS_SECRET_ACCESS_KEY=GJMJ3BAC0WXDG5fDij1JYZ1L
ENV AWS_DEFAULT_REGION=us-east-1
EXPOSE 5000
COPY server.js .

HEALTHCHECK --interval=180s --timeout=30s --start-period=5s \
      --retries=3 CMD [ "curl", "localhost:5000/health" ]

CMD ["node", "server.js"]