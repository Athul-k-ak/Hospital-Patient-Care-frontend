import axios from "axios";

const API_URL = "https://hospital-patient-care-backend.onrender.com/api/auth";

// ✅ Login API
export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials, { withCredentials: true });
    return response.data;
  } catch (error) {
    throw error.response?.data || "Login failed!";
  }
};

// ✅ Logout API
export const logout = async () => {
  try {
    await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
  } catch (error) {
    console.error("Logout failed:", error);
  }
};

// ✅ Fetch logged-in user profile
export const fetchUserProfile = async () => {
    try {
      // Append timestamp to prevent caching issues
      const response = await axios.get(`${API_URL}/profile?t=${Date.now()}`, { withCredentials: true });
      return response.data;
    } catch (error) {
      return null;
    }
  };
  
