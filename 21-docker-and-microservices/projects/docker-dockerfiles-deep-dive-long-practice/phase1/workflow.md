sudo docker build -t dmytro2v-nginx/deep-dive-phase-1 .
docker container run -p 8080:80 --name deep1 -d dmytro2v-nginx/deep-dive-phase-1

CLEANING:
docker container stop deep1
docker container rm deep1
docker system prune -a

Adding simply healthcheck and repeat.
Healthcheck use inner curl and so lan/port local80

check in 
docker container logs deep1 (every 30 sec adds)
or docker container inspect deep1

CLEANING
