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

# Production stage
FROM nginx:1.25.3

# Copy built files to nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Create a simple nginx config
RUN echo 'server { listen 80; server_name _; location / { root /usr/share/nginx/html; index index.html; try_files $uri $uri/ /index.html; } }' > /etc/nginx/conf.d/default.conf

# Nginx runs as root by default, but we need to make sure it can write to certain directories
RUN chown -R nginx:nginx /var/cache/nginx /var/log/nginx /var/run \
    && chmod -R 777 /var/cache/nginx /var/log/nginx /var/run

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
