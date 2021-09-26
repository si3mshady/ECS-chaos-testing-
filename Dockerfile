FROM node

USER root

WORKDIR /app

RUN  apt update &&  apt install stress-ng -y \
    && apt install curl -y  && apt install psmisc   -y 

RUN  curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64-2.0.30.zip" -o "awscliv2.zip" \
   && unzip awscliv2.zip &&  ./aws/install

COPY server.js .

COPY package.json .

RUN npm i package.json
ENV AWS_ACCESS_KEY_ID=AKIAVWN888
ENV AWS_SECRET_ACCESS_KEY=7J3cmM2Un4km0888
ENV AWS_DEFAULT_REGION=us-east-1
EXPOSE 5000

HEALTHCHECK --interval=180s --timeout=30s --start-period=5s \
      --retries=3 CMD [ "curl", "localhost:5000/health" ]

CMD ["node", "server.js"]

# sam deploy --guided --capabilities CAPABILITY_NAMED_IAM