import React from "react";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function EditStaffNav({ staffCount }) {
  return (
    <nav className="editstaff-nav">
      <div className="nav-left">
        <Link to="/adminPage">
          <FaHome className="home-icon" />
        </Link>
      </div>
      <div className="nav-center">
        <span>Staff Management</span>
      </div>
      <div className="nav-right">
        <span>Staff Count: {staffCount || 0}</span>
      </div>
    </nav>
  );
}
