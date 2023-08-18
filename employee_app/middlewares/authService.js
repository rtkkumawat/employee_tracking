const empSchema = require("../../model/employeeSchema")

module.exports = {
    isEmployee: async (req, res, next) => {
      const empData = await empSchema.findOne({
        empEmail: req.body.empEmail,
      });
      if (empData.empRole === "employee") {
        next();
      } else {
        res.status(401).json({
          success: false,
          message: "User is not authorized as an employee",
        });
      }
    },
  };