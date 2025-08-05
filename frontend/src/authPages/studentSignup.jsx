import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";

function StudentSignup() {
  const [signupInfo, setSignupInfo] = useState({
    uniqueId: "",
    email: "",
    password: "",
    role: "Student/User",
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
    const { uniqueId, email, password, role } = signupInfo;

    if (!uniqueId || !email || !password) {
      return handleError("UniqueId, email, and password are required");
    }

    try {
      setLoading(true);

      // Step 1: Check if Unique ID is valid
      const checkUrl = "http://localhost:6060/auth/checkUniqueId";
      const checkResponse = await fetch(checkUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uniqueId }),
      });

      const checkResult = await checkResponse.json();
      if (!checkResult.success) {
        setLoading(false);
        return handleError(checkResult.message || "Invalid Unique ID");
      }

      // Step 2: If valid, proceed with signup
      const signupUrl = "http://localhost:6060/auth/UserSignup";
      const response = await fetch(signupUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
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
            <label htmlFor="uniqueId">Unique ID</label>
            <input
              onChange={handleChange}
              type="text"
              name="uniqueId"
              autoFocus
              placeholder="Enter the given unique id..."
              value={signupInfo.uniqueId}
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
            Already have an account? <Link to="/studentLogin">Login</Link>
          </span>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default StudentSignup;
