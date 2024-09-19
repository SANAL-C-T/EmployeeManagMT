import React from "react";
import style from "./UserNav.module.css";
import logo from "../../assets/approve-icon.png";
import { useNavigate } from "react-router-dom";
const UserNav = ({ name }) => {
  const navigate = useNavigate();
  const handelEditclick = () => {
    navigate("/EditMyProfile");
  };
  const handelHomeclick = () => {
    navigate("/homepage");
  };

  const handlelogout=()=>{
    localStorage.removeItem('token');
    navigate("/");
  }


  return (
    <div className={style.navContainer}>
      <ul className={style.navLeft}>
        <img src={logo}></img>
      </ul>

      <ul className={style.navright}>
        <li>{name.Name}</li>
        <li onClick={handelHomeclick}>My Home</li>
        <li onClick={handelEditclick}>Edit my profile</li>
        <li onClick={handlelogout}>Logout</li>
      </ul>
    </div>
  );
};

export default UserNav;
