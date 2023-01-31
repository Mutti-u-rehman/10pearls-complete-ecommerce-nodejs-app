# Ndoe Js, MongoDB and Express.js Server side rendring and REST API application

This repository contains the sample application for the [MongoDB and Express.js NodeJs App tutorial](https://www.mongodb.com/languages/express-mongodb-rest-api-tutorial).

<!-- ![main workflow](https://github.com/mongodb-developer/mongodb-express-rest-api-example/actions/workflows/main.yml/badge.svg) -->
### WIP: Action workflow need to be set

## Start learning from Official MongoDB University
Start learning from here: [MongoDB University](https://learn.mongodb.com/learning-paths/introduction-to-mongodb)

## How To Run

1. You can follow the [Getting Started with Atlas](https://docs.atlas.mongodb.com/getting-started/) guide, to learn how to create a free Atlas account, create your first cluster and get your Connection String to the database. 
Then, set the Atlas URI connection parameter in `server/config.env` to your Connection String:
```
ATLAS_URI=mongodb+srv://<username>:<password>@sandbox.jadwj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
```

2. Start the Express server:
```
cd server
npm install
npm install -g nodemon
nodemon server
```

## Disclaimer

Use at your own risk; not a supported MongoDB product

## [Reference for Docs](https://www.mongodb.com/blog/post/quick-start-nodejs-mongodb-how-to-get-connected-to-your-database)

