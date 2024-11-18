# Use Node.js LTS as the base image
FROM node:22-alpine

# Install tzdata to set the timezone (using Alpine's package manager 'apk')
RUN apk add --no-cache tzdata

# Set the timezone to Africa/Algiers
RUN cp /usr/share/zoneinfo/Africa/Algiers /etc/localtime && echo "Africa/Algiers" > /etc/timezone

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application code
COPY . .

# Expose the backend port
EXPOSE 3032

# Start the server
CMD ["npm", "start"]
