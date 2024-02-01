const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
const dbConnect = require("./database/index");


function launchServer() {
    const app = express()
        .use(cors())
        .use(morgan('dev'))
        .use(express.json())
        .use('/api', require('./api/routes/index'))
        .listen(process.env.PORT, () => {
            console.log("Express server listening on port " + process.env.PORT)
        })
}

async function startAPI() {
  await dbConnect();
  launchServer();
}

startAPI();