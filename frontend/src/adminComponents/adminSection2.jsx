import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AdminSection2() {
  const [uniqueId, setUniqueId] = useState("");
  const [isCreated, setIsCreated] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [loading, setLoading] = useState(false);

  const email = localStorage.getItem("userEmail");
  const role = localStorage.getItem("role");

  // Fetch unique ID if exists
  useEffect(() => {
    const fetchUniqueId = async () => {
      try {
        const res = await axios.get(
          "http://localhost:6060/uniqueId/verifyUniqueId",
          { email } // backend uses email for verification
        );

        if (res.data?.uniqueId) {
          setUniqueId(res.data.uniqueId);
          setIsCreated(true);
        }
      } catch (err) {
        console.error("Error fetching unique ID:", err);
      }
    };

    if (email) {
      fetchUniqueId();
    }
  }, [email]);

  // Create new unique ID
  const handleSubmit = async () => {
    if (!email || !role) {
      console.error("Missing email or role in localStorage");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:6060/uniqueId/createUniqueId",
        { email, role } // send these instead of token
      );

      if (res.data?.uniqueId) {
        setUniqueId(res.data.uniqueId);
        setIsCreated(true);
      }
    } catch (err) {
      console.error("Error creating unique ID:", err);
    }
    setLoading(false);
    setShowWarning(false);
  };

  return (
    <div className="admin-section2">
      <h2>Unique ID Management</h2>

      {isCreated ? (
        <div className="unique-id-display">
          <label>Your Unique ID</label>
          <input
            type="text"
            value={uniqueId}
            readOnly
            className="blocked-field"
          />
        </div>
      ) : (
        <>
          <button className="create-btn" onClick={() => setShowWarning(true)}>
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
  );
}
