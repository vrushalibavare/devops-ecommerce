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
FROM nginx:1.25.3-alpine

# Copy built frontend assets
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Create necessary directories in shared memory
RUN mkdir -p /dev/shm/client_temp /dev/shm/proxy_temp /dev/shm/fastcgi_temp /dev/shm/uwsgi_temp /dev/shm/scgi_temp

EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
