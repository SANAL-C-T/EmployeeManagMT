const dotenv = require('dotenv');
dotenv.config();
const Employeedatabase = require("../../Schema/EmployeeSchema");
const path = require("path");
const fs = require("fs");

const UpdateAndGetEmployee = async (req, res) => {
    try {


        console.log(req.body.usersId)
        const employeeId = req.body.usersId; 
        if (!employeeId) {
            return res.status(400).json({ error: "Employee ID is required" });
        }

       
        let employee = await Employeedatabase.findById(employeeId);
        if (!employee) {
            return res.status(404).json({ error: "Employee not found" });
        }

     
        const updatedFields = {};

      
        if (req.body.Name) updatedFields.Name = req.body.Name;
        if (req.body.Email) updatedFields.Email = req.body.Email; 
        if (req.body.Phone) updatedFields.Phone = req.body.Phone; 
        if (req.body.role) updatedFields.Designation = req.body.role; 
        if (req.body.gender) updatedFields.Gender = req.body.gender; 
        if (req.body.Course) updatedFields.Course = req.body.Course; 
        if (req.body.degree) updatedFields.Course = JSON.parse(req.body.degree); 


        if (req.file) {
        
            updatedFields.Profile = `http://localhost:3000/Uploads/${req.file.filename}`; 
        }

        // Update the employee document in the database
        employee = await Employeedatabase.findByIdAndUpdate(employeeId, updatedFields, { new: true });

        console.error("updated employee:");
        const employeelist=await Employeedatabase.find({ isAdmin: false, Deleted: false }).limit(5);
        console.log("employeelist:",employeelist)
        res.status(200).json({employeelist})
      
    } catch (error) {
        console.error("Error updating employee:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { UpdateAndGetEmployee };
