# Use a Node.js image
FROM node:18
#FROM node:18-alpine AS build 

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the frontend code
COPY . .

# Build the Next.js app
RUN npm run build

# Expose the port Next.js runs on
EXPOSE 3000

# Start the app
CMD ["npm", "run", "start"]