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

# Simple nginx config
RUN echo 'server { listen 80; server_name _; access_log /dev/stdout; error_log /dev/stderr; location / { root /usr/share/nginx/html; index index.html; try_files $uri $uri/ /index.html; } }' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
