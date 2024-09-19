import React, { useState } from "react";
import loginlogo from "../../assets/undraw_co-working_re_w93t.svg";
import signuplogo from "../../assets/undraw_co_workers_re_1i6i.svg";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { signup_Schema, login_Schema } from "../../Schema/FormValidation";
import style from "./Signup.module.css";
const baseUrl = import.meta.env.VITE_API_URL;

import { useDispatch } from "react-redux";
import signup_a_user from "../../Actions/UserAction/SignupAction";
import login_a_user from "../../Actions/UserAction/LoginAction";
import Admin_list_employee from "../../Actions/AdminAction/AdminHomeAction";


import { useNavigate } from "react-router-dom";

const Signups = () => {
  const [selection, setSelection] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSelection = () => {
    setSelection(!selection);
  };

  const formik_Signup = useFormik({
    initialValues: {
      name: "",
      email: "",
      phoneNo: "",
      pass1: "",
      pass2: "",
    },
    validationSchema: signup_Schema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response_data = await dispatch(
          signup_a_user({ values, baseUrl })
        ).unwrap();
        toast.success("Signup successful!");
        handleSelection();
        console.log("Signup response data:", response_data);
       resetForm();
      } catch (error) {
        console.error("Signup error:", error);

        if (error.response) {
          if (error.response.status === 409) {
            toast.error("User already exists. Please log in.");
          } else if (error.response.status === 500) {
            toast.error("Server error. Please try again later.");
          } else {
            toast.error("Signup Unsuccessful. Please check your details.");
          }
        } else if (error.request) {
          toast.error(
            "No response from the server. Please check your network."
          );
        } else {
          toast.error("An unexpected error occurred. Please try again.");
        }
      }
    },
  });

  const formik_Login = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: login_Schema,
    onSubmit: async (values, { resetForm }) => {
      try {
        console.log("Login Data:", values);
        const actionResult = await dispatch(login_a_user({ values, baseUrl }));
        console.log("Action Result:", actionResult);
        if (actionResult.type === "user/userLogin/fulfilled") {
          const response_data = actionResult.payload;
          console.log("response_data of login:::",response_data)
          if (response_data.message === "Employee dont exist"||response_data.message ==="Invalid credentials") {
            toast.error("Employee dont exist");
          } else {
            if(response_data.isAdmin){
              const adminPayload = {
                baseUrl,
                token: response_data.token
            };

            
            const adminResult = await dispatch(Admin_list_employee(adminPayload));
            if (Admin_list_employee.fulfilled.match(adminResult)) {
                // Successful fetch
                navigate('/AdminHome');
            }
              
            }else{
              navigate('/homepage');
            }
           
          }
          resetForm();
        } else if (actionResult.type === "user/userLogin/rejected") {
          const error = actionResult.error;
          console.error("Login error:", error);
          if (error.message) {
            toast.error(`Login unsuccessful: ${error.message}`);
          } else {
            toast.error("Login unsuccessful: An unexpected error occurred.");
          }
        }
      } catch (error) {
        console.error("Login error:", error);
        toast.error(
          `Login unsuccessful: ${
            error.message || "An unexpected error occurred."
          }`
        );
      }
    },
  });

  return (
    <div>
      <h2 className={style.title}>Employee Management System</h2>
      {selection ? (
        <div className={style.contsign}>
          <div className={style.signForm}>
            <h4>SIGNUP</h4>
            <form onSubmit={formik_Signup.handleSubmit} autoComplete="off">
              <input
                type="text"
                placeholder="Enter Name"
                value={formik_Signup.values.name}
                onChange={formik_Signup.handleChange}
                id="name"
                className={
                  formik_Signup.errors.name && formik_Signup.touched.name
                    ? style['input-error']
                    : ""
                }
              />
              {formik_Signup.errors.name && formik_Signup.touched.name && (
                <p className={style.error}>{formik_Signup.errors.name}</p>
              )}
              <input
                type="email"
                placeholder="Enter email"
                value={formik_Signup.values.email}
                onChange={formik_Signup.handleChange}
                id="email"
                className={
                  formik_Signup.errors.email && formik_Signup.touched.email
                    ? style['input-error']
                    : ""
                }
              />
              {formik_Signup.errors.email && formik_Signup.touched.email && (
                <p className={style.error}>{formik_Signup.errors.email}</p>
              )}

              <input
                type="tel"
                placeholder="Enter mobile number"
                value={formik_Signup.values.phoneNo}
                onChange={formik_Signup.handleChange}
                id="phoneNo"
                className={
                  formik_Signup.errors.phoneNo && formik_Signup.touched.phoneNo
                    ? style['input-error']
                    : ""
                }
              />
              {formik_Signup.errors.phoneNo &&
                formik_Signup.touched.phoneNo && (
                  <p className={style.error}>{formik_Signup.errors.phoneNo}</p>
                )}

              <input
                type="password"
                placeholder="Enter password"
                value={formik_Signup.values.pass1}
                onChange={formik_Signup.handleChange}
                id="pass1"
                className={
                  formik_Signup.errors.pass1 && formik_Signup.touched.pass1
                    ? style['input-error']
                    : ""
                }
              />
              {formik_Signup.errors.pass1 && formik_Signup.touched.pass1 && (
                <p className={style.error}>{formik_Signup.errors.pass1}</p>
              )}

              <input
                type="password"
                placeholder="Confirm password"
                value={formik_Signup.values.pass2}
                onChange={formik_Signup.handleChange}
                id="pass2"
                className={
                  formik_Signup.errors.pass2 && formik_Signup.touched.pass2
                    ? style['input-error']
                    : ""
                }
              />
              {formik_Signup.errors.pass2 && formik_Signup.touched.pass2 && (
                <p className={style.error}>{formik_Signup.errors.pass2}</p>
              )}

              <button className={style.btn} type="submit">Sign Up Now</button>
            </form>

            <p
              onClick={handleSelection}
              style={{ cursor: "pointer", margin: "10px" }}
            >
              Already a Signed up?
            </p>
          </div>
          <div className={style.leftsideimage}>
            <img src={signuplogo} id="logos" alt="" />
          </div>
        </div>
      ) : (
        //..............................................
        <div className={style.cont}>
          <div className={style.leftside}>
            <img src={loginlogo} id="logos" alt="" />
          </div>
          <div className={style.logForm}>
            <h4>LOGIN</h4>
            <form onSubmit={formik_Login.handleSubmit} autoComplete="off">
              <input
                type="email"
                placeholder="Enter email"
                value={formik_Login.values.email}
                onChange={formik_Login.handleChange}
                id="email"
                className={
                  formik_Login.errors.email && formik_Login.touched.email
                    ? style['input-error']
                    : ""
                }
              />
              {formik_Login.errors.email && formik_Login.touched.email && (
                <p className={style.error}>{formik_Login.errors.email}</p>
              )}

              <input
                type="password"
                placeholder="Enter password"
                value={formik_Login.values.password}
                onChange={formik_Login.handleChange}
                id="password"
                className={
                  formik_Login.errors.password && formik_Login.touched.password
                    ? style['input-error']
                    : ""
                }
              />
              {formik_Login.errors.password &&
                formik_Login.touched.password && (
                  <p className={style.error}>{formik_Login.errors.password}</p>
                )}

              <button className={style.btn} type="submit">Login</button>
            </form>

            <br />

            <p
              onClick={handleSelection}
              style={{ cursor: "pointer", margin: "10px" }}
            >
              Are you new a Employee?
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signups;
