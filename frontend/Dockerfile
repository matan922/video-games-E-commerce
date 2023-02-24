# base image
FROM node:14-alpine

# set working directory
WORKDIR /app

# add package.json and package-lock.json
COPY package*.json ./

# install dependencies
RUN npm install

# copy the rest of the application code
COPY . .

# build the production version of the application
RUN npm run build

# start the application
CMD ["npm", "start"]
