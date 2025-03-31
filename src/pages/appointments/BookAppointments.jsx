import React, { useState } from "react";
import "../../styles/appointment.css";
import DashboardLayout from "../../components/DashboardLayout";


const BookAppointment = () => {
  const [formData, setFormData] = useState({ patientId: "", doctorId: "", date: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Booking appointment with data:", formData);
  };

  return (
    <DashboardLayout>
      <div className="appointment-form-container">
        <h2>Book Appointment</h2>
        <form onSubmit={handleSubmit} className="appointment-form">
          <input type="text" name="patientId" placeholder="Patient ID" onChange={handleChange} required />
          <input type="text" name="doctorId" placeholder="Doctor ID" onChange={handleChange} required />
          <input type="date" name="date" onChange={handleChange} required />
          <button type="submit">Book</button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default BookAppointment;
