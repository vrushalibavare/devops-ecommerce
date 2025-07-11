#!/bin/bash
USERNAME="vrushalibavare"

# Build all images
docker build -t $USERNAME/shopmate-product:latest ./backend/product-service
docker build -t $USERNAME/shopmate-cart:latest ./backend/cart-service  
docker build -t $USERNAME/shopmate-checkout:latest ./backend/checkout-service
docker build -t $USERNAME/shopmate-order:latest ./backend/order-service
docker build -t $USERNAME/shopmate-frontend:latest ./frontend-react

# Push all images
docker push $USERNAME/shopmate-product:latest
docker push $USERNAME/shopmate-cart:latest
docker push $USERNAME/shopmate-checkout:latest
docker push $USERNAME/shopmate-order:latest
docker push $USERNAME/shopmate-frontend:latest

echo "All images pushed to DockerHub!"
