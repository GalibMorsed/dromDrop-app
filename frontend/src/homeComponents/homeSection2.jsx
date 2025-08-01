import React from "react";

export default function HomeSection2() {
  return (
    <section className="section2">
      <div className="section2-container">
        {/* Left Side - Description */}
        <div className="section2-left">
          <h2>Get Started with DormDrop</h2>
          <p>
            Create your DormDrop account today and say goodbye to missed laundry
            pickups and surprise charges. Signing up is simple, quick, and
            ensures your clothes are managed with care every week.
          </p>
        </div>

        {/* Right Side - Buttons */}
        <div className="section2-right">
          <h3>Ready to Join?</h3>
          <div className="button-group">
            <button className="sec2-btn login-btn btn">Login</button>
            <button className="sec2-btn signup-btn btn">Sign Up</button>
          </div>
        </div>
      </div>
    </section>
  );
}
