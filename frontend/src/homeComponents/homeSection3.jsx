import React from "react";
import { Link } from "react-router-dom";

export default function HomeSection3() {
  return (
    <section className="section3">
      <div className="section3-container">
        {/* Left: Image */}
        <div className="section3-left">
          <img
            src="/sec1_img.avif"
            alt="Admin Dashboard"
            className="section3-image"
          />
        </div>

        {/* Right: Content */}
        <div className="section3-right">
          <h2>Administer DormDrop Services</h2>
          <p>
            DormDrop empowers administrators to oversee all aspects of student
            laundry operations. Manage staff accounts, monitor service activity,
            and access detailed reports — all from a centralized dashboard
            designed for campus efficiency.
          </p>
          <div className="button-group">
            <button className="sec3-btn login-btn">
              <Link to="/adminLogin">Admin Login</Link>
            </button>
            <button className="sec3-btn signup-btn">
              <Link to="/adminSignup">Create Admin Account</Link>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
