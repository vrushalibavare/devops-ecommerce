#!/bin/bash

# Set your AWS account ID and region
AWS_ACCOUNT_ID="255945442255"
AWS_REGION="ap-southeast-1"
PROJECT_NAME="shopmate"

# Login to ECR
echo "Logging in to Amazon ECR..."
aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com

# Build and push backend services
for service in product cart checkout order; do
  SERVICE_DIR="${service}-service"
  REPO_NAME="${PROJECT_NAME}-${service}"
  
  echo "Building and pushing $REPO_NAME..."
  docker build --platform=linux/amd64 -t $REPO_NAME ./backend/$SERVICE_DIR
  docker tag $REPO_NAME:latest $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$REPO_NAME:latest
  docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$REPO_NAME:latest
done

echo "All backend images have been built and pushed to ECR!"