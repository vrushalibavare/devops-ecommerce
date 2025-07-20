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

# Install express for the server
RUN npm install express --save

# Copy the server file
COPY server.js .

EXPOSE 80

CMD ["node", "server.js"]
