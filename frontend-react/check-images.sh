#!/bin/bash

echo "Checking image files in the project..."

# Check if the assets directory exists
if [ ! -d "public/assets" ]; then
  echo "ERROR: public/assets directory not found!"
  echo "Creating the directory..."
  mkdir -p public/assets
fi

# Check for required images
REQUIRED_IMAGES=("handbag.jpg" "mobilephone.jpg" "sunglasses.jpg")
MISSING_IMAGES=()

for img in "${REQUIRED_IMAGES[@]}"; do
  if [ ! -f "public/assets/$img" ]; then
    if [ -f "public/$img" ]; then
      echo "Found $img in public directory, copying to public/assets..."
      cp "public/$img" "public/assets/"
    else
      MISSING_IMAGES+=("$img")
    fi
  else
    echo "✓ Found $img in public/assets"
  fi
done

if [ ${#MISSING_IMAGES[@]} -gt 0 ]; then
  echo ""
  echo "WARNING: The following required images are missing:"
  for img in "${MISSING_IMAGES[@]}"; do
    echo "  - $img"
  done
  echo ""
  echo "Please add these images to the public/assets directory."
else
  echo ""
  echo "All required images are present!"
fi

echo ""
echo "Image paths in the project:"
find public -name "*.jpg" -o -name "*.png" | sort