# Use Node.js official image
FROM node:20

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy source code
COPY . .

# Expose the dev server port
EXPOSE 5173

# Start the Vite dev server
CMD ["npm", "run", "dev"]
