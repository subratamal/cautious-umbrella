[![Build Status](http://52.66.119.13:8080/buildStatus/icon?job=webapp master branch job)](http://52.66.119.13:8080/job/webapp%20master%20branch%20job/)

# CD Webapp Main

## Installation

```bash
npm install
gulp build
```
## Running Dll File

```bash
npm run build:dll
```
First time only required and when new package added in config then after need to start run dll, before start server and
when new package is come then after add name in webpack/config.dll.js file.

## Running Dev Server

```bash
npm run dev
```

The first time it may take a little while to generate the first `webpack-assets.json` and complain with a few dozen `[webpack-isomorphic-tools] (waiting for the first Webpack build to finish)` printouts, but be patient. Give it 30 seconds.

## Building and Running Production Server

```bash
npm run build
npm run start
```
## Deployment on Heroku

To get this project to work on Heroku, you need to:

1. `heroku config:set NODE_ENV=production`
2. `heroku config:set NODE_PATH=./src`
3. `heroku config:set NPM_CONFIG_PRODUCTION=false`
  * This is to enable webpack to run the build on deploy.
4. `git push heroku master -f`

The first deploy might take a while, but after that `node_modules` dir should be cached.

## Testing
### Run unit tests
```bash
npm run test
```
### Run eslint
```bash
npm run eslint
```
### Build development server using Docker
For Mac OS install Docker toolbox. Follow this link https://docs.docker.com/toolbox/toolbox_install_mac/
For Windows user install Docker toolbox. Follow this link https://docs.docker.com/toolbox/toolbox_install_windows/

For ubuntu user. Follow this link https://docs.docker.com/compose/install/
1. First install docker-engine
2. Install docker-compose

## How to run docker container
1. Navigate to your webapp-main code
2. ```sudo docker-compose up``` It will build and start your container
3. To stop the container `sudo docker-compose stop`
4. To remove the container First stop the container `sudo docker-compose stop` then `sudo docker-compose rm`
5. For any changes in your code you need to rebuild the container.
6. To rebuild the container stop the container and remove ( Follow step 3 and 4) and re run `sudo docker-compose build`
   followed by `sudo docker-compose up` then `sudo docker-compose start`
