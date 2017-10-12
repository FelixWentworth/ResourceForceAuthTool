#/bin/bash
export CONTAINER="resourceforceauthoringtool"
docker build ./server -t $CONTAINER .
