import React from "react";
import { Link } from "react-router-dom";

export default function HomeSection2() {
  return (
    <div>
      <section className="section2">
        <div className="section2-container">
          {/* Left: Content */}
          <div className="section2-left">
            <h2>Get Started with DormDrop</h2>
            <p>
              Join DormDrop today and enjoy reliable, convenient laundry
              services designed specifically for students. Our streamlined
              process ensures your laundry is picked up and delivered on
              schedule, with transparent pricing and dedicated care for your
              garments.
            </p>
            <div className="button-group">
              <Link to="/studentLogin">
                <button className="sec2-btn login-btn">Login</button>
              </Link>
              <Link to="/studentSignup">
                <button className="sec2-btn signup-btn">Sign Up</button>
              </Link>
            </div>
          </div>

          {/* Right: Image */}
          <div className="section2-right">
            <img
              src="homeSecImgs/sec2-img.jpg"
              alt="Students Laundry"
              className="section2-image"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
