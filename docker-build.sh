#/bin/bash
export CONTAINER="storygamemaker"
docker build ./server -t $CONTAINER .
