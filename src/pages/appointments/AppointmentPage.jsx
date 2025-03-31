import DashboardLayout from "../../components/DashboardLayout";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";

const AppointmentPage = () => {
  const { user, loading } = useAuth(); // ✅ Always get the latest user

  useEffect(() => {
    console.log("📢 User updated in AppointmentPage:", user);
  }, [user]); // ✅ Log when user updates

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>User not found. Please log in.</p>;

  return (
    <DashboardLayout>
    <div>
      <h1>Welcome, {user.role === "doctor" ? "Doctor" : "User"}!</h1>
      <p>Your Role: {user.role}</p>
    </div>
    </DashboardLayout>
  );
};

export default AppointmentPage;