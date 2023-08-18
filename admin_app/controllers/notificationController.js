const notificationSchema = require("../../model/empNotificationSchema")
module.exports = {
empnotification: async (req, res) => {
    empId = req.params.id;
    const notificationData = await notificationSchema(empId,req.body,{new:true})
    try {
        notificationData.empId = empId
        await notificationData.save()
        res.status(200).json({
            success: true,
            message: "notification saved successfully",
             notification : notificationData            
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
},
updatenotification: async (req, res) => {
    const notificationData = await notificationSchema(Id)
    try {
        await notificationData.save()
        res.status(200).json({
            success: true,
            message: "notification update successfully",
             notification : notificationData            
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
},
deletenotification: async (req, res) => {
    const notificationData = await notificationSchema(Id)
    try {
        res.status(200).json({
            success: true,
            message: "notification delete successfully",
             notification : notificationData            
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
}