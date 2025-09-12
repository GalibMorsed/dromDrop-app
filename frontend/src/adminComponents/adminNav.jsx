import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function AdminNav() {
  const [menuOpen, setMenuOpen] = useState(false);
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
    <nav className="admin-navbar">
      {/* Left Section */}
      <div className="admin-navbar-left">
        <img
          src="adminSecImgs/userImg.avif"
          alt="Admin"
          className="admin-navbar__logo"
        />
        <span className="admin-navbar__title">{role}</span>
      </div>

      {/* Center Links */}
      <ul className={`admin-navbar-center ${menuOpen ? "active" : ""}`}>
        <li>
          <Link to="/editStaffPage" onClick={() => setMenuOpen(false)}>
            Edit Staffs
          </Link>
        </li>

        <li>
          <Link to="/userSetting" onClick={() => setMenuOpen(false)}>
            Account Settings
          </Link>
        </li>
        <li>
          <Link to="/aboutUniqueId" onClick={() => setMenuOpen(false)}>
            About Unique ID
          </Link>
        </li>
        <li className="admin-mobile-only">
          <button className="admin-cta-btn logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </li>
      </ul>

      {/* Right Section */}
      <div className="admin-navbar-right">
        <button
          className="admin-cta-btn admin-desktop-only"
          onClick={handleLogout}
        >
          Logout
        </button>

        {/* Hamburger */}
        <div
          className={`admin-hamburger${menuOpen ? " open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
}
