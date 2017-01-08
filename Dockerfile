FROM node:6.4.0


RUN apt-get update -qq && apt-get install -y build-essential

ADD . /webapp-main
WORKDIR /webapp-main

#Set npm registry for fast loading of npm modules
RUN npm config set registry http://registry.npmjs.org/

# Install global packages needed
RUN npm install gulp -g && npm install pm2 -g

# Install Local packages needed and run build
RUN npm install && gulp build && npm run build

# Start the application
CMD pm2 start --no-daemon  bin/server.js
