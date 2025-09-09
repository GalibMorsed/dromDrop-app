import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

export default function UserSetting() {
  const [notifications, setNotifications] = useState({
    task1: true,
    task2: false,
    task3: true,
    task4: false,
  });

  const toggleNotification = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      "We're currently enhancing the User Settings. This feature will be available soon. Thank you for your patience!"
    );
  };

  return (
    <div className="settings-page">
      <header className="settings-header">
        <Link to="/studentPage" className="home-btn">
          <FaHome />
        </Link>
        <h2>Account Settings</h2>
        <div className="icons">
          <span className="icon">🔔</span>
          <span className="icon">👤</span>
        </div>
      </header>

      <section className="settings-container">
        <h3 className="section-title">Account Settings</h3>

        <form className="settings-grid" onSubmit={handleSubmit}>
          {/* Edit Profile */}
          <div className="card">
            <h4>Edit Profile</h4>
            <input type="text" placeholder="First Name" />
            <input type="text" placeholder="Last Name" />
            <input type="email" placeholder="Email Address" />
            <input type="tel" placeholder="Phone Number" />
            <input type="text" placeholder="Address" />
          </div>

          {/* Change Password */}
          <div className="card">
            <h4>Change Password</h4>
            <input type="password" placeholder="Current Password" />
            <input type="password" placeholder="New Password" />
            <input type="password" placeholder="Confirm Password" />
          </div>

          {/* Notifications */}
          <div className="card">
            <h4>Notifications</h4>
            <div className="notifications">
              {Object.keys(notifications).map((key) => (
                <div className="notif-item" key={key}>
                  <div className="text">
                    <strong>Task Assign</strong>
                    <p>Lorem ipsum is a placeholder text for notifications</p>
                  </div>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={notifications[key]}
                      onChange={() => toggleNotification(key)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </form>
        {/* Buttons */}
        <div className="action-buttons">
          <button type="submit" className="save" onClick={handleSubmit}>
            Save
          </button>
          <button type="button" className="cancel">
            Cancel
          </button>
        </div>
      </section>
    </div>
  );
}
