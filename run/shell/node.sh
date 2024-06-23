container_name="backend-node"

container_id=$(docker ps -aqf "name=${container_name}")

docker exec -it $container_id /bin/sh