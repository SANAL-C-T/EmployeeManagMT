import { createAsyncThunk } from "@reduxjs/toolkit"; 
import axios from "axios";

const Admin_list_employee = createAsyncThunk(
    "Admin/Listemployee",
    async ({ baseUrl}, { rejectWithValue }) => {
        const token = localStorage.getItem('token');
        console.log("actions::::",token)
        try {
            const response = await axios.get(`${baseUrl}/api/getemployeelist`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                withCredentials: true
            });
            console.log("Data from admin list employee backend:::", response);
            console.log("Data from admin list employee.data:::", response.data);
            return response.data;
        } catch (error) {
            console.log(`Error from admin list employee actions:`, error);
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);

export default Admin_list_employee;
