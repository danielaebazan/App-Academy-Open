#Dockerfile:
FROM node:alpine as build-stage
WORKDIR /app

#first build:
sudo docker build -t dv/deep3 .

#check container:
docker container run -it --name deep3 --rm dv/deep3 ../bin/sh
ls ..

# Step 3: Copy in all the files needed to install dependencies
COPY *.json .

# Step 4: Install dependencies using npm
#   To keep the image small, (force) clean the npm cache after
#   Chain the commands to reduce the number of layers in the image
RUN npm install \
  && npm cache clean --force

# Step 5: Copy in all the files from the current directory
COPY . .

#check:
docker container run -it --name deep3 --rm dv/deep3 sh
ls 

