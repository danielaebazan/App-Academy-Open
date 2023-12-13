COPY is not chaining, but can copy to files to 1 folder
sudo docker build -t dv/deep-dive-phase-2 .
docker container run -it -p 8081:8081 --rm dv/deep-dive-phase-2 sh
ITER:
ls, pwd, ps -a
tini -- node app.js -> Working on 8081

docker container run -p 8081:8081 --name deep2 -d dv/deep-dive-phase-2
-->8081 working
CLEANING as phase1

BONUS: healthcheck
1st option done -with wget (curl is absent)
check: docker container inspect deep2 
(logs not showing)
2st option - add route for check and custom helthcheck.js

