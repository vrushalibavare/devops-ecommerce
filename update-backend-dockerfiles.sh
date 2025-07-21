#!/bin/bash

# Update all backend Dockerfiles to specify platform
for service in product-service cart-service checkout-service order-service; do
  echo "Updating Dockerfile for $service..."
  
  # Check if Dockerfile exists
  if [ -f "./backend/$service/Dockerfile" ]; then
    # Add platform specification to FROM line
    sed -i '' 's/^FROM /FROM --platform=linux\/amd64 /' "./backend/$service/Dockerfile"
    echo "Updated Dockerfile for $service"
  else
    echo "Dockerfile not found for $service"
  fi
done

echo "All backend Dockerfiles updated!"