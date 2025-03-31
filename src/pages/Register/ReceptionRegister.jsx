import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DashboardLayout from "../../components/DashboardLayout";
import "../../styles/register/receptionRegister.css";

const ReceptionRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone:"",
    profileImage: null,
  });

  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Image Upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 2 * 1024 * 1024) {
      setFormData({ ...formData, profileImage: file });
      setPreview(URL.createObjectURL(file));
    } else {
      setError("File size should be less than 2MB");
    }
  };

  // Handle Receptionist Signup
  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (!formData.name || !formData.email || !formData.password || !formData.phone)  {
      setError("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("password", formData.password);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("role", "reception"); // Default role
      if (formData.profileImage) {
        formDataToSend.append("profileImage", formData.profileImage);
      }

      const res = await axios.post(
        "https://hospital-patient-care-backend.onrender.com/api/reception/signup",
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (res.status === 201 || res.data.success) {
        setSuccess("Signup successful! Redirecting...");
        setTimeout(() => navigate("/admin"), 2000);
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
      <div className="reception-signup-container">
        <div className="reception-signup-box">
          <h2>Register Receptionist</h2>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}

          <form onSubmit={handleSignup} className="reception-form-container">
            <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
            <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
            <label className="file-label">
              Upload Profile Image (Optional)
              <input type="file" accept="image/*" onChange={handleImageChange} />
            </label>

            {/* {preview && <img src={preview} alt="Preview" className="profile-preview" />} */}

            <button className="reception-signup-btn" type="submit" disabled={loading}>
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
            <br /><br />
            <button className="reception-back-btn" onClick={() => navigate(-1)}>← Back</button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ReceptionRegister;
