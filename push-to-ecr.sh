#!/bin/bash

# Set your AWS account ID and region
AWS_ACCOUNT_ID="255945442255"
AWS_REGION="ap-southeast-1"

# Login to ECR
echo "Logging in to Amazon ECR..."
aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com

# Create repositories if they don't exist
for repo in frontend product-service cart-service checkout-service order-service; do
  echo "Creating ECR repository for $repo if it doesn't exist..."
  aws ecr describe-repositories --repository-names $repo --region $AWS_REGION || \
  aws ecr create-repository --repository-name $repo --region $AWS_REGION
done

# Build and push backend services
for service in product-service cart-service checkout-service order-service; do
  echo "Building and pushing $service..."
  docker build -t $service ./backend/$service
  docker tag $service:latest $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$service:latest
  docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$service:latest
done

# Build and push frontend with production Dockerfile
echo "Building and pushing frontend..."
docker build -t frontend -f ./frontend-react/Dockerfile.prod ./frontend-react
docker tag frontend:latest $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/frontend:latest
docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/frontend:latest

echo "All images have been built and pushed to ECR!"
echo "ECR Repository URLs:"
for repo in frontend product-service cart-service checkout-service order-service; do
  echo "$repo: $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$repo"
done