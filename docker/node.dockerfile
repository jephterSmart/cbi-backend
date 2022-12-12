# Base on offical Node.js Alpine image
FROM node:16-alpine

RUN apk add --no-cache libc6-compat

# Set working directory
WORKDIR /usr/app

# Install PM2 globally
RUN npm install pm2 --global

# Copy package.json and package-lock.json before other files
# Utilise Docker cache to save re-installing dependencies if unchanged
COPY ./../package.json ./

#remove this package 
# Install dependencies
RUN rm -rf node_modules/
RUN npm install 
# RUN npm rebuild bcrypt --build-from-source

# Copy all files
COPY ../ ./

# Build app
RUN npm run build

# Expose the listening port
EXPOSE 3000

# Run container as non-root (unprivileged) user
# The node user is provided in the Node.js Alpine base image
USER node

# Launch app with PM2
CMD [ "pm2-runtime", "start", "npm", "--", "run", "start:prod" ]