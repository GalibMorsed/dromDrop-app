import React, { useState } from "react";

export default function EditStaffSection1({ staffs, setStaffs }) {
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
        handlePasswordChange(staffId, "");
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
      "Are you sure you want to delete this staff access?"
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
      <h2 className="section-title">Created Staff's</h2>
      <div className="staff-grid">
        {staffs.length > 0 ? (
          staffs.map((staff) => (
            <div className="staff-card" key={staff._id}>
              <p>
                <strong>Staff Email:</strong> {staff.email}
              </p>
              <p>
                <strong>Password:</strong> {staff.password || "Assigned"}
              </p>
              <p>
                <strong>Institution:</strong> {staff.instituteName || "N/A"}
              </p>
              <p>
                <strong>Created At:</strong>{" "}
                {new Date(staff.createdAt).toLocaleDateString()}
              </p>
              <div className="reset-password-form">
                <p>
                  <strong>Reset Staff Password:</strong>
                </p>
                <input
                  type="password"
                  placeholder="New Password"
                  className="password-input"
                  value={newPasswords[staff._id] || ""}
                  onChange={(e) =>
                    handlePasswordChange(staff._id, e.target.value)
                  }
                />
                <button
                  className="reset-btn"
                  onClick={() => handleResetPassword(staff._id)}
                >
                  Reset Password
                </button>
              </div>
              <button
                className="delete-btn"
                onClick={() => handleDelete(staff._id)}
              >
                Delete Access
              </button>
            </div>
          ))
        ) : (
          <p className="no-data">No staff available.</p>
        )}
      </div>
    </section>
  );
}
