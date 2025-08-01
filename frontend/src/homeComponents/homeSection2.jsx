import React from "react";

export default function HomeSection2() {
  return (
    <section className="section2">
      <div className="section2-container">
        {/* Left: Content */}
        <div className="section2-left">
          <h2>Get Started with DormDrop</h2>
          <p>
            Join DormDrop today and enjoy reliable, convenient laundry services
            designed specifically for students. Our streamlined process ensures
            your laundry is picked up and delivered on schedule, with
            transparent pricing and dedicated care for your garments.
          </p>
          <div className="button-group">
            <button className="sec2-btn login-btn">Login</button>
            <button className="sec2-btn signup-btn">Sign Up</button>
          </div>
        </div>

        {/* Right: Image */}
        <div className="section2-right">
          <img
            src="/sec1_img.avif"
            alt="Students Laundry"
            className="section2-image"
          />
        </div>
      </div>
    </section>
  );
}
