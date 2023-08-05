# Use an official Node.js runtime as the base image
FROM node:14 as build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# Use a lightweight Node.js runtime as the final base image
FROM node:14-slim

# Set the working directory
WORKDIR /app

# Copy the built app from the previous stage
COPY --from=build /app/build .

# Expose the desired port (e.g., 80)
EXPOSE 80

# Start the app
CMD ["node", "index.js"]
