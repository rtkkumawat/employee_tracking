const notificationSchema = require('../../model/empNotificationSchema')

module.exports = {
    empnotification: async (req, res) => {
        try {
            const today = new Date();
            const startDate = new Date(today);
            startDate.setHours(0,0,0,0);
            const endDate = new Date(today);
            endDate.setHours(23,59,59,999)
            const empData = await notificationSchema.find({
                createdAt :{
                    $gte : startDate,
                    $lte : endDate
                }
            })
            res.status(200).json({
                success: true,
                message: 'notification  listed successfully.',
                EmpData: empData,
            })
        } catch (err) {
            res.status(500).json({
                success: false,
                error: err.message
            })
        }
    }}