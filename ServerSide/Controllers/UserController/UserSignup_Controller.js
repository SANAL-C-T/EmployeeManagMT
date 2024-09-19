const bcrypt = require("bcrypt");
const Employeedatabase = require("../../Schema/EmployeeSchema")

const UserSignup = async (req, res) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.pass1, salt);
        console.log(req.body)
        const newEmployee = new Employeedatabase({
            Name: req.body.name,
            Email: req.body.email,
            Password: hashedPassword,
            Phone: req.body.phoneNo,
        })
        await newEmployee.save();
        res.status(200).json({ "message": "sucesss" })
    }
    catch (error) {
        console.log(error)
    }
}
module.exports = { UserSignup };