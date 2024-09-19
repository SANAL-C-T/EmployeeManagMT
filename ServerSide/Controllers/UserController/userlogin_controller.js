const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();
const Employeedatabase = require("../../Schema/EmployeeSchema");

const userlogin = async (req, res) => {
    try {
        console.log("Data reached in server:", req.body);


        const person_Try_To_Log = await Employeedatabase.findOne({ Email: req.body.email });
        console.log("from databse::::::::::::::::::::::::::",person_Try_To_Log)
        if (person_Try_To_Log==null) {
            return res.status(400).json({ message: "Employee dont exist" });
        }
        const isMatch = bcrypt.compareSync(req.body.password, person_Try_To_Log.Password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Create a JWT token
        const token = jwt.sign(
            { id: person_Try_To_Log._id, Name: person_Try_To_Log.Name },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '1h' }
        );


        console.log("token::",token)

        // Send success response with token
        res.status(200).json({
            message: "Login successful",
            token,
            Name: person_Try_To_Log.Name,
            isAdmin: person_Try_To_Log.isAdmin,
            userid:person_Try_To_Log.id,
            email:person_Try_To_Log.Email,
            phone:person_Try_To_Log.Phone,
            token

        });
    } catch (error) {
        // Log the error and send an error response
        console.error("Login error:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { userlogin };
