import React from "react";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function TrackNav({ email, totalAmount }) {
  return (
    <nav className="track-nav">
      {/* Left - Home */}
      <div className="nav-left">
        <Link to="/studentPage">
          <FaHome className="home-icon" />
        </Link>
      </div>

      {/* Middle - User Email */}
      <div className="nav-center">
        <span>Email: {email || "Guest User"}</span>
      </div>

      {/* Right - Total Amount */}
      <div className="nav-right">
        <span>Total Amount: ₹{totalAmount}</span>
      </div>
    </nav>
  );
}
