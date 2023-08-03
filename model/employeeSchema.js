const mongoose = require('mongoose');

const employeeScehma = new mongoose.Schema({
    empName : {
        type : String,
        required : true
    },
    empEmail: {
        type : String,
        required : true
    },
    empPhone: {
        type : Number,
        required : true
    },
    empCity: {
        type : String,
        required : true
    },
    empAddress : {
        type : String,
        default: null
    },
    empPassword: {
        type : String,
        required : true
    },
    empTechnologies: {
        type : String,
        required : true
    },
    empGender: {
        type : String,
        required : true
    },
    empWorkingstatus: {
        type : String,
        required : true
    },
    userRole: {
        type : String,
        required : true
    },
    profilePic: {
        type : String,
        required : true
    },
    isActive: {
        type : String,
        default: true
    }
})
employeeScehma.set("timestamps",true)
module.exports = mongoose.model("employee",employeeScehma)