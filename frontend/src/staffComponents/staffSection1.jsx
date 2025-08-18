import React from "react";
import { Link } from "react-router-dom";

export default function StaffSection1() {
  return (
    <section className="staff-create">
      <div className="staff-create-card">
        <div className="staff-create-text">
          <h2>Create Clothes Details</h2>
          <p>Add and manage clothes details for laundry processing.</p>
        </div>
        <div className="staff-create-action">
          <Link to="/CreatingClothes" className="staff-create-btn">
            Start Creating
          </Link>
        </div>
      </div>
    </section>
  );
}
