#!/bin/sh
set -e

# Create required directories in /dev/shm
mkdir -p /dev/shm/nginx/client-body \
         /dev/shm/nginx/proxy \
         /dev/shm/nginx/fastcgi \
         /dev/shm/nginx/uwsgi \
         /dev/shm/nginx/scgi

# Start nginx in the foreground
nginx -g 'daemon off;'
