import React from "react";
import "../styles/appointment.css";

const AppointmentCard = ({ title, description, onClick }) => {
  return (
    <div className="appointment-card" onClick={onClick}>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default AppointmentCard;
