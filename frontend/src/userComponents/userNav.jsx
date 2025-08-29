import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function UserNav() {
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
    <nav className="user-navbar">
      {/* Left Section */}
      <div className="user-navbar-left">
        <img
          src="adminSecImgs/userImg.avif"
          alt="User"
          className="user-navbar__logo"
        />
        <span className="user-navbar__title">{role}</span>
      </div>

      {/* Center Links */}
      <ul className={`user-navbar-center ${menuOpen ? "active" : ""}`}>
        <li>
          <Link to="/studentPage" onClick={() => setMenuOpen(false)}>
            Track Charged Clothes
          </Link>
        </li>

        <li>
          <Link to="/studentPage" onClick={() => setMenuOpen(false)}>
            Account Settings
          </Link>
        </li>
        <li className="user-mobile-only">
          <button className="user-cta-btn logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </li>
      </ul>

      {/* Right Section */}
      <div className="user-navbar-right">
        <button
          className="user-cta-btn user-desktop-only"
          onClick={handleLogout}
        >
          Logout
        </button>

        {/* Hamburger */}
        <div
          className={`user-hamburger${menuOpen ? " open" : ""}`}
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
