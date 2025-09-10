import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function StaffNav() {
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
    <nav className="staff-navbar">
      {/* Left Section */}
      <div className="staff-navbar-left">
        <img
          src="adminSecImgs/userImg.avif"
          alt="Staff"
          className="staff-navbar__logo"
        />
        <span className="staff-navbar__title">{role}</span>
      </div>

      {/* Center Links */}
      <ul className={`staff-navbar-center ${menuOpen ? "active" : ""}`}>
        <li>
          <Link to="/dailyReport" onClick={() => setMenuOpen(false)}>
            Daily Reports
          </Link>
        </li>

        <li>
          <Link to="/userSetting" onClick={() => setMenuOpen(false)}>
            Account Settings
          </Link>
        </li>
        <li>
          <Link to="/extraClothPage" onClick={() => setMenuOpen(false)}>
            Extra Clothes
          </Link>
        </li>
        <li className="staff-mobile-only">
          <button className="staff-cta-btn logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </li>
      </ul>

      {/* Right Section */}
      <div className="staff-navbar-right">
        <button
          className="staff-cta-btn staff-desktop-only"
          onClick={handleLogout}
        >
          Logout
        </button>

        {/* Hamburger */}
        <div
          className={`staff-hamburger${menuOpen ? " open" : ""}`}
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
