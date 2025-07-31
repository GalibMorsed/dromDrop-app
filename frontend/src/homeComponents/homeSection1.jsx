import React from "react";
import HomeNav from "./homeNav";

export default function HomeSection1() {
  return (
    <section className="section1">
      <HomeNav />
      <div className="section1-container">
        {/* Left (Image) */}
        <div className="section1-left">
          <img
            src="/sec1_img.avif"
            alt="Laundry Service"
            className="section1-image"
          />
        </div>

        {/* Right (Content) */}
        <div className="section1-right">
          <h1>Making Hostel Laundry Hassle-Free</h1>
          <p>
            Without DormDrop, students often struggle with irregular laundry
            pickups, misplaced clothes, and extra charges for unlisted items.
            Our platform streamlines weekly laundry scheduling, ensures
            transparency, and saves time so you can focus on what matters most.
          </p>
          <button className="sec1-cta-btn">It's Free → Try now!</button>
        </div>
      </div>
    </section>
  );
}
