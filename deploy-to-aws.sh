#!/bin/bash

# Exit on error
set -e

# Configuration
AWS_REGION="us-east-1"  # Change to your preferred region
ECR_REPO_NAME="ecommerce-frontend"
ECS_CLUSTER_NAME="ecommerce-cluster"
ECS_SERVICE_NAME="frontend-service"
ECS_TASK_FAMILY="frontend-task"

# Step 1: Build the Docker image
echo "Building Docker image..."
docker build -f frontend-react/Dockerfile.prod -t $ECR_REPO_NAME:latest frontend-react

# Step 2: Login to ECR
echo "Logging in to ECR..."
aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com

# Step 3: Create ECR repository if it doesn't exist
echo "Creating ECR repository if it doesn't exist..."
aws ecr describe-repositories --repository-names $ECR_REPO_NAME --region $AWS_REGION || \
  aws ecr create-repository --repository-name $ECR_REPO_NAME --region $AWS_REGION

# Step 4: Tag and push the image
echo "Tagging and pushing image to ECR..."
docker tag $ECR_REPO_NAME:latest $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPO_NAME:latest
docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPO_NAME:latest

# Step 5: Update the ECS service
echo "Updating ECS service..."
aws ecs update-service --cluster $ECS_CLUSTER_NAME --service $ECS_SERVICE_NAME --force-new-deployment --region $AWS_REGION

echo "Deployment complete! The new version should be live in a few minutes."