let express = require('express')

let empRoute = require("./emproute");
 
let commonrouter = express.Router();

commonrouter.use("/employee",empRoute)

module.exports = commonrouter
