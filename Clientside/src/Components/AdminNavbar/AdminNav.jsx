import React from 'react'
import style from "../AdminNavbar/Admin.module.css"
import logo from "../../assets/approve-icon.png"
const AdminNav = () => {
  return (
    <div className={style.navLogoContainer}>
    <ul className={style.navLogoLeft}>
        <img src={logo}></img>
    </ul>
  </div>
  )
}

export default AdminNav
