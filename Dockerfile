# pull node status LTS version
FROM node:boron

ENV NODE_ENV production
ENV PM2_ROOT /root/.pm2

ENV NODE_PORT 3000
ENV DEBUG printgic:*

RUN apt-get update -y
# RUN apt-get install graphicsmagick -y

# Create app directory
RUN mkdir -p /opt/printgic/etc
RUN mkdir -p /opt/printgic/api/v1

# Copy source to working dir
COPY . /opt/printgic/api/v1

# # Copy ssl from var/ssl to /etc/ssl
# COPY var/ssl /etc/ssl


# installing core dependencies
WORKDIR /opt/printgic/api/v1/.core
RUN npm install

# move to directory
WORKDIR /opt/printgic/api/v1

# install global node modules
RUN npm install -g node-gyp
RUN npm install -g pm2

# install app dependencies
RUN npm install

EXPOSE $NODE_PORT
CMD [ "pm2-docker", "process.json" ]
