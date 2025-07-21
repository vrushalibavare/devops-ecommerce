#!/bin/bash

echo "Building simplified version..."

# Ensure assets directory exists
mkdir -p public/assets

# Copy images to assets directory if they're not already there
for img in public/*.jpg public/*.png; do
  if [ -f "$img" ]; then
    filename=$(basename "$img")
    if [ ! -f "public/assets/$filename" ]; then
      echo "Copying $filename to assets directory..."
      cp "$img" "public/assets/"
    fi
  fi
done

# Create a placeholder image if it doesn't exist
if [ ! -f "public/assets/placeholder.jpg" ]; then
  echo "Creating placeholder image..."
  # This is a base64 encoded 1x1 pixel transparent PNG
  echo "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=" | base64 -d > public/assets/placeholder.jpg
fi

# Build the project
echo "Building the project..."
cp src/main-simple.jsx src/main.jsx.bak
cp src/main-simple.jsx src/main.jsx
npm run build
mv src/main.jsx.bak src/main.jsx

echo "Build complete!"