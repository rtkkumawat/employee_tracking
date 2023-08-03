const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    title :{
        type : String,
        required : true
    },
    message:{
        type : String,
        required : true
    },
    isActive:{
        type : String,
        required : true
    }
})
notificationSchema.set("timestamps",true);
modules.exports = mongoose.model("notification",notificationSchema)