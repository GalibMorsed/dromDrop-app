import React, { useState } from "react";

export default function AdminSection3() {
  const [staffId, setStaffId] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ staffId, password });
    // TODO: API call
  };

  return (
    <div className="admin-section3-container">
      <div className="admin-section3-card">
        <h2 className="admin-section3-title">➕ Add Laundry Staffs</h2>
        <p className="admin-section3-subtitle">
          Create login credentials for new laundry staff members.
        </p>
        <form onSubmit={handleSubmit} className="admin-section3-form">
          <input
            type="text"
            placeholder="Enter Staff ID"
            value={staffId}
            onChange={(e) => setStaffId(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn-submit">
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}
