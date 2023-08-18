const express = require('express')
const timeSheet = require("../controller/timeSheetController")

const router = express.Router();

router.get("/clockIn/:id",timeSheet.clockIn)
router.patch("/clockOut/:id",timeSheet.clockOut)
//router.patch("/clockOut/:id",timeSheet.holidays)

module.exports = router