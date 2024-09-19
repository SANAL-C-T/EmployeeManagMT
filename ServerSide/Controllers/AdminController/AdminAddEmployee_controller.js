const dotenv = require('dotenv');
dotenv.config();
const Employeedatabase = require("../../Schema/EmployeeSchema");
const path = require("path");
const fs = require("fs");
const bcrypt = require("bcrypt");

const AdminAddNewEmployee = async (req, res) => {
    try {
        console.log("incoming to database:::",req.body)
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.Password, salt);
        if (req.file) {
            Profile = `http://localhost:3000/Uploads/${req.file.filename}`;
        }

        const employeeExists = await Employeedatabase.findOne({ Email: req.body.email }); 
console.log("employeeExists ::::",employeeExists )

        if (employeeExists) {
            res.status(400).json({ error: "Employee exists" });
        }
        else {
            const newEmployee = new Employeedatabase({
                Name: req.body.Name,
                Email: req.body.email,
                Password: hashedPassword,
                Phone: req.body.phone,
                Designation: req.body.role,
                Gender: req.body.gender,
                Course: JSON.parse(req.body.degree),
                Profile: Profile
            });
            console.log("newEmployee::::", newEmployee);
            await newEmployee.save();

            console.error("Added employee:");
            const employeelist =await Employeedatabase.find({  isAdmin: false, Deleted: false  })
            .sort({ created_Date: -1 })  
            .limit(5);
            console.log("employeelist:", employeelist)
            res.status(200).json({ employeelist })
        }
    } catch (error) {
        console.error("Error adding employee:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { AdminAddNewEmployee };
