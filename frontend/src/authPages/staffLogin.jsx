import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";

function StaffLogin() {
  const [loginInfo, setLoginInfo] = useState({
    uniqueId: "",
    staffId: "",
    password: "",
    role: "Staff/Faculty",
    instituteName: "",
  });

  const [verifying, setVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ Verify Unique ID (Same as StudentSignup)
  const verifyUniqueId = async () => {
    if (!loginInfo.uniqueId.trim()) {
      return handleError("Please enter a Unique ID to verify.");
    }
    try {
      setVerifying(true);
      const res = await fetch("http://localhost:6060/uniqueId/verifyUniqueId", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uniqueId: loginInfo.uniqueId }),
      });

      const data = await res.json();

      if (data.success) {
        handleSuccess("Unique ID verified successfully!");
        setLoginInfo((prev) => ({
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

  // ✅ Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();

    const { uniqueId, staffId, password, role, instituteName } = loginInfo;

    if (!isVerified) {
      return handleError("Please verify your Unique ID before logging in.");
    }

    if (!staffId.trim() || !password.trim()) {
      return handleError("Staff ID and password are required");
    }

    try {
      setLoading(true);
      const response = await fetch("http://localhost:6060/auth/staffLogin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginInfo),
      });

      const result = await response.json();
      if (result.success) {
        handleSuccess(result.message || "Login successful!");
        localStorage.setItem("token", result.jwtToken);
        localStorage.setItem("userEmail", staffId);
        setTimeout(() => navigate("/staffPage"), 1500);
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
        <h1>Staff Login</h1>
        <form onSubmit={handleLogin}>
          {/* Unique ID with Verify Button */}
          <div className="uniqueId-group">
            <label htmlFor="uniqueId">Unique ID</label>
            <div className="input-with-btn">
              <input
                onChange={handleChange}
                type="text"
                name="uniqueId"
                placeholder="Enter the given unique ID..."
                value={loginInfo.uniqueId}
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
            {isVerified && loginInfo.instituteName && (
              <p className="institution-info">
                Institution: <strong>{loginInfo.instituteName}</strong>
              </p>
            )}
          </div>

          {/* Staff ID */}
          <div>
            <label htmlFor="staffId">Staff ID</label>
            <input
              onChange={handleChange}
              type="text"
              name="staffId"
              placeholder="Enter your given staff ID..."
              value={loginInfo.staffId}
            />
          </div>

          {/* Password */}
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

          {/* Role */}
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

          {/* Submit */}
          <button className="auth-btn btn" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          <span>
            Forgot password? <Link to="/forgotPassword">Click here</Link>
          </span>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default StaffLogin;
