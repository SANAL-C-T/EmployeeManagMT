import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

// Accept an array of allowed roles as a prop
const ProtectedRoute = ({ allowedRoles }) => {
  const { loggeduser } = useSelector((state) => state.Data_after_Login);
  console.log("loggeduser::", loggeduser);

  if (loggeduser && !loggeduser.Deleted) {
    const userRole = loggeduser.isAdmin==true ? "admin" : "user";
    console.log("User role 1:", userRole);
    
    // Check if the user's role is allowed
    if (allowedRoles.includes(userRole)) {
      console.log("Access granted to:", userRole);
      return <Outlet />; // Allow access if role is valid
    } else {
      console.log("Access denied. Redirecting to home.");
      return <Navigate to="/" />;
    }
  }

  // Redirect to the home page if not logged in
  console.log("Not logged in. Redirecting to home.");
  return <Navigate to="/" />;
};

export default ProtectedRoute;
