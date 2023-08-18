const moment = require("moment")
const timeSheetSchema = require('../../model/empTimesheetSchema')
const ipService = require("../service/timeSheetService")
var Holidays = require('date-holidays')
var hd = new Holidays()


module.exports = {
    clockIn: async (req, res) => {
        const empId = req.params.id
        const clockData = timeSheetSchema(req.body)
        try {
            const currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
            clockData.clockIn = currentTime
            const empIp = await ipService.addIp()
            clockData.empId = empId
            clockData.clockInIP = empIp
            const attendenceTime = moment('10:15:00', 'HH:mm:ss');
            const clockIn = moment(clockData.clockIn, 'YYYY-MM-DD HH:mm:ss');
            if (clockIn.isAfter(attendenceTime)) {
                clockData.daysLate = "you are let";
            }
            await clockData.save()
            res.status(201).json({
                success: true,
                message: "employee clockin successfully",
                time: clockData

            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    },
    clockOut: async (req, res) => {
        empId = req.params.id
        const clockData = await timeSheetSchema.findByIdAndUpdate(empId, { clockOut: moment().format('YYYY-MM-DD HH:mm:ss') },
        { new: true })
        try {
            const clockIn = moment(clockData.clockIn, 'YYYY-MM-DD HH:mm:ss');
            const clockOut = moment(clockData.clockOut, 'YYYY-MM-DD HH:mm:ss')
            let hoursWorked = clockOut.diff(clockIn, 'hours');
            if (hoursWorked >= 8) {
                clockData.attendanceStatus = "present";
            }
            else if (hoursWorked < 8) {
                clockData.attendanceStatus = "half-day"
            } else {
                clockData.attendanceStatus = "Absent"
            }
            clockData.hoursLoggedIn = hoursWorked
            await clockData.save()
            res.status(201).json({
                success: true,
                message: "employee clockout successfully",
                time: clockData

            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    },
    holidays: async function (req, res) {
        empId = req.params.id
        const clockData = await timeSheetSchema.findByIdAndUpdate(empId, req.body, { new: true })
        try {
            const holidays = Holidays.init("india", "madhyaPradesh", "indore",)
            clockData.holidays = holidays
            await clockData.save()
            res.status(201).json({
                success: true,
                message: "employee holidays here",
                time: clockData
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
}