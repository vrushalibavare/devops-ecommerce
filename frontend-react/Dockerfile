FROM node:20 as build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all frontend source code
COPY . .

# Build the app
RUN npm run build

# --- Production Stage ---
FROM bitnami/nginx:latest

# Copy built frontend assets
COPY --from=build /app/dist /app

EXPOSE 8080

# Bitnami nginx runs on port 8080 by default and is designed for read-only filesystems
