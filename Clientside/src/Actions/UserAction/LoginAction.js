import { createAsyncThunk } from "@reduxjs/toolkit"; 
import axios from "axios";

 const login_a_user=createAsyncThunk("user/userLogin",async({values,baseUrl})=>{
try{
const send_To_Backend=await axios.post(`${baseUrl}/api/login`,values,{withCredentials: true });
console.log("data from login:::",send_To_Backend)
// console.log("data from login:::",send_To_Backend.data.token)
// localStorage.setItem('token', send_To_Backend.data.token);

const { token, ...userData } = send_To_Backend.data;
console.log(token)
localStorage.setItem('token', token);
return userData;
}
catch(error){
    console.log(`Error from user login actions:`,error)
   
    return error.response.data;
}
})

export default login_a_user;