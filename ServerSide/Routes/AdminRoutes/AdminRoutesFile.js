const express = require('express');
const AdminAppRoutes = express.Router();
const Data_validation=require("../../Middleware/Validations");
const AdminListemployee_controller=require("../../Controllers/AdminController/AdminListEmployee_controller")
const AdminisUpdating_controller=require("../../Controllers/AdminController/AdminUpdateEmployee");
const AdminAddEmployee_controller=require("../../Controllers/AdminController/AdminAddEmployee_controller")
const {Edit_Schema} =require("../../ValidationSchema/AdmineditValidation");
const multerUpload =require("../../Middleware/ImageUpload");
const authenticateToken = require('../../Middleware/TokenCheck');

AdminAppRoutes.get("/api/getemployeelist",authenticateToken,AdminListemployee_controller.getEmployee);
AdminAppRoutes.put("/api/Edituser",authenticateToken,multerUpload.profileImage,Data_validation(Edit_Schema),AdminisUpdating_controller.UpdateAndGetEmployee);
AdminAppRoutes.post("/api/AddEmployee",authenticateToken,multerUpload.profileImage,Data_validation(Edit_Schema),AdminAddEmployee_controller.AdminAddNewEmployee);
AdminAppRoutes.get("/api/Next",AdminListemployee_controller.getpageEmployee);
AdminAppRoutes.get("/api/prev",authenticateToken,AdminListemployee_controller.getpageEmployee);
AdminAppRoutes.post("/api/delete",AdminListemployee_controller.deleteEmployee);
AdminAppRoutes.post("/api/search",authenticateToken,AdminListemployee_controller.search);



module.exports = AdminAppRoutes;