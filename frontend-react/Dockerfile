# Build stage
FROM --platform=linux/amd64 node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build

# Production nginx stage
FROM --platform=linux/amd64 nginx:alpine

# Copy the entire built frontend (including assets)
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx configs
COPY nginx-main.conf /etc/nginx/nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# Copy startup script
COPY docker-entrypoint.sh /usr/local/bin/

# Make it executable
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Use this script as the container entrypoint
ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]




#CMD ["nginx", "-g", "daemon off;"]
