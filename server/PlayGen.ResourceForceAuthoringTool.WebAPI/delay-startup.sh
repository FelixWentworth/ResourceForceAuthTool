#!/bin/bash

if [ -z ${RESOURCEFORCEAUTHORINGTOOL_V1_MARIADB_PORT_3306_TCP} ]; then
	echo "You must link this container with mariadb first"
	exit 1
fi
        
until nc -w 1 -z resourceforceauthoringtool-v1-mariadb 3306; do
	echo "$(date) - waiting for resourceforceauthoringtool-v1-mariadb..."
	sleep 1
done

exec "$@"
