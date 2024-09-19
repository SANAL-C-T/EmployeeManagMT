import React from 'react'
import CreateNewEmployee from "../../Components/CreateEmployee/CreateNewEmployee";
import AdminNav from "../../Components/AdminNavbar/AdminNav";
import AdminSubNav from "../../Components/AdminSubNav/AdminSubNav";
import { useSelector } from 'react-redux';

const AdminAddPage = () => {
  const { loggeduser } = useSelector((state) => state.Data_after_Login);
  return (
    <div>
      <AdminNav/>
      <AdminSubNav name={loggeduser}/>
      <CreateNewEmployee />
    </div>
  )
}

export default AdminAddPage
