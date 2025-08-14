import React, { useState } from "react";
import axios from "axios";

export default function AdminSection3() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:6060/auth/Staffsignup",
        {
          email: email.trim(),
          password: password.trim(),
        }
      );

      alert(response.data.message || "Staff account created successfully"); // ✅ success alert
      setEmail("");
      setPassword("");
    } catch (err) {
      alert(err.response?.data?.message || "Error creating staff account"); // ❌ error alert
    } finally {
      setLoading(false);
    }
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
            type="email"
            placeholder="Enter Staff Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="new-password"
          />
          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
}
