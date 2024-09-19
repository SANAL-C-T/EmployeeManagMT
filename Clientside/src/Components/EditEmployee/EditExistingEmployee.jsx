import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import style from "./EditExisting.module.css";
import Admin_Edit_the_Employee from "../../Actions/AdminAction/AdminGetUserToEditAction";
import { toast } from "react-toastify";
const baseUrl = import.meta.env.VITE_API_URL;




const EditExistingEmployee = () => {
  const { loggeduser } = useSelector((state) => state.Data_after_Login || {});
  const { employeelist } = useSelector((state) => state.Data_of_employee || {});
  const editId = useSelector((state) => state.Id_to_edit_user.editId);
  const dispatch = useDispatch();
  const [fileUrl, setFileUrl] = useState('');
  const [formData, setFormData] = useState({
    Name: '',
    email: '',
    phone: '',
    role: '',
    gender: '',
    degree: {
      mca: false,
      bca: false,
      bsc: false,
    },
    file: null,
  });

  useEffect(() => {
    if (loggeduser.isAdmin && editId && employeelist) {
      const employeeToEdit = employeelist.employeelist.find(employee => employee._id === editId);
console.log("employeeToEdit:::",employeeToEdit)
      if (employeeToEdit) {
        const degrees = employeeToEdit.degree || [];

        setFormData({
          Name: employeeToEdit.Name || '',
          email: employeeToEdit.Email || '',
          phone: employeeToEdit.Phone || '',
          role: employeeToEdit.Designation || '',
          gender: employeeToEdit.Gender || '',
          degree: {
            mca: employeeToEdit.Course.mca || false,
            bca: employeeToEdit.Course.bca || false,
            bsc: employeeToEdit.Course.bsc || false,
          },
          file: employeeToEdit.Profile || null
        });
        setFileUrl(employeeToEdit.Profile || '');
      } else {
        console.error('Employee not found:', editId);
      }
    } else if (!loggeduser.isAdmin) {
      setFormData({
        Name: loggeduser.Name || '',
        email: loggeduser.email || '',
        phone: loggeduser.phone || '',
        role: '',
        gender: '',
        degree: {
          mca: false,
          bca: false,
          bsc: false,
        },
        file: loggeduser.Profile || null,
      });
    }
  }, [loggeduser, editId, employeelist]);


  
  


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCheckboxChange = (e) => {
    const {value, checked } = e.target;
    console.log(`Checkbox ${value} is ${checked ? 'checked' : 'unchecked'}`);
    setFormData((prevFormData) => ({
      ...prevFormData,
      degree: {
        ...prevFormData.degree,
        [value]: checked
      }
    }));
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      file: e.target.files[0]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const data = new FormData();
    
    // Append form fields and file to FormData object
    data.append('Name', formData.Name);
    data.append('email', formData.email);
    data.append('phone', formData.phone);
    data.append('role', formData.role);
    data.append('gender', formData.gender);
    data.append('usersId', editId);
    data.append('degree',  JSON.stringify(formData.degree));
    if (formData.file) {
      data.append('file', formData.file); // Append the file only if it exists
    }
    console.log("raw Form Data Submitted:", formData.degree);
    console.log("Form Data Submitted:", data);
    
   try {
    const token = localStorage.getItem('token');
    // Await dispatch and unwrap to handle the result
    dispatch(Admin_Edit_the_Employee({ value: data, baseUrl, token })).unwrap();
    
    // Show success toast
    toast.success("Update successful!");

  } catch (error) {
    // Handle errors
    console.error("Error during dispatch:", error);
    toast.error("Update failed: " + error.message);
  }




  };

  return (
    <div className={style.EditContainer}>
      <form className={style.EditForm} onSubmit={handleSubmit} encType="multipart/form-data">
        <div className={style.FormRow}>
          <label htmlFor="Name">Name:</label>
          <input
            id="Name"
            type="text"
            name="Name"
            value={formData.Name}
            onChange={handleInputChange}
            disabled={!loggeduser.isAdmin}
          />
        </div>

        <div className={style.FormRow}>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            disabled={!loggeduser.isAdmin}
          />
        </div>

        <div className={style.FormRow}>
          <label htmlFor="phone">Phone Number:</label>
          <input
            id="phone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            disabled={!loggeduser.isAdmin}
          />
        </div>

        {loggeduser.isAdmin && (
          <div className={style.FormRow}>
            <label htmlFor="role">Select Role:</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
            >
              <option value="">Select a role</option>
              <option value="hr">HR</option>
              <option value="manager">Manager</option>
              <option value="sales">Sales</option>
            </select>
          </div>
        )}

        <div className={style.FormRow}>
          <div>Gender:</div>
          <div className={style.RadioContainer}>
            <label className={style.RadioLabel}>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={formData.gender === 'male'}
                onChange={handleInputChange}
              />
              Male
            </label>
            <label className={style.RadioLabel}>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={formData.gender === 'female'}
                onChange={handleInputChange}
              />
              Female
            </label>
          </div>
        </div>

        <div className={style.FormRow}>
          <div>Degrees:</div>
          <div className={style.CheckboxContainer}>
            {['mca', 'bca', 'bsc'].map(degree => (
              <label key={degree} className={style.CheckboxLabel}>
                <input
                  type="checkbox"
                  name={degree} // This attribute is not necessary but helps with clarity
                  value={degree}
                  checked={formData.degree[degree]} // Ensure this accesses the correct value
                  onChange={handleCheckboxChange}
                />
                {degree.toUpperCase()}
              </label>
            ))}
          </div>
        </div>

        <div className={style.FormRo}>
          <label htmlFor="file">Upload File:</label>
          <input
            id="file"
            type="file"
            name="file"
            onChange={handleFileChange}
            className={style.Pro}
          />
          <div>{fileUrl && <div><img src={fileUrl} alt="Profile" className={style.ProfileImage} /></div>}</div>
        </div>

        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditExistingEmployee;
