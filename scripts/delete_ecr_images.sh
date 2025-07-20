#!/bin/bash

# List of repositories
REPOS=("shopmate-product" "shopmate-cart" "shopmate-checkout" "shopmate-order" "shopmate-frontend")

for repo in "${REPOS[@]}"; do
  echo "Deleting images from $repo..."
  
  # Get image IDs
  image_ids=$(aws ecr list-images --repository-name $repo --query 'imageIds[*]' --output json)
  
  if [ "$image_ids" != "[]" ] && [ "$image_ids" != "" ]; then
    # Delete images
    aws ecr batch-delete-image --repository-name $repo --image-ids "$image_ids" || echo "No images to delete in $repo"
  else
    echo "No images found in $repo"
  fi
done

echo "All images deleted."