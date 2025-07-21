#!/bin/bash
# Run this after starting the container to debug image issues
CONTAINER_ID=$(docker ps | grep nginx | awk '{print $1}')
if [ -z "$CONTAINER_ID" ]; then
  echo "No nginx container found"
  exit 1
fi
echo "Container ID: $CONTAINER_ID"
echo "Checking file structure:"
docker exec $CONTAINER_ID find /app -type f -name "*.jpg" | sort