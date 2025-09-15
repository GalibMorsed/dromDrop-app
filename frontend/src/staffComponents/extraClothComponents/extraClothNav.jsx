import React from "react";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function ExtraClothNav({ staffEmail, totalRequests }) {
  return (
    <nav className="extra-report-nav">
      {/* Left - Home */}
      <div className="report-nav-left">
        <Link to="/staffPage">
          <FaHome className="home-icon" />
        </Link>
      </div>

      {/* Middle - Staff Email */}
      <div className="report-nav-center">
        <span>Email: {staffEmail || "Guest User"}</span>
      </div>

      {/* Right - Total Requests */}
      <div className="report-nav-right">
        <span>Extra Cloth Requests: {totalRequests}</span>
      </div>
    </nav>
  );
}
