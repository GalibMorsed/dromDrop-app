import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function HomeNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="home-navbar">
      {/* Left Section */}
      <div className="navbar-left">
        <img
          src="/DromDrop_Logo.jpg"
          alt="DormDrop Logo"
          className="navbar__logo"
        />
        <span className="navbar__title">
          <Link to="/" className="DromDrop">
            DormDrop
          </Link>
        </span>
      </div>

      {/* Center Links (desktop) */}
      <ul className={`navbar-center ${menuOpen ? "active" : ""}`}>
        <li>
          <Link to="/studentLogin" onClick={() => setMenuOpen(false)}>
            Users
          </Link>
        </li>
        <li>
          <Link to="/adminLogin" onClick={() => setMenuOpen(false)}>
            Admin
          </Link>
        </li>
        <li>
          <Link to="/staffLogin" onClick={() => setMenuOpen(false)}>
            Staff
          </Link>
        </li>
      </ul>

      {/* Right Section */}
      <div className="navbar-right">
        <button className="cta-btn">It's Free → Try now!</button>

        {/* Hamburger Icon (mobile) */}
        <div
          className={`hamburger${menuOpen ? " open" : ""}`}
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
