const mongoose = require("mongoose");

require("../Config");

const EmployeeSchema = mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    Phone: {
        type: Number,
        required: true
    },
    Deleted: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    Profile: {
        type: String,
    },
    Designation: {
        type: String,
    },
    Gender: {
        type: String,
    },
    Course: {
        type: {
            mca: { type: Boolean, default: false },
            bca: { type: Boolean, default: false },
            bsc: { type: Boolean, default: false }
        },
        default: {
            mca: false,
            bca: false,
            bsc: false
        }
    },
    created_Date: {
        type: Date,
        default: Date.now
    }
});

const Employee_Data = mongoose.model("Employee", EmployeeSchema);

module.exports = Employee_Data;
