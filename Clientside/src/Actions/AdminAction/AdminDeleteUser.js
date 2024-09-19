import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the async thunk action
const Admin_Delete_the_Employee = createAsyncThunk(
    'Admin/deleteemployee',
    async ({ value, baseUrl, token }, { rejectWithValue }) => {
        try {
           
            const response = await axios.post(`${baseUrl}/api/delete`, { id: value }, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                withCredentials: true
            });
            console.log("Data from admin delete employee backend:", response);
            console.log("Data from admin delete employee.data:", response.data);
            return response.data;
        } catch (error) {
            console.log('Error from admin delete employee actions:', error);
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);

export default Admin_Delete_the_Employee;
