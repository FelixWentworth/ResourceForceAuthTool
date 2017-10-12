#/bin/bash
export DB_CONTAINER="resourceforceauthoringtool-mariadb"
export CONTAINER="resourceforceauthoringtool"
docker stop $CONTAINER
docker stop $DB_CONTAINER
docker rm $CONTAINER
docker rm $DB_CONTAINER
docker-compose up -d
