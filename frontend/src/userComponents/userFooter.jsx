import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function UserFooter() {
  const navigate = useNavigate();
  const [role, setRole] = useState("");

  useEffect(() => {
    setRole(localStorage.getItem("role"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userEmail");
    navigate("/");
  };

  return (
    <footer className="user-footer">
      <div className="footer-content">
        <Link to="/" className="footer-link" onClick={handleLogout}>
          Help
        </Link>
        <Link to="/aboutUs" className="footer-link">
          Contact Info
        </Link>
      </div>
    </footer>
  );
}
