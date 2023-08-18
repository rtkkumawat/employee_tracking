const express = require('express')
const employee = require('.././controller/empController');
const{ upload }= require("../middlewares/empImageStorage")
const { registerEmpValidation, loginEmpValidation, ResetPasswordEmpValidation } = require('../validations/empDataValidation');
const isEmployee = require("../middlewares/authService")
const { empAuthentication} = require("../middlewares/authToken")
const router = express.Router();

router.post("/create", registerEmpValidation, employee.createEmp)
router.post("/login", isEmployee.isEmployee,loginEmpValidation, employee.empLogin)
router.post("/sendEmail", employee.empsendEmail)
router.post("/reset/:id/:token",ResetPasswordEmpValidation,employee.empPasswordReset)
router.patch("/updateProfilePic/:id",upload.single("profilePic"),employee.updateProfilePic)
module.exports = router