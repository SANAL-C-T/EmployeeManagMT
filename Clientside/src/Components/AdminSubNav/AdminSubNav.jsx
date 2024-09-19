import React from "react";
import style from "../AdminSubNav/AdminSubNav.module.css";
import { useNavigate } from "react-router-dom";
const AdminSubNav = ({ name }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/AdminDash");
  };
  const handleClickEmpl = () => {
    navigate("/AdminHome");
  };

  const handleClickEmplcreate = () => {
    navigate("/AdminCreate");
  };

const handlelogout=()=>{
  localStorage.removeItem('token');
  console.log('Token removed from localStorage');
  navigate("/");
}




  return (
    <div className={style.subnavcontainer}>
      <ul className={style.leftsubnav}>
        <li onClick={handleClick}>Home</li>
        <li onClick={handleClickEmpl}>Employeelist</li>
        <li onClick={handleClickEmplcreate}>Create Employee</li>
      </ul>

      <ul className={style.rightsubnav}>
        <li>{name.Name}</li>
        <li onClick={handlelogout}>logout</li>
      </ul>
    </div>
  );
};

export default AdminSubNav;
