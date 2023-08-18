const mongoose = require("mongoose")

const empTimeSheetScchema = new mongoose.Schema({
    clockIn: {
        type: String,
        default : "",
    },
    clockOut: {
        type: String,
        default: "",
    },
    clockInIP: {
        type: String,
        default: "",
    },
    hoursLoggedIn: {
        type: String,
        default: "",
    },
    workingFrom: {
        type: String,
        default: "",
    },
    totalWorkingDays: {
        type: String,
        default: "",
    },
    daysPresent: {
        type: String,
        default: "",
    },
    halfDay: {
        type: String,
        default: "",
    },
    daysAbsent: {
        type: String,
        default: "",
    },
    holidays: {
        type: String,
        default: "",
    },
    daysLate: {
        type: String,
        default: "",
    },
    attendanceStatus: {
        type: String,
        default: "absent",
    },
    empId: {
        type: mongoose.Types.ObjectId,
        ref: "employee",
        required: true,
    },
    status: {
        type: String,
        default: "",
    },
    isActive: {
        type: String,
        default: "active",
    },

})
empTimeSheetScchema.set('timestamps', true)
module.exports = mongoose.model('timesheet', empTimeSheetScchema)