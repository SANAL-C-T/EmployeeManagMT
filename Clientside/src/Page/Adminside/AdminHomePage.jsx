import React from "react";
import AdminNav from "../../Components/AdminNavbar/AdminNav";
import AdminSubNav from "../../Components/AdminSubNav/AdminSubNav";
import ListingOfEmployee from "../../Components/ListEmployee/ListingOfEmployee";
import { useSelector } from 'react-redux';
const AdminHomePage = () => {
  const { loggeduser } = useSelector((state) => state.Data_after_Login);
  return (
    <div>
      <AdminNav />
      <AdminSubNav name={loggeduser}/>
      <ListingOfEmployee />
    </div>
  );
};

export default AdminHomePage;
