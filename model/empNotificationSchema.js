const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    title :{
        type : String,
        default : ""
    },
    message:{
        type : String,
        default : ""
        
    },
    empId: {
        type: mongoose.Types.ObjectId,
        ref: "employee",
        required: true,
    },
    isActive:{
        type : String,
        default : "active"
    }
})
notificationSchema.set("timestamps",true);
module.exports = mongoose.model("notification",notificationSchema)