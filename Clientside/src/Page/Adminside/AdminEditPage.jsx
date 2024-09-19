import React from "react";

import EditEmployee from '../../Components/EditEmployee/EditExistingEmployee'
import AdminNav from "../../Components/AdminNavbar/AdminNav";
import AdminSubNav from "../../Components/AdminSubNav/AdminSubNav";
import { useSelector } from 'react-redux';
const AdminEditPage = () => {
  const { loggeduser } = useSelector((state) => state.Data_after_Login);
  return (
    <div>
      <AdminNav />
      <AdminSubNav name={loggeduser}/>
   
      <EditEmployee/>
    </div>
  );
};

export default AdminEditPage;
