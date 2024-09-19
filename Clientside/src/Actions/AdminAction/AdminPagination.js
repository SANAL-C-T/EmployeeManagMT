
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const Admin_PaginationNext_the_Employee = createAsyncThunk(
    'Admin/paginate',
    async ({ baseUrl, token }, { rejectWithValue }) => {
        try {
           
            const response = await axios.get(`${baseUrl}/api/Next`,  {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                withCredentials: true
            });
            console.log("Data from admin paginate employee backend:", response);
            console.log("Data from admin add employee.data:", response.data);
            return response.data;
        } catch (error) {
            console.log('Error from admin paginate  employee actions:', error);
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);

export default Admin_PaginationNext_the_Employee;
