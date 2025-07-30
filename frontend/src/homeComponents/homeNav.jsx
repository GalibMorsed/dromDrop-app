import React from "react";
import { Link } from "react-router-dom";

export default function HomeNav() {
  return (
    <>
      <nav className="home-navbar">
        <div className="navbar-left">
          <img
            src="/DromDrop_Logo.jpg"
            alt="DormDrop Logo"
            className="navbar__logo"
          />
          <span className="navbar__title">DormDrop</span>
        </div>

        <ul className="navbar-center">
          <li>
            <Link to="/studentLogin">Students</Link>
          </li>
          <li>
            <Link to="/adminLogin">Admin</Link>
          </li>
          <li>
            <Link to="/staffLogin">Staff</Link>
          </li>
        </ul>

        <div className="navbar-right">
          <button className="cta-btn">It's Free → Try now!</button>
        </div>
      </nav>
    </>
  );
}
