import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "../../styles/register/patientRegister.css"; // Import separate styles
import DashboardLayout from "../../components/DashboardLayout";

const PatientRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    phone: "",
    place: "", // ✅ Added place field
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (!formData.name || !formData.age || !formData.gender || !formData.phone || !formData.place) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(
        "https://hospital-patient-care-backend.onrender.com/api/patient/register",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // ✅ Ensures cookies are sent
        }
      );

      console.log("Response:", res.data);

      if (res.status === 201) {
        setSuccess(res.data.message);
        setFormData({ name: "", age: "", gender: "", phone: "", place: "" });

        // 🚀 Navigate to Admin Dashboard after successful registration
        setTimeout(() => {
          navigate("/admin");
        }, 1500);
      } else {
        throw new Error(res.data.message || "Unexpected response");
      }
    } catch (err) {
      console.error("Axios Error:", err.response?.data);
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="patient-container">
        <div className="patient-box">
          {/* Left Section */}
          <div className="patient-left">
            <h2>Register Patient</h2>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}

            <img
              src="https://cdn-icons-png.flaticon.com/512/3209/3209265.png"
              alt="Patient"
              className="patient-image"
            />
                <button className="patient-back-btn" onClick={() => navigate(-1)}>Back </button>

          </div>

          {/* Right Section */}
          <div className="patient-right">
           
            <form onSubmit={handleRegister}>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="number"
                name="age"
                placeholder="Age"
                value={formData.age}
                onChange={handleChange}
                required
              />
              <select name="gender" value={formData.gender} onChange={handleChange} required>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="place"
                placeholder="Place" // ✅ Added Place field
                value={formData.place}
                onChange={handleChange}
                required
              />
              <div className="button-group">
                <button type="submit" disabled={loading}>
                  {loading ? "Registering..." : "Register"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PatientRegister;
