import { Routes, Route } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // ✅ Keep inside AuthProvider
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import AdminDashboard from "../pages/Dashboard/AdminDashboard";
import DoctorDashboard from "../pages/Dashboard/DoctorDashboard";
import ReceptionDashboard from "../pages/Dashboard/ReceptionDashboard";
import ProtectedRoute from "../routes/ProtectedRoute";
import RegisterPage from "../pages/RegisterPage";
import AdminRegister from "../pages/Register/AdminRegister";
import DoctorRegister from "../pages/Register/DoctorRegister";
import StaffRegister from "../pages/Register/StaffRegister";
import ReceptionRegister from "../pages/Register/ReceptionRegister";
import DoctorList from "../pages/list/DoctorList";
import DoctorDetails from "../pages/DoctorDetails";
import PatientRegister from "../pages/Register/PatientRegister";
import PatientList from "../pages/list/PatientList";
import AppointmentPage from "../pages/appointments/AppointmentPage";
import BookAppointment from "../pages/appointments/BookAppointments";
import ViewAppointments from "../pages/appointments/ViewAppointments";
import ViewAppointmentsByDoctor from "../pages/appointments/ViewAppointmentsByDoctor";

const AppRoutes = () => {
  const { user } = useAuth(); // ✅ Ensures it's inside AuthProvider
  const userRole = user?.role; // ✅ Get the role of the logged-in user

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected Routes for Admin */}
      <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/register" element={<RegisterPage />} />
        <Route path="/admin/register/admin" element={<AdminRegister />} />
        <Route path="/admin/register/doctor" element={<DoctorRegister />} />
        <Route path="/admin/register/staff" element={<StaffRegister />} />
        <Route path="/admin/register/reception" element={<ReceptionRegister />} />
        <Route path="/admin/register-patient" element={<PatientRegister />} />
        <Route path="/admin/doctor-list" element={<DoctorList />} />
        <Route path="/admin/patient-list" element={<PatientList />} />
        <Route path="/admin/doctor/:id" element={<DoctorDetails />} />

        {/* Admin Appointment Routes */}
        <Route path="/admin/appointments" element={<AppointmentPage userRole={userRole} />} />
        <Route path="/admin/appointments/book" element={<BookAppointment />} />
        <Route path="/admin/appointments/view" element={<ViewAppointments />} />
        <Route path="/admin/appointments/doctor-wise" element={<ViewAppointmentsByDoctor />} />
      </Route>

      {/* Protected Routes for Doctor */}
      <Route element={<ProtectedRoute allowedRoles={["doctor"]} />}>
        <Route path="/doctor" element={<DoctorDashboard />} />
        <Route path="/doctor/patient-list" element={<PatientList />} />
        <Route path="/doctor/appointments" element={<AppointmentPage userRole={userRole} />} />
        <Route path="/doctor/appointments/view" element={<ViewAppointments />} />
      </Route>

      {/* Protected Routes for Reception */}
      <Route element={<ProtectedRoute allowedRoles={["reception"]} />}>
        <Route path="/reception" element={<ReceptionDashboard />} />
        <Route path="/reception/register-patient" element={<PatientRegister />} />
        <Route path="/reception/appointments" element={<AppointmentPage userRole={userRole} />} />
        <Route path="/reception/appointments/book" element={<BookAppointment />} />
        <Route path="/reception/appointments/view" element={<ViewAppointments />} />
        <Route path="/reception/appointments/doctor-wise" element={<ViewAppointmentsByDoctor />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
