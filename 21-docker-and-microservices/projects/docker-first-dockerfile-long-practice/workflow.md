docker build .
Not working, error with downloading image. (Test with image pull works)
What helps:
sudo docker build .

Also helps:

rerun vscode
docker system prune -a (total docker clean)

Nb: when loading image with build, it creates as noname (no repo no tag).
If pulled first, it has name and tag

docker build . -t dmytro2v/node
 -> now witg repo and tag-latest

- put server in app/ , add console.log, test with node app/server
- fill Dockerfile:
WORKDIR /app
COPY app/server.js /app

- run 
docker container run -it dmytro2v/node-server /bin/sh
ls
- add EXPOSE 8000 to dfile
- run with -p
docker container run -it -p 8000:8000 dmytro2v/node-server /bin/sh
</app #> node server.js
server visible!
- Option : just run:
docker container run -d -p 8000:8000 dmytro2v/node-server node server.js

- adding to dfile:
CMD ["node", "server.js"]

-rebuld:
docker build . -t dmytro2v/node
- run:
docker container run --name node -d -p 80:8000 dmytro2v/node
or
docker container run --name node -d -p 80:8000 dmytro2v/node:latest

- clean:
docker container rm node -f
docker system prune -a
