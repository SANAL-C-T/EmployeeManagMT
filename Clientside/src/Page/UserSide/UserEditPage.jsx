import React from 'react'
import EditEmployee from '../../Components/EditEmployee/EditExistingEmployee'
import { useDispatch, useSelector } from "react-redux";
import UserNav from "../../Components/UserNavbar/UserNav";
const UserEditPage = () => {
  const { loggeduser } = useSelector((state) => state.Data_after_Login);
  return (
    <div>
      <UserNav name={loggeduser} />
       <EditEmployee/>
    </div>
  )
}

export default UserEditPage
