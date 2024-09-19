import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the async thunk action
const Admin_Search_the_Employee = createAsyncThunk(
    'Admin/searchemployee',
    async ({ value, baseUrl, token }, { rejectWithValue }) => {
        try {
           
            const response = await axios.post(`${baseUrl}/api/search`, { searchTerm: value }, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                withCredentials: true
            });
            console.log("Data from admin search employee backend:", response);
            console.log("Data from admin search employee.data:", response.data);
            return response.data;
        } catch (error) {
            console.log('Error from admin search employee actions:', error);
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);

export default Admin_Search_the_Employee;
