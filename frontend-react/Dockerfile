# Use Node.js base image
FROM node:16

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json /app/
RUN npm install

# Copy the rest of the frontend files
COPY . /app/

# Build the React app
RUN npm run build

# Serve the app using a static server
RUN npm install -g serve
CMD ["serve", "-s", "build"]
