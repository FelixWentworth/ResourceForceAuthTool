#/bin/bash
export CONTAINER="resourceforceauthoringtool-v0"
docker build ./server -t $CONTAINER .
