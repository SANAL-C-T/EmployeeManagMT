import React from "react";
import UserNav from "../../Components/UserNavbar/UserNav";
import { useDispatch, useSelector } from "react-redux";
import backdrop from "../../assets/undraw_business_decisions_re_84ag.svg";
const UserHomePage = () => {
  const { loggeduser } = useSelector((state) => state.Data_after_Login);
  return (
    <div>
      <UserNav name={loggeduser} />
      <div>
        <h1 style={{ textAlign: "center", marginTop: "20px", padding:"10px" }}>
          Hello {loggeduser.Name}, welcome.
        </h1>
        <img
          src={backdrop}
          alt="Backdrop"
          style={{
            width: "100%", 
            maxWidth: "600px", 
            height: "auto", 
            display: "block",
            margin: "0 auto",
          }}
        />
      </div>
    </div>
  );
};

export default UserHomePage;
