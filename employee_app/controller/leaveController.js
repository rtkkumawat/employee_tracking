const leaveSchema = require("../../model/empLeaveSchema")

module.exports = {
    empleave: async (req, res) => {
        empId = req.params.id;
        const leaveData = await leaveSchema(req.body)
        try {
            leaveData.empId = empId
            await leaveData.save()
            res.status(200).json({
                success: true,
                message: "leave request sent successfully",
                leave: leaveData
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }
}