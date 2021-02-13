FROM node:12.15.0

RUN mkdir -p /root/app/
WORKDIR /root/app
COPY . .


EXPOSE <%= expose_port %>

CMD ["npm","start","--","--start","--config","/etc/app.conf"]
