import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom"; // ✅ Import Router
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router> {/* ✅ Wrap everything inside Router */}
      <AuthProvider> 
        <App />
      </AuthProvider>
    </Router>
  </StrictMode>
);
