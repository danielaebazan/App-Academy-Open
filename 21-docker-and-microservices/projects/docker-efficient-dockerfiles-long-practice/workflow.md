1. build in local directory:
npm install
npm start
localhost:3000

2. Dockerfile:
sudo docker build -t original .
-> very long - 170s. more then 2 minutes install npm
docker image ls:
-> size 964 mb

Phase 1: Docker ignore
#check inside:
docker container run -it -p 3001:80 --name first  --rm original 
bash
ls
cd app
ls -a
-> See node_modules and local and .git

With .dockerignore:
sudo docker build -t dockerignore .
-> 185 s, 145 install npm
964mb
docker container run -it -p 3000:3000 --name first  --rm original 
bash
make some practice....
view layers: 
docker history <img-name>
using cashe: long builds (if any) first, changes then

final:
docker container run -d -p 3000:3000 --name last last