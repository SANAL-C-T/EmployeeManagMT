import React from 'react'
import { useSelector } from 'react-redux';
import AdminNav from "../../Components/AdminNavbar/AdminNav";
import AdminSubNav from "../../Components/AdminSubNav/AdminSubNav";
const AdminDashpage = () => {
    const { loggeduser } = useSelector((state) => state.Data_after_Login);
  return (
    <div>
    <AdminNav style={{ marginBottom: '20px' }} />
    <AdminSubNav name={loggeduser} style={{ marginBottom: '20px' }} />
    <h3 style={{ textAlign: 'center', margin:"100px" }}>
        Welcome Admin Panel
    </h3>
</div>
  )
}

export default AdminDashpage
