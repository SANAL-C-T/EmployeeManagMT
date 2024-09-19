import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the async thunk action
const Admin_Edit_the_Employee = createAsyncThunk(
    'Admin/editemployee',
    async ({ value, baseUrl, token }, { rejectWithValue }) => {
        try {
           
            const response = await axios.put(`${baseUrl}/api/Edituser`, value, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                withCredentials: true
            });
            console.log("Data from admin edit employee backend:", response);
            console.log("Data from admin edit employee.data:", response.data);
            return response.data;
        } catch (error) {
            console.log('Error from admin edit employee actions:', error);
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);

export default Admin_Edit_the_Employee;
