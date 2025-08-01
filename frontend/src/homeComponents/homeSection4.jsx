import React from "react";
import { Link } from "react-router-dom";

export default function HomeSection4() {
  return (
    <div>
      <section className="section4">
        <div className="section4-container">
          {/* Left Side - Content */}
          <div className="section4-left">
            <h2>Support for Staff Members</h2>
            <p>
              DormDrop empowers staff to efficiently manage laundry pickups and
              deliveries, track extra items, and ensure every student gets the
              service they deserve. Simplify your daily tasks with our
              easy-to-use platform.
            </p>
            <div className="button-group">
              <button className="sec4-btn login-btn">
                <Link to="/staffLogin">Staff Login</Link>
              </button>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="section4-right">
            <img
              src="/sec1_img.avif"
              alt="DormDrop Staff"
              className="section4-image"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
