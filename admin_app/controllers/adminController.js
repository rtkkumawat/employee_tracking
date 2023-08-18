const timeSheet = require("../../model/empTimesheetSchema")
const empLeaveSchema = require("../../model/empLeaveSchema")
const notificationSchema = require('../../model/empNotificationSchema')

module.exports = {
    empList: async (req, res) => {
        try {
            const today = new Date();
            const startDate = new Date(today);
            startDate.setHours(0,0,0,0);
            const endDate = new Date(today);
            endDate.setHours(23,59,59,999)
            const empData = await timeSheet.find({
                createdAt :{
                    $gte : startDate,
                    $lte : endDate
                }
            },{_id : 0,clockIn : 1,clockOut : 1})
            .populate({ path: "empId", select: "empName" })
            res.status(200).json({
                success: true,
                message: 'attendance  listed successfully.',
                EmpData: empData,
            })
        } catch (err) {
            res.status(500).json({
                success: false,
                error: err.message
            })
        }

    },
    leaveAcceptReject: async (req, res) => {
        try {
          const { id } = req.params;
          const { empStatus } = req.body;
          const type = await empLeaveSchema.findById(id);
    
          const leave = await empLeaveSchema.findByIdAndUpdate(id,{ empStatus },{ new: true });
          const user = await empLeaveSchema.findById(leave.id);
          if (empStatus === "accepted") {
            if (type.leaveType=== "casual") {
              user.casualLeave -= 1;
            }
          }
          if (empStatus === "accepted") {
            if (type.empLeaveType === "sick") {
              user.sickLeave -= 1;
            }
          }
          await Promise.all([leave.save(), user.save()]);
    
          res.status(201).json({
            success: true,
            message: "Leave status update ",
            leave: leave,
          });
        } catch (error) {
          res.status(500).json({
            success: false,
            message: error.message,
          });
        }
      }
}
