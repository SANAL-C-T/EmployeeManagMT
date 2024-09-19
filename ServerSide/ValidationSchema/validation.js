const yup = require('yup');

const signup_Schema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required.")
    .matches(/^[A-Za-z ]*$/, "Invalid name format"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required."),
  phoneNo: yup
    .string()
    .matches(/^\d+$/, "Phone number must be numeric")
    .length(10, "Phone number must be exactly 10 digits")
    .required("Phone number is required"),
  pass1: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required."),
  pass2: yup
    .string()
    .oneOf([yup.ref("pass1"), null], "Passwords must match")
    .required("Confirm password is required."),
});

const login_Schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});



module.exports = {login_Schema,signup_Schema};
