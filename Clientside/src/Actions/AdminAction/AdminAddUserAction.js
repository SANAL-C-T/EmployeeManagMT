
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const Admin_Add_the_Employee = createAsyncThunk(
    'Admin/addemployee',
    async ({ value, baseUrl, token }, { rejectWithValue }) => {
        try {
           
            const response = await axios.post(`${baseUrl}/api/AddEmployee`, value, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                withCredentials: true
            });
            console.log("Data from admin add employee backend:", response);
            console.log("Data from admin add employee.data:", response.data);
            return response.data;
        } catch (error) {
            console.log('Error from admin add employee actions:', error);
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);

export default Admin_Add_the_Employee;
