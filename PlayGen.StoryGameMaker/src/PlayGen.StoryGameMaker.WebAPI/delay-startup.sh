#!/bin/bash

if [ -z ${SGM_MARIADB_PORT_3306_TCP} ]; then
	echo "You must link this container with mariadb first"
	exit 1
fi
        
until nc -w 1 -z sgm-mariadb 3306; do
	echo "$(date) - waiting for sgm-mariadb..."
	sleep 1
done

exec "$@"
