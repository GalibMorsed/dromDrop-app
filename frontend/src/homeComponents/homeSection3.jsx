import React from "react";
import { Link } from "react-router-dom";

export default function HomeSection3() {
  return (
    <div>
      <section className="section3">
        <div className="section3-container">
          {/* Left: Image */}
          <div className="section3-left">
            <img
              src="homeSecImgs/sec3-img.avif"
              alt="Admin Dashboard"
              className="section3-image"
            />
          </div>

          {/* Right: Content */}
          <div className="section3-right">
            <h2>Administer DormDrop Services</h2>
            <p>
              DormDrop empowers administrators to oversee all aspects of student
              laundry operations. Manage staff accounts, monitor service
              activity, and access detailed reports — all from a centralized
              dashboard designed for campus efficiency.
            </p>
            <div className="button-group">
              <Link to="/adminLogin">
                <button className="sec3-btn login-btn">Admin Login</button>
              </Link>
              <Link to="/adminSignup">
                <button className="sec3-btn signup-btn">
                  Create Admin Account
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
