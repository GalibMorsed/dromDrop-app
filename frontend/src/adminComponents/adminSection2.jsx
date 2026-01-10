import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AdminSection2() {
  const [uniqueId, setUniqueId] = useState("");
  const [createdAt, setCreatedAt] = useState(null);
  const [isCreated, setIsCreated] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputUniqueId, setInputUniqueId] = useState("");

  const email = localStorage.getItem("userEmail");
  const role = localStorage.getItem("role");

  useEffect(() => {
    const fetchUniqueId = async () => {
      try {
        const res = await axios.get(
          `https://dromdrop.onrender.com/uniqueId/getUniqueId?email=${encodeURIComponent(
            email
          )}`
        );

        if (res.data?.uniqueId) {
          setUniqueId(res.data.uniqueId);
          setCreatedAt(res.data.createdAt || null);
          setIsCreated(true);
          setShowWarning(false);
        } else {
          setUniqueId("");
          setCreatedAt(null);
          setIsCreated(false);
          setShowWarning(false);
        }
      } catch (err) {
        console.error("Error fetching unique ID:", err);
      }
    };

    if (email) {
      fetchUniqueId();
    }
  }, [email]);

  const handleSubmit = async () => {
    if (!email || !role) {
      console.error("Missing email or role in localStorage");
      return;
    }
    if (!inputUniqueId.trim()) {
      alert("Please enter a Unique ID");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `https://dromdrop.onrender.com/uniqueId/createUniqueId?email=${encodeURIComponent(
          email
        )}&role=${encodeURIComponent(role)}`,
        { uniqueId: inputUniqueId.trim() }
      );

      if (res.data?.uniqueId) {
        setUniqueId(res.data.uniqueId);
        setCreatedAt(new Date().toISOString());
        setIsCreated(true);
        setShowWarning(false);
      }
    } catch (err) {
      console.error("Error creating unique ID:", err);
      alert(err.response?.data?.error || "Failed to create unique ID");
    }
    setLoading(false);
  };

  return (
    <div className="admin-section2">
      <div className="id-container">
        <h2>Unique ID Management</h2>

        {isCreated ? (
          <div className="unique-id-display">
            <label>Your Unique ID:</label>
            <input
              type="text"
              value={uniqueId}
              readOnly
              className="blocked-field"
            />
            {createdAt && (
              <p>Created on: {new Date(createdAt).toLocaleString()}</p>
            )}
          </div>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter your unique ID"
              value={inputUniqueId}
              onChange={(e) => setInputUniqueId(e.target.value)}
            />
            <p>You don’t have a unique ID yet. You can create one.</p>
            <button
              className="create-btn"
              onClick={() => setShowWarning(true)}
              disabled={!inputUniqueId.trim() || loading}
            >
              Create Unique ID
            </button>

            {showWarning && (
              <div className="warning-overlay">
                <div className="warning-box">
                  <p>
                    ⚠ Once the ID is created, it <strong>cannot</strong> be
                    edited, deleted, changed, or modified. Any attempt will have{" "}
                    <strong>serious consequences</strong>.
                  </p>
                  <div className="warning-actions">
                    <button
                      className="cancel-btn"
                      onClick={() => setShowWarning(false)}
                      disabled={loading}
                    >
                      Cancel
                    </button>
                    <button
                      className="confirm-btn"
                      onClick={handleSubmit}
                      disabled={loading}
                    >
                      {loading ? "Creating..." : "I Understand, Create ID"}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
