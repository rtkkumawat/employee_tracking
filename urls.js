let express = require('express')

let empRoute = require("./employee_app/routes/emproute");
let timeSheetRoute = require("./employee_app/routes/timeSheetRoutes")
let leaveRoute = require("./employee_app/routes/leaveRoute")
let notificationRoute = require("./employee_app/routes/notificationRoute")
let adminRoutes = require("./admin_app/routes/adminRoutes")

let mainrouter = express.Router();

mainrouter.use("/employee",empRoute)
mainrouter.use("/timesheet",timeSheetRoute)
mainrouter.use("/leave",leaveRoute)
mainrouter.use("/notification",notificationRoute)
mainrouter.use("/admin",adminRoutes)

module.exports = mainrouter
