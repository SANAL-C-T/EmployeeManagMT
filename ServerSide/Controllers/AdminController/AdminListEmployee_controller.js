
const dotenv = require('dotenv');
dotenv.config();
const Employeedatabase = require("../../Schema/EmployeeSchema");

const getEmployee = async (req, res) => {
    try {
        console.log("hello")
        const employeelist=await Employeedatabase.find({ isAdmin: false, Deleted: false }).sort({ created_Date: -1 }).limit(5);
        console.log("employeelist:",employeelist)
        res.status(200).json({employeelist})
    } catch (error) {
        console.error("Error fetching employee list:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const getpageEmployee=async (req, res) => {
    try {
        console.log("hello in pagiantaion:::")
        const employeelist=await Employeedatabase.find({ isAdmin: false, Deleted: false }).skip(5).sort({ created_Date: -1 }).limit(5);
        // console.log("employeelist:",employeelist)
        res.status(200).json({employeelist})
    } catch (error) {
        console.error("Error fetching employee list:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


const deleteEmployee = async (req, res) => {
    try {
        console.log("hello in delete:::", req.body);
        const { id } = req.body;

       
        const employeeExists = await Employeedatabase.findById(id);
        if (!employeeExists) {
            return res.status(404).json({ error: "Employee not found" });
        }

      
        await Employeedatabase.findByIdAndUpdate(id, { $set: { Deleted: true } });

      
        const employeelist = await Employeedatabase.find({ isAdmin: false, Deleted: false }).limit(5);
        res.status(200).json({ employeelist });
    } catch (error) {
        console.error("Error deleting employee:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


const search = async (req, res) => {
    try {
        
        const { searchTerm } = req.body;

     
        console.log("Searching employees with criteria:", searchTerm );
    
        
        const searchQuery = {
            isAdmin: false,
            Deleted: false,
            $or: [
                { Name: { $regex: searchTerm, $options: 'i' } }, 
                { Email: { $regex: searchTerm, $options: 'i' } } 
            ]
        };
 
        
        const employeelist = await Employeedatabase.find(searchQuery)
            .limit(5)  
            .sort({ created_Date: -1 });  

      
        res.status(200).json({ employeelist });
    } catch (error) {
        
        console.error("Error fetching employee list:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};





module.exports = { getEmployee ,getpageEmployee,deleteEmployee,search};
