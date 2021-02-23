FROM node:alpine

COPY --from=0 / /

RUN mkdir -p /root/app/
WORKDIR /root/app
COPY . .

RUN npm install --registry=https://registry.yarnpkg.com/ --unsafe-perm

CMD ["npm","start","--","--start","--config","/etc/app.conf"]
