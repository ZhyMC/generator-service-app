FROM node:12.15.0

RUN mkdir -p /root/app/
WORKDIR /root/app
COPY . .

RUN npm install --registry="https://registry.npm.taobao.org/"
RUN npm run compile

EXPOSE <%= expose_port %>

CMD ["npm","start","--","--config=/etc/app.config.json"]
