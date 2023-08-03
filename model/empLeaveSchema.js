const mongoose = require('mongoose');

const empLeaveSchema = new mongoose.Schema({
    casualLeave :{
        type : String,
        required : true
    },
    sickLeave:{
        type : String,
        required : true
    },
    totalLeave:{
        type : String,
        required : true
    },
    leaveStatus:{
        type : String,
        required : true
    },
    leaveType:{
        type : String,
        required : true
    },
    leaveMessage:{
        type : String,
        required : true
    },
    isActive:{
        type : String,
        required : true
    }
})
empLeaveSchema.set("timestamps",true);
modules.exports = mongoose.model("empLeave",empLeaveSchema)