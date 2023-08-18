const express = require ("express");
const {isAdmin} = require("../middlewares/authService")
const admin = require("../../employee_app/controller/empController")
const dashboard =require("../controllers/adminController")
const notification = require("../controllers/notificationController")
const adminRoutes = express.Router();

adminRoutes.post("/login",isAdmin,admin.empLogin);
adminRoutes.post("/dashboard",dashboard.empList);
adminRoutes.post("/leave/:id",dashboard.leaveAcceptReject);
adminRoutes.post("/notification/:id",notification.empnotification);
adminRoutes.patch("/notification/:id",notification.updatenotification);
adminRoutes.delete("/notification/:id",notification.deletenotification);


module.exports = adminRoutes