import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DashboardLayout from "../../components/DashboardLayout";
import "../../styles/register/doctorRegister.css";

const DoctorRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    specialty: "",
    qualification: "",
    availableDays: [],
    availableTime: [],
    profileImage: null,
  });

  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: checked
        ? [...prevData[name], value]
        : prevData[name].filter((item) => item !== value),
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 2 * 1024 * 1024) {
      setFormData({ ...formData, profileImage: file });
      setPreview(URL.createObjectURL(file));
    } else {
      setError("File size should be less than 2MB");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.phone ||
      !formData.specialty ||
      !formData.qualification ||
      formData.availableDays.length === 0 ||
      formData.availableTime.length === 0
    ) {
      setError("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    try {
      const formDataToSend = new FormData();

      formDataToSend.append("email", formData.email.toLowerCase());

      ["name", "password", "phone", "specialty", "qualification"].forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });

      formDataToSend.append("availableDays", JSON.stringify(formData.availableDays));
      formDataToSend.append("availableTime", JSON.stringify(formData.availableTime));

      if (formData.profileImage) {
        formDataToSend.append("profileImage", formData.profileImage);
      }

      const res = await axios.post("https://hospital-patient-care-backend.onrender.com/api/doctor/signup", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (res.status === 201 || res.data.success) {
        setSuccess("Doctor registered successfully! Redirecting...");
        setTimeout(() => navigate("/admin"), 2000);
        setFormData({
          name: "",
          email: "",
          password: "",
          phone: "",
          specialty: "",
          qualification: "",
          availableDays: [],
          availableTime: [],
          profileImage: null,
        });
        setPreview(null);
      } else {
        throw new Error(res.data.message || "Unexpected response");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="doctor-register-container">
        <form className="doctor-register-box" onSubmit={handleSignup} encType="multipart/form-data">
          <div className="doctor-form-section">
            <h2>Doctor Registration</h2>

            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
            
            <input type="text" placeholder="Enter Name" name="name" value={formData.name} onChange={handleChange} required />      
            <input type="email" placeholder="Enter Email" name="email" value={formData.email} onChange={handleChange} required />
            <input type="password" placeholder="Enter Password" name="password" value={formData.password} onChange={handleChange} required />           
            <input type="tel" placeholder="Enter phone number" name="phone" value={formData.phone} onChange={handleChange} required />
            <input type="text" placeholder="Specialty" name="specialty" value={formData.specialty} onChange={handleChange} required />
            <input type="text" placeholder="Qualifications" name="qualification" value={formData.qualification} onChange={handleChange} required /><br />

            <label>Profile Image</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {/* {preview && <img src={preview} alt="Profile Preview" className="profile-preview" />} */}
            <button className="back-btn" onClick={() => navigate(-1)}>Back ←</button>
          </div>

          <div className="form-section">
            <h3>Available Days</h3>
            <div className="checkbox-group">
              {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                <label key={day}>
                  <input type="checkbox" name="availableDays" value={day} onChange={handleCheckboxChange} />
                  {day}
                </label>
              ))}
            </div>

            <h3>Available Time Slots</h3>
            <div className="checkbox-group">
              {["09:00 AM - 11:00 AM", "11:00 AM - 01:00 PM", "01:00 PM - 03:00 PM", "03:00 PM - 05:00 PM"].map((time) => (
                <label key={time}>
                  <input type="checkbox" name="availableTime" value={time} onChange={handleCheckboxChange} />
                  {time}
                </label>
              ))}
            </div>

            

            <button type="submit" className="doctor-register-button" disabled={loading}>
              {loading ? "Registering..." : "Register Doctor"}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default DoctorRegister;
