import React, { useEffect, useState } from "react";

export default function AdminSection1() {
  const [adminData, setAdminData] = useState(null);

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");

    if (storedEmail) {
      fetch(`http://localhost:6060/auth/AdminDashboard?email=${storedEmail}`)
        .then((res) => res.json())
        .then((data) => setAdminData(data))
        .catch((err) => console.error("Error fetching admin data:", err));
    }
  }, []);

  if (!adminData) {
    return (
      <div className="admin-section1">
        <div className="welcome-container">
          <h2 className="welcome-title">Loading dashboard...</h2>
          <p className="welcome-subtitle">
            Please wait while we fetch your data.
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="admin-section1">
      <div className="welcome-container">
        <h2 className="welcome-title">Welcome back, {adminData.role} 👋</h2>
        <p className="welcome-subtitle">
          You're Managing: <strong>{adminData.institution}</strong> | Email:{" "}
          <span>{adminData.email}</span>
        </p>

        <div className="important-info">
          📊 Current System Status:
          <br />
          <strong>{adminData.studentCount}</strong> Students/Users and{" "}
          <strong>{adminData.staffCount}</strong> Staff/Faculty members
          registered.
          <br />
          Keep an eye on new sign-ups and ensure data stays up to date!
        </div>
      </div>
    </section>
  );
}
