const mongoose = require('mongoose');

const empLeaveSchema = new mongoose.Schema({
    casualLeave: {
        type: Number,
        default: 10
    },
    sickLeave: {
        type: Number,
        default: 10
    },
    totalLeave: {
        type: Number,
        default: 10
    },
    empStatus: {
        type: String,
        default: "pending"
    },
    leaveType: {
        type: String,
        default: "casual"
    },
    empId: {
        type: mongoose.Types.ObjectId,
        ref: "employee",
        required: true,
    },
    leaveMessage: {
        type: String,
        required: true
    },
    isActive: {
        type: String,
        default: true
    }
})
empLeaveSchema.set("timestamps", true);
module.exports = mongoose.model("empLeave", empLeaveSchema)