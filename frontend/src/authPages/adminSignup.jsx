import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";

function AdminSignup() {
  const [signupInfo, setSignupInfo] = useState({
    institution: "",
    email: "",
    password: "",
    role: "Administrator",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { institution, email, password, role } = signupInfo;

    if (!institution || !email || !password) {
      return handleError("Institution, email, and password are required");
    }

    try {
      setLoading(true);
      const url = "https://dromdrop.onrender.com/auth/adminSignup";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupInfo),
      });

      const result = await response.json();
      const { success, message, error } = result;

      if (success) {
        handleSuccess(message);
        setTimeout(() => navigate("/adminLogin"), 1000);
      } else {
        handleError(error?.details?.[0]?.message || message);
      }

      console.log(result);
    } catch (err) {
      handleError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="wholeConatiner">
      <h1 className="logo">DormDrop</h1>
      <div className="auth-container">
        <h1>Admin Signup</h1>
        <form onSubmit={handleSignup}>
          <div>
            <label htmlFor="institution">Institution Name</label>
            <input
              onChange={handleChange}
              type="text"
              name="institution"
              autoFocus
              placeholder="Enter your institution name..."
              value={signupInfo.institution}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              onChange={handleChange}
              type="email"
              name="email"
              placeholder="Enter your email..."
              value={signupInfo.email}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              onChange={handleChange}
              type="password"
              name="password"
              placeholder="Enter your password..."
              value={signupInfo.password}
              required
            />
          </div>
          <div>
            <label htmlFor="role">Position</label>
            <input
              type="text"
              name="role"
              value="Administrator"
              readOnly
              disabled
              className="readonly-field"
            />
          </div>
          <button className="auth-btn btn" type="submit" disabled={loading}>
            {loading ? "Signing up..." : "Signup"}
          </button>
          <span>
            Already have an account? <Link to="/adminLogin">Login</Link> here.
          </span>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </div>
  );
}

export default AdminSignup;
