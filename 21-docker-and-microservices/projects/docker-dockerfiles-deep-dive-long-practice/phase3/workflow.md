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

# Step 6: Build application
RUN npm run build
#explanation: build is package.json command here:
#"build": "react-scripts build"
#react-scripts is module used by Create React App.
#So result will be as build directory for react.
##here checked it with creating copy directore phase3-manual,
##run npm install and npm run build here.

# Step 7: Bring in the base image for NGINX (alpine)
FROM nginx:alpine

# Step 8: Set working directory to the html folder for nginx
#   (Hint: This directory was also used in phase 1)
WORKDIR /usr/share/nginx/html

# Step 9: Copy over the build files from build-stage
#   The build directory was created inside the app directory in the 
#   build-stage. The files inside that folder can be put directly into
#   the html folder that you just set as your working directory

COPY --from=build-stage /app/build .

# Step 10: Replace the default NGINX config with the application's version
#    The absolute path to the default NGINX config file is 
#    /etc/nginx/conf.d/default.conf —replace it with the nginx.conf file
#    provided in this folder
COPY nginx.conf  /etc/nginx/conf.d/default.conf
# (No need to add a CMD because it's included in the base image)
## with node version > 16 here we have app build error...

#check healthstatus
docker container inspect deep3

#clean:
docker container stop  deep3
... rm ...
docker system prune -a