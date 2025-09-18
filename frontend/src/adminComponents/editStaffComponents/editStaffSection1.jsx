import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";

export default function EditStaffSection1({ staffs, setStaffs }) {
  const [editingStaff, setEditingStaff] = useState(null);
  const [newPasswords, setNewPasswords] = useState({});

  const handlePasswordChange = (staffId, password) => {
    setNewPasswords((prev) => ({
      ...prev,
      [staffId]: password,
    }));
  };

  const handleResetPassword = async (staffId) => {
    const newPassword = newPasswords[staffId];
    if (!newPassword || newPassword.trim().length < 4) {
      alert("Please enter a new password with at least 4 characters.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const adminEmail = localStorage.getItem("userEmail");

      const res = await fetch(
        `http://localhost:6060/auth/resetStaffPassword/${staffId}?adminEmail=${adminEmail}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ newPassword }),
        }
      );

      const data = await res.json();
      if (res.ok) {
        alert("Password reset successfully!");
        setNewPasswords((prev) => ({ ...prev, [staffId]: "" }));
        setEditingStaff(null);
      } else {
        alert(data.message || "Error resetting password");
      }
    } catch (err) {
      console.error("Error resetting password:", err);
      alert("A server error occurred while resetting the password.");
    }
  };

  const handleDelete = async (id) => {
    const confirmAction = window.confirm(
      "Are you sure you want to delete this staff member? This will also delete all related data (clothes, timings, reports) and cannot be undone."
    );

    if (confirmAction) {
      try {
        const token = localStorage.getItem("token");
        const adminEmail = localStorage.getItem("userEmail");

        const res = await fetch(
          `http://localhost:6060/auth/deleteStaff/${id}?adminEmail=${adminEmail}`,
          {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const data = await res.json();

        if (res.ok) {
          setStaffs(staffs.filter((s) => s._id !== id));
          alert("Staff deleted successfully!");
        } else {
          alert(data.message || "Error deleting staff");
        }
      } catch (err) {
        console.error("Error deleting staff:", err);
      }
    }
  };

  return (
    <section className="editstaff-section1">
      <div className="title-container">
        <h2 className="section-title">Staff Account Management</h2>
      </div>
      <div className="staff-list">
        {staffs.length > 0 ? (
          staffs.map((staff) => (
            <div className="staff-row" key={staff._id}>
              <div className="staff-info">
                <p>
                  <strong>Email:</strong> {staff.email}
                </p>
                <p>
                  <strong>Password:</strong> {staff.password || "Assigned"}
                </p>
              </div>

              <p className="created-date">
                <strong>Created At:</strong>{" "}
                {new Date(staff.createdAt).toLocaleDateString()}
              </p>
              <div className="staff-actions">
                {/* If this staff is in editing mode */}
                {editingStaff === staff._id ? (
                  <div className="reset-password-box">
                    <input
                      type="password"
                      placeholder="New Password"
                      value={newPasswords[staff._id] || ""}
                      onChange={(e) =>
                        handlePasswordChange(staff._id, e.target.value)
                      }
                      className="password-input"
                    />
                    <button
                      className="confirm-btn"
                      onClick={() => handleResetPassword(staff._id)}
                    >
                      Confirm
                    </button>
                    <button
                      className="cancel-btn"
                      onClick={() => setEditingStaff(null)}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    className="edit-btn"
                    onClick={() => setEditingStaff(staff._id)}
                  >
                    Edit
                  </button>
                )}

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(staff._id)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-data">No staff available.</p>
        )}
      </div>
    </section>
  );
}
