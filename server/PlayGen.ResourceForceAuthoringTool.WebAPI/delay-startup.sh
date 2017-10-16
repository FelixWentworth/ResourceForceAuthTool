#!/bin/bash

if [ -z ${RESOURCEFORCEAUTHORINGTOOL_MARIADB_PORT_3306_TCP} ]; then
	echo "You must link this container with mariadb first"
	exit 1
fi
        
until nc -w 1 -z resourceforceauthoringtool-mariadb 3306; do
	echo "$(date) - waiting for resourceforceauthoringtool-mariadb..."
	sleep 1
done

exec "$@"
