const express = require('express')
const leaveController = require('../controller/leaveController');

const router = express.Router();

router.post("/create/:id",leaveController.empleave)

module.exports = router