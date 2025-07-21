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
FROM nginx:1.25.3

# Copy built frontend assets
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx config (updated to use /tmp for temp files)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Create directories in shared memory for nginx temp files
RUN mkdir -p /dev/shm/client_temp /dev/shm/proxy_temp /dev/shm/fastcgi_temp /dev/shm/uwsgi_temp /dev/shm/scgi_temp

EXPOSE 80

# Start Nginx normally (no need for mkdir in CMD anymore)
CMD ["nginx", "-g", "daemon off;"]
