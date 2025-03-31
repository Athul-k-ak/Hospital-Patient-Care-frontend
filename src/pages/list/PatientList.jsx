import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import DashboardLayout from "../../components/DashboardLayout";
import "../../styles/list/patientList.css";

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await axios.get("https://hospital-patient-care-backend.onrender.com/api/patient", {
          withCredentials: true,
        });
        setPatients(res.data.patients);
      } catch (err) {
        setError("Failed to fetch patient data.");
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  // 🔍 Filter Patients
  const filteredPatients = (patients || []).filter((patient) =>
    (patient.name && patient.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (patient.phone && patient.phone.includes(searchTerm)) ||
    (patient.place && patient.place.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  

  // 📄 Download Patient List as PDF
  const handleDownloadPDF = () => {
    if (filteredPatients.length === 0) {
      alert("No patients available to download!");
      return;
    }

    const doc = new jsPDF();
    doc.text("Patient List", 15, 10);
    doc.autoTable({
      startY: 20,
      head: [["#", "Name", "Age", "Gender", "Phone", "Place"]],
      body: filteredPatients.map((patient, index) => [
        index + 1,
        patient.name,
        patient.age || "N/A",
        patient.gender || "N/A",
        patient.phone || "N/A",
        patient.place || "N/A",
      ]),
    });

    doc.save("Patient_List.pdf");
  };

  return (
    <DashboardLayout>
      <div className="patient-list-container">
        {error && <p className="error">{error}</p>}

        <h2>Patient List</h2>

        {/* 🔄 Show Loading Indicator */}
        {loading && <p className="loading-text">⏳ Loading patients...</p>}

        {/* Search Bar */}
        <input
          type="text"
          placeholder="🔍 Search patient by name, phone, or place..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-box"
        />

        {/* Download PDF Button */}
        <div className="actions">
          <button
            onClick={handleDownloadPDF}
            className="pdf-btn"
            disabled={filteredPatients.length === 0}
          >
            📥 Download PDF
          </button>
        </div>

        {/* Patient Table */}
        <div className="table-wrapper">
          <table className="patient-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Phone</th>
                <th>Place</th>
              </tr>
            </thead>
              <tbody>
                {filteredPatients.length > 0 ? (
                  filteredPatients.map((patient, index) => (
                    <tr key={patient._id}>
                      <td>{index + 1}</td>
                      <td>{patient.name}</td>
                      <td>{patient.age || "N/A"}</td>
                      <td>{patient.gender || "N/A"}</td>
                      <td>{patient.phone || "N/A"}</td>
                      <td>{patient.place || "N/A"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="no-data">No patients found</td>
                  </tr>
                )}
              </tbody>

                        </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PatientList;
