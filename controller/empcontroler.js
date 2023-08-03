const employeeSchema = require("../model/employeeSchema")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const { transporter } = require("../service/emailService")
const { unlinkSync } = require("fs")
const path = require("path")

module.exports = {
    createEmp: async (req, res) => {
        const salt = await bcrypt.genSalt(10);
        const empData = new employeeScehma(req.body);
        try {
            const isEmpExist = await employeeSchema.findOne({
                empEmail: req.body.empEmail,
            });
            if (isEmpExist) {
                return res.status(401).json({
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
                res.status(201).json({
                    success: true,
                    message: "employee registered successfully",
                    data: employee,
                });
            }
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    },
    

  empLogin: async (req, res) => {
            try {
                const empData = await employeeSchema.findOne({
                    empEmail: req.body.empEmail,
                });
                if (empData) {
                    const hashPassword = await bcrypt.compare(
                        req.body.empPassword,
                        empData.empPassword
                    );
                    if (empData && hashPassword) {
                          const token = jwt.sign({ empData}, process.env.SECRET_KEY, {
                            expiresIn: "1h"
                   });
                    res.status(200).json({
                        success: true,
                        message: "Login successfully",
                        token: token,
                    })
                } else {
                    res.status(401).json({
                        success: false,
                        message: "Invalid email or password"
                    })
                }
             }else { 
                res.status(403).json({
                    success: false,
                    message: "employee is not registered with this email"
                })
            }
            }catch (error) {
    res.status(500).json({
        success: false,
        message: `Error occur ${error.message}`,
    });
}
    },

empResetPasswordEmail : async (req, res) => {
    const { empEmail } = req.body
    try {
        const empData = await employeeSchema.findOne({
            empEmail: req.body.empEmail
        });
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
            return res.status(201).json({
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
}