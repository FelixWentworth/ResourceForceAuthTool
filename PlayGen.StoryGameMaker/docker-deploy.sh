#/bin/bash
export DB_CONTAINER="sgm-mariadb"
export CONTAINER="sgm"
docker stop $CONTAINER
docker stop $DB_CONTAINER
docker rm $CONTAINER
docker rm $DB_CONTAINER
docker-compose up -d
