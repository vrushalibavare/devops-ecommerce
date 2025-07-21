#!/bin/bash

# Set your AWS account ID and region
AWS_ACCOUNT_ID="255945442255"
AWS_REGION="ap-southeast-1"

# Login to ECR
echo "Logging in to Amazon ECR..."
aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com

# Create repositories if they don't exist
PROJECT_NAME="shopmate"
for repo in frontend product cart checkout order; do
  REPO_NAME="${PROJECT_NAME}-${repo}"
  echo "Creating ECR repository for $REPO_NAME if it doesn't exist..."
  aws ecr describe-repositories --repository-names $REPO_NAME --region $AWS_REGION || \
  aws ecr create-repository --repository-name $REPO_NAME --region $AWS_REGION
done

# Build and push backend services
for service in product cart checkout order; do
  SERVICE_DIR="${service}-service"
  REPO_NAME="${PROJECT_NAME}-${service}"
  echo "Building and pushing $REPO_NAME..."
  docker build -t $REPO_NAME ./backend/$SERVICE_DIR
  docker tag $REPO_NAME:latest $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$REPO_NAME:latest
  docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$REPO_NAME:latest
done

# Build and push frontend with production Dockerfile
REPO_NAME="${PROJECT_NAME}-frontend"
echo "Building and pushing $REPO_NAME..."

# Enable Docker BuildKit for multi-platform builds
export DOCKER_BUILDKIT=1

# Build for AMD64 platform (Fargate uses this)
docker build --platform=linux/amd64 -t $REPO_NAME -f ./frontend-react/Dockerfile.prod ./frontend-react
docker tag $REPO_NAME:latest $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$REPO_NAME:latest
docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$REPO_NAME:latest

echo "All images have been built and pushed to ECR!"
echo "ECR Repository URLs:"
for repo in frontend product cart checkout order; do
  REPO_NAME="${PROJECT_NAME}-${repo}"
  echo "$repo: $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$REPO_NAME"
done