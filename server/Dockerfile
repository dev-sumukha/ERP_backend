# Use the official Node.js image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the app dependencies
RUN npm install

# Copy the entire project directory into the container
COPY . .

# Expose the port on which the app will run (adjust if your app uses a different port)
EXPOSE 3000

# Correct format for setting the environment variable
ENV NODE_ENV=production

# Command to run the app
CMD ["npm", "run","dev"]
