import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";

function StudentSignup() {
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
    role: "Student",
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

  const validatePassword = (password) => {
    const minLength = /.{6,}/;
    const hasNumber = /\d/;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;
    if (!minLength.test(password))
      return "Password must be at least 6 characters long.";
    if (!hasNumber.test(password))
      return "Password must contain at least one number.";
    if (!hasSpecialChar.test(password))
      return "Password must contain at least one special character.";
    return null;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password, role } = signupInfo;

    if (!name || !email || !password) {
      return handleError("Name, email, and password are required");
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      return handleError(passwordError);
    }

    try {
      setLoading(true);
      const url = "/";
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
        setTimeout(() => navigate("/studentLogin"), 1000);
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
        <h1>Signup Here</h1>
        <form onSubmit={handleSignup}>
          <div>
            <label htmlFor="name">Unique ID</label>
            <input
              onChange={handleChange}
              type="uniqueId"
              autoFocus
              placeholder="Enter the given unique id..."
              value={signupInfo.name}
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
            />
          </div>
          <div>
            <label htmlFor="role">Position</label>
            <input
              type="text"
              name="role"
              value="Student/User"
              readOnly
              disabled
              className="readonly-field"
            />
          </div>
          <button className="auth-btn" type="submit" disabled={loading}>
            {loading ? "Signing up..." : "Signup"}
          </button>
          <span>
            Already have an account? <Link to="/studentLogin">Login</Link> here.
          </span>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default StudentSignup;
