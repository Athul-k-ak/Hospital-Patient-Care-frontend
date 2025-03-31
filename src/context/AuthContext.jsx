import { createContext, useContext, useState, useEffect } from "react";
import { login as apiLogin, logout as apiLogout, fetchUserProfile } from "../api/authApi";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ✅ Function to fetch user data
  const getUserProfile = async () => {
    setLoading(true);
    const userData = await fetchUserProfile();
    setUser(userData || null);
    console.log("✅ User fetched from API:", userData);
    setLoading(false);
  };

  // ✅ Fetch user on app load
  useEffect(() => {
    getUserProfile();
  }, []);

  // ✅ Login Function (Refetch user immediately)
  // ✅ Login Function (Force page reload after login)
// ✅ Login Function - Fetch fresh user data after login
const login = async (credentials) => {
    try {
      await apiLogin(credentials);
      await getUserProfile(); // Fetch updated user data
      console.log("✅ User logged in, profile updated");
      navigate("/"); // Redirect instead of full reload
    } catch (error) {
      console.error("❌ Login failed:", error);
    }
  };
  
  // ✅ Logout Function - Clears state & fetches new data
  const logout = async () => {
    try {
      await apiLogout();
      setUser(null); // Clear user state first
      console.log("🚪 User logged out, state cleared");
  
      // ✅ Ensure fresh user profile is fetched
      await new Promise((resolve) => setTimeout(resolve, 100)); // Small delay to ensure state update
      await getUserProfile();
  
      navigate("/login");
    } catch (error) {
      console.error("❌ Logout failed:", error);
    }
  };
  
  
  

  // 🔹 Log user updates
  useEffect(() => {
    console.log("👀 User state updated:", user);
  }, [user]);

  if (loading) return <div>Loading...</div>;

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
