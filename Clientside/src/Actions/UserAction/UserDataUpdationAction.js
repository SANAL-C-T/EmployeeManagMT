import { createAsyncThunk } from "@reduxjs/toolkit"; 
import axios from "axios";

 const updation_By_user=createAsyncThunk("user/userUpdate",async({values,baseUrl})=>{
try{
const send_To_Backend=await axios.post(`${baseUrl}/api/Update`,values,{withCredentials: true });
console.log("data from user done updation:::",send_To_Backend)
console.log("data from user done updation:::",send_To_Backend.data)

return send_To_Backend.data;
}
catch(error){
    console.log(`Error from user updation actions:`,error)
   
    return error.response.data;
}
})

export default updation_By_user;