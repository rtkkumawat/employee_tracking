const empValSchema = require("../validations/employeevalSchema")

 const registerEmpValidation = async (req, res, next) => {
    const value = await empValSchema.registerEmployee.validate(req.body, { aboutEarly: false })
    if (value.error) {
        res.status(403).json({
            success: false,
            message: value.error.details[0].message
        })
    } else {
        next()
    }
}
const loginEmpValidation = async (req, res, next) => {
    const value = await empValSchema.loginEmp.validate(req.body, { aboutEarly: false })
    if (value.error) {
        res.status(403).json({
            success: false,
            message: value.error.details[0].message
        })
    } else {
        next()
    }
}
const ResetPasswordEmpValidation = async (req, res, next) => {
    const value = await empValSchema.empResetPassword.validate(req.body, { aboutEarly: false })
    if (value.error) {
        res.status(403).json({
            success: false,
            message: value.error.details[0].message
        })
    } else {
        next()
    }
}

module.exports = { 
    registerEmpValidation,loginEmpValidation,
    ResetPasswordEmpValidation 
}