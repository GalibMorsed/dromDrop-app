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
    instituteName: "",
  });

  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const verifyUniqueId = async () => {
    if (!signupInfo.uniqueId.trim()) {
      return handleError("Please enter a Unique ID to verify.");
    }
    try {
      setVerifying(true);
      const res = await fetch("https://dromdrop.onrender.com/uniqueId/verifyUniqueId", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uniqueId: signupInfo.uniqueId }),
      });

      const data = await res.json();

      if (data.success) {
        handleSuccess("Unique ID verified successfully!");
        setSignupInfo((prev) => ({
          ...prev,
          instituteName: data.instituteName || data.institutionName || "",
        }));
        setIsVerified(true);
      } else {
        handleError(data.message || "Invalid Unique ID");
        setIsVerified(false);
      }
    } catch (err) {
      handleError(err.message);
    } finally {
      setVerifying(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const { uniqueId, email, password, role, instituteName } = signupInfo;

    if (!isVerified) {
      return handleError("Please verify your Unique ID before signing up.");
    }

    if (!email.trim() || !password.trim()) {
      return handleError("Email and password are required");
    }

    try {
      setLoading(true);
      const response = await fetch("https://dromdrop.onrender.com/auth/Usersignin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uniqueId,
          instituteName,
          email,
          password,
          role,
        }),
      });

      const result = await response.json();
      if (result.success) {
        handleSuccess(result.message || "Signup successful!");
        setTimeout(() => navigate("/studentLogin"), 1500);
      } else {
        handleError(result.error?.details?.[0]?.message || result.message);
      }
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
          <div className="uniqueId-group">
            <label htmlFor="uniqueId">Unique ID</label>
            <div className="input-with-btn">
              <input
                onChange={handleChange}
                type="text"
                name="uniqueId"
                placeholder="Enter the given unique ID..."
                value={signupInfo.uniqueId}
                disabled={isVerified}
              />
              <button
                type="button"
                className="verify-btn"
                onClick={verifyUniqueId}
                disabled={verifying || isVerified}
              >
                {verifying
                  ? "Verifying..."
                  : isVerified
                  ? "Verified ✅"
                  : "Verify"}
              </button>
            </div>
            {isVerified && signupInfo.instituteName && (
              <p className="institution-info">
                Institution: <strong>{signupInfo.instituteName}</strong>
              </p>
            )}
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

          <button className="auth-btn btn" type="submit" disabled={loading}>
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
