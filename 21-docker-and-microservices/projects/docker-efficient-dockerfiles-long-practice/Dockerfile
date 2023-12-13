#FROM ubuntu
FROM node:10-alpine3.9

# ADD . /app
WORKDIR /app
COPY *.json .
RUN npm install \
 # && npm cache clean --force
EXPOSE 3000

#RUN apt-get update
#RUN apt-get upgrade -y
#RUN DEBIAN_FRONTEND=noninteractive apt-get install -y npm nodejs
#RUN apt-get install -y openssh-server nginx
#RUN cd /app && npm install

#CMD sshd & cd /app && npm start
COPY . .
CMD npm start