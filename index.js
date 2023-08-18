const express = require('express');
require('dotenv').config();
require("./config/modelConfig")
const logger = require('./utils/logger');
let mainRouter = require("./urls")
let app = express()
const PORT = process.env.PORT || 9000 ;
const HOST = "localhost"
app.use(express.json())


app.use('/',mainRouter)


app.listen(process.env.PORT, ()=>{
    console.log("server listening on port ");
    logger.info(`server running on http://${HOST}:${PORT}`);

})
