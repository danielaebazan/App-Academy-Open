Phase 0: Let's Run Some Containers

For each of the following containers make sure you are running them detached using --detach or -d and naming each of them with --name. Name each container with the image it is running (it's easier to keep track that way). Remember: containers cannot listen on the same local ports!

Run one container with the nginx image
The Nginx image provides an open source and easy to use proxy server. Have this container listening on 80:80

docker container run -d --name nginx1 -p 80:80 nginx

Run one container with the httpd (apache) image
 - EXPOSE 80 so 
 docker container run -d --name httpd2 -p 8080:80 httpd

Run one container with the mysql image:
docker container run -d --name mysql3 -p 3306:3306 -e MYSQL_ROOT_PASSWORD=password mysql

docker container stop mysql3 nginx1 httpd2  
docker container rm mysql3 nginx1 httpd2  

===============Phase 1: The Shell Within:=================
To enter a container you'll write something like the following:

docker container run -it <IMAGENAME> <ARG>
docker container run -it --name web nginx bash
exit
docker container ls -a
docker container start web
docker container exec -it web bash

docker container ls

           Who-buntu? U-buntu!:
docker container run --name ubuntu -d -t ubuntu
docker exec -i ubuntu bash
apt-get install -y curl
docker container run -it --name notliketheother ubuntu bash

============Phase 2: Character generator===========
docker container run --name char -d -t alpine:3.7.3

docker exec -it char /bin/sh -c "while :; do wget -qO- https://swapi.dev/api/people/?search=r2; printf '\n'; sleep 5s; done"
docker container logs char


If you try to install and use wget on Alpine Linux you might get the error: wget: can't execute 'ssl_helper': No such file or directory. Here I’m going to show you how to fix the error or in other words how to install properly Wget on Alpine Linux.


Install Wget on Alpine Linux
Step 1. Update the apk packages.

apk update
Step 2. Install wget together with ca-certificates.

apk add ca-certificates wget
Step 3. After updating ca-certificates you can run wget without errors.

update-ca-certificates
Step 4. Verify the installation.

wget --version

/bin/sh -c "while :; do wget -qO- https://swapi.dev/api/people/?search=r2; printf '\n'; sleep 5s; done"
or while :; do wget -qO- https://swapi.dev/api/people/?search=r2; printf '\n'; sleep 5s; done (from terminal)

==============Phase 3: Networks=======================
  DNS Round Robin Test
docker network create mynet

/Bridge networks apply to containers running on the same Docker daemon host/
/User-defined bridges provide automatic DNS resolution between containers/

docker container run -d --name ela1 --net mynet --net-alias="alas" elasticsearch:2
docker container run -d --name ela2 --net mynet --net-alias="alas" elasticsearch:2
docker container inspect ela1
docker network inspect mynet
docker container run  --name alp --net mynet alpine nslookup alas
{
  $ docker container run  --name cen --net mynet -it centos
  curl -s alas:9200
  curl -s alas:9200
  curl -s alas:9200
  curl -s alas:9200
  curl -s alas:9200
},
or: 
docker container run  --name cen --net mynet --rm -it centos curl -s alas:9200 
  - several times
================Phase 4: Persistent Data in Docker================
  --Bind mounts--

docker container run -d --name DogsRGood nginx
docker container exec -it DogsRGood  bash

mkdir rad
touch rad/randomrad.txt
echo "hello world" >> rad/randomrad.txt
cat rad/randomrad.txt
hello world

docker container run -d -it --name DogsRGood \
    --mount type=bind,source="$(pwd)"/rad,target=/rad \
    nginx:latest
docker container exec -it DogsRGood  bash
ls
cd rad
cat randomrad.txt

# echo "hello localhost" >> randomrad.txt
# exit

  --Volumes--

 docker run -d \
  --name voltest \
  --mount source=psql-data,target=/var/lib/postgresql/data \
  postgres:9.6.1-alpine

docker volume ls
docker volume inspect psql-data

docker container exec -it voltest psql -U postgres
#
CREATE TABLE cats
(
id SERIAL PRIMARY KEY,
name VARCHAR (255) NOT NULL
);
-- cat seeding
INSERT INTO
cats (name)
VALUES
('Jet');

SELECT * FROM cats;
\q
docker volume ls

docker run -d \
  --name voltest2 \
  --mount source=psql-data,target=/var/lib/postgresql/data \
  postgres:9.6.2-alpine

docker container exec -it voltest2 psql -U postgres
#
SELECT * FROM cats;
SUCCESS!
\q

CLEAN UP:
docker container rm -f $(docker ps -aq)
docker volume prune

======= Bonus Phase: Health Checks ======
Just looked through some manuals.
Looks like HC is need when using docker containers connected.
HC runs some test to check connection is alive.