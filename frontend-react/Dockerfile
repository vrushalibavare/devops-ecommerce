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

# No need for express, using built-in http module

# Copy the server file
COPY server.js .

EXPOSE 80

CMD ["node", "server.js"]
