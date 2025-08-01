import React from "react";

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
            <button className="sec3-btn login-btn">Admin Login</button>
            <button className="sec3-btn signup-btn">
              Create Admin Account
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
