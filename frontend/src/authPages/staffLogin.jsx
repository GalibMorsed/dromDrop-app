import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";

function StaffLogin() {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;

    if (!email || !password) {
      return handleError("Email and password are required");
    }

    try {
      const url = "/";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });

      const result = await response.json();
      const { success, message, jwtToken, name, error } = result;

      if (success) {
        handleSuccess(message);
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("loggedInUser", name);
        localStorage.setItem("userEmail", email);
        setTimeout(() => navigate("/stafftPage"), 1000);
      } else {
        handleError(error?.details?.[0]?.message || message);
      }

      console.log(result);
    } catch (err) {
      handleError(err.message);
    }
  };

  return (
    <div className="wholeConatiner">
      <h1 className="logo">DromDrop</h1>
      <div className="auth-container">
        <h1>Staff Login</h1>
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="uniqueId">Unique Id</label>
            <input
              onChange={handleChange}
              type="uniqueId"
              name="uniqueId"
              placeholder="Enter your given unique id..."
              value={loginInfo.email}
            />
          </div>
          <div>
            <label htmlFor="staffId">Staff Id</label>
            <input
              onChange={handleChange}
              type="staffId"
              name="staffId"
              placeholder="Enter your given staff id..."
              value={loginInfo.email}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              onChange={handleChange}
              type="password"
              name="password"
              placeholder="Enter your password..."
              value={loginInfo.password}
            />
          </div>
          <div>
            <label htmlFor="role">Position</label>
            <input
              type="text"
              name="role"
              value="Staff/Faculty"
              readOnly
              disabled
              className="readonly-field"
            />
          </div>
          <button className="auth-btn" type="submit">
            Login
          </button>
          <span>
            <Link to="/">Forgot Password?</Link>
          </span>
          <span>Use your institution given id's and password to Login</span>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default StaffLogin;
