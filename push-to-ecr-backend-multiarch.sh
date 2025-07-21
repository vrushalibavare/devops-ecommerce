#!/bin/bash

# Set your AWS account ID and region
AWS_ACCOUNT_ID="255945442255"
AWS_REGION="ap-southeast-1"
PROJECT_NAME="shopmate"

# Login to ECR
echo "Logging in to Amazon ECR..."
aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com

# Create buildx builder if it doesn't exist
docker buildx inspect multi-arch-builder >/dev/null 2>&1 || docker buildx create --name multi-arch-builder --use

# Build and push backend services
for service in product cart checkout order; do
  SERVICE_DIR="${service}-service"
  REPO_NAME="${PROJECT_NAME}-${service}"
  
  echo "Building and pushing multi-architecture $REPO_NAME..."
  docker buildx build --platform linux/amd64,linux/arm64 \
    --tag $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$REPO_NAME:latest \
    --push \
    ./backend/$SERVICE_DIR
done

echo "All backend images have been built and pushed to ECR!"