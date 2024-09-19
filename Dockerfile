# Use a Node.js base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files first to leverage Docker cache
COPY package*.json ./

# Install dependencies (if you don't want to copy local node_modules)
RUN npm install

# Copy the entire project folder into the container, including the node_modules folder
COPY . .

# Expose the port the app runs on (for example, 3000)
EXPOSE 3000

# Set the environment to development
ENV NODE_ENV=development

# Command to run the app using npm run dev
CMD ["npm", "run", "dev"]
