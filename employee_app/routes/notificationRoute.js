const express = require("express")
const notification = require("../../employee_app/controller/EmpnotificationController")

const router = express.Router();

router.post("/sent/:id",notification.empnotification)

module.exports = router
