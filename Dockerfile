# Use the specific version of the official Node.js base image
FROM node:14.21.3

# Create app directory in the Docker image
WORKDIR /usr/src/app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install app dependencies using Yarn
RUN yarn install --frozen-lockfile

# Bundle app source inside Docker image
COPY . .

# Your app binds to port 3000 so you'll use the EXPOSE instruction to have it mapped by the docker daemon
EXPOSE 3000

# Define the command to run your app using CMD which defines your runtime
CMD [ "node", "index.js" ]
