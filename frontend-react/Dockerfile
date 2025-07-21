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

# Create directories in shared memory
RUN mkdir -p /dev/shm/client_temp /dev/shm/proxy_temp /dev/shm/fastcgi_temp /dev/shm/uwsgi_temp /dev/shm/scgi_temp

# Copy nginx config file
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
