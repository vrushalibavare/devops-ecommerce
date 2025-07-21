#!/bin/bash

echo "Building production Docker image..."
docker build -f Dockerfile.prod -t frontend-prod .

echo "Running container on port 8080..."
docker run -d -p 8080:8080 --name frontend-test frontend-prod

echo "Container is running at http://localhost:8080"
echo "To stop the container: docker stop frontend-test && docker rm frontend-test"