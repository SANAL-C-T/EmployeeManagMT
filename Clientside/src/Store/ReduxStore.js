import { configureStore } from "@reduxjs/toolkit";

import User_Signup_reducer from "../Features/UserSignupSlice";
import User_login_reducer from "../Features/UserLoginSlice";
import employee_list_reducer from "../Features/AdminListEmployeeSlice";
import editIdSlice_reducer from "../Features/SetEditit";
import Delete_id_reducer from "../Features/SetDeleteId";

const Redux_store = configureStore({
    reducer: {
    Data_after_signUp:User_Signup_reducer,
    Data_after_Login:User_login_reducer,
    Data_of_employee:employee_list_reducer,
    Id_to_edit_user:editIdSlice_reducer,
    Id_to_delete_user:Delete_id_reducer

    }
})
export default Redux_store;