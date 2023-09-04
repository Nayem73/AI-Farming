# Use an official Node.js runtime as the base image for building
FROM node:18 AS build

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

# Use a lightweight web server image to serve the built app
FROM nginx:alpine

# Copy the built app from the previous stage to the web server directory
COPY --from=build /app/build /usr/share/nginx/html
# Copy the nginx configuration file to the container
COPY --from=build /app/nginx/default.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start the nginx web server
CMD ["nginx", "-g", "daemon off;"]