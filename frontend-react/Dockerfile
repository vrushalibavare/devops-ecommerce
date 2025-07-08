FROM node:20

WORKDIR /app

ENV NODE_ENV=development

# Copy package files
COPY package*.json ./

# Delete existing node_modules and package-lock.json if any
RUN rm -rf node_modules package-lock.json

# Fresh install dependencies (including optional dependencies)
RUN npm install

# Copy all frontend source code
COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]
