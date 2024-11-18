# Use Node.js LTS as the base image
FROM node:22-alpine


# Define build-time arguments
ARG DB_URI
ARG MONGODB_LOCAL_URI
ARG CACHE_MANAGER_REDIS_URL

# Set environment variables inside the container
ENV DB_URI=$DB_URI
ENV MONGODB_LOCAL_URI=$MONGODB_LOCAL_URI
ENV CACHE_MANAGER_REDIS_URL=$CACHE_MANAGER_REDIS_URL
ENV NODE_ENV=production

# Install tzdata to set the timezone (using Alpine's package manager 'apk')
RUN apk add --no-cache tzdata

# Set the timezone to Africa/Algiers
RUN cp /usr/share/zoneinfo/Africa/Algiers /etc/localtime && echo "Africa/Algiers" > /etc/timezone

# Install TypeScript globally (optional, if you want `tsc` to be available globally)
RUN npm install -g typescript

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./


# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application code
COPY . .

# Build the Next.js app
RUN npm run build

# Expose the backend port
EXPOSE 3032

# Start the server
CMD ["npm", "start"]
