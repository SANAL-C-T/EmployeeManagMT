const express = require('express');
const userAppRoutes = express.Router();
const User_Signup_Controller=require("../../Controllers/UserController/UserSignup_Controller");
const User_login_controller=require("../../Controllers/UserController/userlogin_controller");
const DataCheck=require("../../Middleware/Validations");
const {login_Schema,signup_Schema} =require("../../ValidationSchema/validation");


userAppRoutes.post("/api/signup",DataCheck(signup_Schema),User_Signup_Controller.UserSignup)
userAppRoutes.post("/api/login",DataCheck(login_Schema),User_login_controller.userlogin)


module.exports = userAppRoutes;