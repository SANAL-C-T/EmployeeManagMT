import React, { useState } from 'react';
import style from "../EditEmployee/EditExisting.module.css";
import Admin_Add_the_Employee from "../../Actions/AdminAction/AdminAddUserAction";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from 'react-redux';
const baseUrl = import.meta.env.VITE_API_URL;


const CreateNewEmployee = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: '',
    gender: '',
    degrees: {
      mca: false,
      bca: false,
      bsc: false,
    },
    file: null,
  });


  const [selectedImage, setSelectedImage] = useState(null);

 
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        degrees: {
          ...prev.degrees,
          [value]: checked,
        },
      }));
    } else if (type === 'file') {
      const file = e.target.files[0];
      setFormData({
        ...formData,
        file, 
      });

      if (file) {
      
        const imageUrl = URL.createObjectURL(file);
        setSelectedImage(imageUrl); 
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

 
  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);

    const data = new FormData();
    
   
    data.append('Name', formData.name);
    data.append('email', formData.email);
    data.append('phone', formData.phone);
    data.append('role', formData.role);
    data.append('gender', formData.gender);
    data.append('Password', formData.password);
    data.append('degree',  JSON.stringify(formData.degrees));
    if (formData.file) {
      data.append('file', formData.file);
    }
    console.log("raw Form Data of admin create employee Submitted:", formData.degrees);
    console.log("Form Data admin create employee Submitted:", data);

   try {
    const token = localStorage.getItem('token');
  
 
    const response = await dispatch(Admin_Add_the_Employee({ value: data, baseUrl, token }));
    
    
    if (response.error?.message) {
      throw new Error(response.error.message);
    }
    
   
    toast.success("Employee added successfully!");
  
  } catch (error) {
    console.error("Error during dispatch:", error);
    
   
    if (error?.response?.status === 400) {
      toast.error("Employee already exists.");
    } else {
    
      toast.error("Update failed: " + (error.response?.data?.error || error.message || "An error occurred."));
    }
  }


   
  };

  return (
    <div className={style.EditContainer}>
      <form className={style.EditForm} onSubmit={handleSubmit} encType="multipart/form-data">
        <div className={style.FormRow}>
          <label htmlFor="name">NAME:</label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter name"
            required
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
            placeholder="Enter your email"
            required
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
            placeholder="Enter your phone number"
            required
          />
        </div>

        <div className={style.FormRow}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
             placeholder="Enter your password"
            required
          />
        </div>

        <div className={style.FormRow}>
          <label htmlFor="role">Select Option:</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            required
          >
            <option value="">Select an option</option>
            <option value="hr">HR</option>
            <option value="manager">MANAGER</option>
            <option value="sales">SALES</option>
          </select>
        </div>

        <div className={style.F}>
          <div>Gender:</div>
          <div className={style.R}>
            <div className={style.Rname}>Male</div>
            <input
              type="radio"
              name="gender"
              value="male"
              checked={formData.gender === 'male'}
              onChange={handleInputChange}
            />
          </div>
          <div className={style.R}>
            <div className={style.Rname}>Female</div>
            <input
              type="radio"
              name="gender"
              value="female"
              checked={formData.gender === 'female'}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className={style.FormRow}>
          <div>Degrees:</div>
          <div className={style.RadioCheckboxContainer}>
            <div className={style.DegeeMCa}>
              <div className={style.Degeetitle}>MCA</div>
              <input
                type="checkbox"
                name="degree"
                value="mca"
                checked={formData.degrees.mca}
                onChange={handleInputChange}
              />
            </div>

            <div className={style.DegeeMCa}>
              <div className={style.Degeetitle}>BCA</div>
              <input
                type="checkbox"
                name="degree"
                value="bca"
                checked={formData.degrees.bca}
                onChange={handleInputChange}
              />
            </div>

            <div className={style.DegeeMCa}>
              <div className={style.Degeetitle}>BSC</div>
              <input
                type="checkbox"
                name="degree"
                value="bsc"
                checked={formData.degrees.bsc}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        <div className={style.Fo}>
          <label htmlFor="fileInput">Upload File:</label>
          <input
            id="fileInput"
            type="file"
            name="file"
            onChange={handleInputChange}
            className={style.Foin}
          />
        </div>

     
        {selectedImage && (
          <div className={style.ImagePreview}>
            <img src={selectedImage} alt="Selected" className={style.ProfileImage} />
          </div>
        )}

        <button type="submit">Create Employee</button>
      </form>
    </div>
  );
};

export default CreateNewEmployee;
