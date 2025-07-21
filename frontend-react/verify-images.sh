#!/bin/bash

# This script is used to verify that images are in the correct location in the Docker container
# Run this after building and starting the container

CONTAINER_ID=$(docker ps | grep bitnami/nginx | awk '{print $1}')

if [ -z "$CONTAINER_ID" ]; then
  echo "No running nginx container found. Make sure the container is running."
  exit 1
fi

echo "Found container: $CONTAINER_ID"
echo "Checking image files in the container..."

echo "Files in /app directory:"
docker exec $CONTAINER_ID ls -la /app

echo "Files in /app/assets directory:"
docker exec $CONTAINER_ID ls -la /app/assets

echo "Checking nginx configuration:"
docker exec $CONTAINER_ID cat /opt/bitnami/nginx/conf/server_blocks/frontend.conf

echo "Checking nginx logs for errors:"
docker exec $CONTAINER_ID tail -n 20 /opt/bitnami/nginx/logs/error.log