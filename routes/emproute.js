const express = require('express')
const employee = require('../controller/empcontroler');
const router = express.Router();
const { registerEmpValidation, loginEmpValidation, ResetPasswordEmpValidation } = require('../validations/empDataValidation');

router.post("/create", registerEmpValidation, employee.createEmp)
router.post("/login", loginEmpValidation, employee.empLogin)
router.post("/reset", ResetPasswordEmpValidation, employee.empResetPasswordEmail)

module.exports = router