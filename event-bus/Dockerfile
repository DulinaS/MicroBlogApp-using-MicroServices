#Here we are creating a Docker image for event-bus microservice
# We are using node:alpine as the base image
# We are copying the package.json file to the working directory
# We are installing the dependencies using npm install
# We are copying the rest of the files to the working directory
# We are using npm start to start the application

FROM node:alpine

WORKDIR /app
COPY package.json ./
RUN npm install
COPY ./ ./

CMD ["npm", "start"]
