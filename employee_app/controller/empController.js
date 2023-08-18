const employeeSchema = require("../../model/employeeSchema")
const bcrypt = require("bcrypt")
const employeeLogger = require("../../utils/employeeLogger")
const jwt = require('jsonwebtoken')
const { transporter } = require("../service/emailService")
const authService = require("../service/authService")
const path = require("path")

module.exports = {
    createEmp: async (req, res) => {
        const salt = await bcrypt.genSalt(10);
        const empData = new employeeSchema(req.body);
        try {
            let value = await authService.isEmployee(req.body.empEmail)
            if (value === true) {
                employeeLogger.info('employee already exist', "info"),
                    res.status(401).json({
                        message: "employee already exist",
                    });
            } else {
                if (empData.empGender === "male") {
                    let filePath = path.join(__dirname, "..", "uploads/male.ets.png")
                    empData.profilePic = filePath
                } else {
                    let filePath = path.join(__dirname, "..", "uploads/female.ets.png")
                    empData.profilePic = filePath
                }
                const salt = await bcrypt.genSalt(10);
                empData.empPassword = await bcrypt.hash(req.body.empPassword, salt);
                const employee = await empData.save();
                employeeLogger.info('employee registered successful', "info"),
                    res.status(201).json({
                        success: true,
                        message: "employee registered successfully",
                        data: employee,
                    });
            }
        } catch (error) {
            employeeLogger.error("error", 'error'),
                res.status(500).json({
                    success: false,
                    message: error.message,
                });
        }
    },

    empLogin: async (req, res) => {
        try {
            let { value, token } = await authService.validateEmployee(req.body.empEmail, req.body.empPassword)
            if (value) {
                employeeLogger.info('login successful', "info"),
                    res.status(200).json({
                        success: true,
                        message: "Login successfully",
                        token: token,
                    })
            } else {
                employeeLogger.error('Invalid email or password', "error"),
                    res.status(401).json({
                        success: false,
                        message: "Invalid email or password"
                    })
            }
        } catch (error) {
            employeeLogger.error("error", 'error'),
                res.status(500).json({
                    success: false,
                    message: `Error occur ${error.message}`,
                });
        }
    },

    empsendEmail: async (req, res) => {
        const { empEmail } = req.body
        try {
            let { empData, token } = await authService.validateEmployee(req.body.empEmail)
            if (empData != null) {
                const secret = empData._id + process.env.SECRET_KEY;
                const token = jwt.sign({ empID: empData._id }, secret, { expiresIn: "20m" })
                const link = `http://127.0.0.1:3000/user/reset-password/${empData._id}/${token}`
                let info = await transporter.sendMail({
                    from: "ritikkumawat55555@gmail.com",
                    to: "ritikkumawat55555@gmail.com",
                    subject: "Email for reset Password",
                    html: `<a href=${link}>click on this for reset password`
                });
                employeeLogger.info('Email sent successfully', "info"),
                    res.status(201).json({
                        success: true,
                        message: "Email sent successfully",
                        token: token,
                        empID: empData._id
                    })
            } else {
                res.status(403).json({
                    success: false,
                    message: "Please Enter Valid Email"
                })
            }
        } catch (error) {
            res.status(500).json({
                success: false,
                message: `Error occur ${error.message}`,
            });
        }
    },

    empPasswordReset: async (req, res) => {
        const { id, token } = req.params;
        let { newPassword, confirmPassword } = req.body;
        try {
            const empData = await employeeSchema.findById(id);

            if (empData != null) {
                const secretKey = empData._id + process.env.SECRET_KEY;
                jwt.verify(token, secretKey);
                if (newPassword === confirmPassword) {
                    const salt = await bcrypt.genSalt(10);
                    const bcryptPassword = await bcrypt.hash(confirmPassword, salt);
                    await employeeSchema.findByIdAndUpdate(empData._id, {
                        $set: { empPassword: bcryptPassword },
                    });
                    res.status(200).json({
                        success: true,
                        message: 'Password updated successfully',
                    });
                } else {
                    res.status(405).json({
                        success: false,
                        message: 'Password and confirm password do not match'
                    });
                }
            } else {
                res.status(403).json({
                    success: false,
                    message: 'Email  is not found'
                });
            }
        } catch (err) {
            res.status(500).json({
                success: false,
                message: err.message
            })
        }
    },

    updateProfilePic: async (req, res) => {
        try {
            let id = req.params.id;
            let empData = await employeeSchema.findByIdAndUpdate(id, req.body, { new: true })
            if (empData) {
                const filePath = `C:/Users/workspace/employee_tracking_system/uploads/employee${req.file.filename}`;
                empData.profilePic = filePath;
                await empData.save()
                res.status(201).send({
                    success: true,
                    message: "profilePic updated",
                    data: filePath
                })
            } else {
                res.status(404).send({
                    success: false,
                    message: "profilePic not found"
                })
            }
        } catch (err) {
            res.status(500).send({
                success: false,
                message: err.message
            })
        }
    },

    changePassword: async (req, res) => {
    let empId = req.params.id
let empData = await employeeSchema.findByIdAndUpdate(empId,req.body, { new: true })

    }
}