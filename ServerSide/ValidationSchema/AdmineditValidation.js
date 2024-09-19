const yup = require('yup');

const Edit_Schema = yup.object().shape({
    Name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    phone: yup.string().required('Phone number is required'),
    role: yup.string().required('Role is required'),
    gender: yup.string().required('Gender is required'),
    degree: yup.string().required('Degree is required')  // Change degree to string
});

module.exports = { Edit_Schema };
