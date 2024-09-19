import { createAsyncThunk } from "@reduxjs/toolkit"; 
import axios from "axios";

 const signup_a_user=createAsyncThunk("user/userSignup",async({values,baseUrl})=>{
try{
const send_To_Backend=await axios.post(`${baseUrl}/api/signup`,values);
return send_To_Backend.data;
}
catch(error){
    console.log(`Error from user signup actions:`,error)
    return error.response.data;
}
})

export default signup_a_user;