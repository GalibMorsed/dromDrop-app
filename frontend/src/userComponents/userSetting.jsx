import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

export default function UserSetting() {
  const STORAGE_KEY = "userSettings_v1";

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
  });

  const [passwords, setPasswords] = useState({
    current: "",
    newPass: "",
    confirm: "",
  });

  const [notifications, setNotifications] = useState({
    task1: true,
    task2: false,
    task3: true,
    task4: false,
  });

  const [alert, setAlert] = useState({ type: "", message: "" });

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        if (saved.form) setForm(saved.form);
        if (saved.notifications) setNotifications(saved.notifications);
      }
    } catch (err) {
      // ignore malformed localStorage
    }
  }, []);

  const toggleNotification = (key) =>
    setNotifications((p) => ({ ...p, [key]: !p[key] }));

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handlePassChange = (e) =>
    setPasswords((p) => ({ ...p, [e.target.name]: e.target.value }));

  const isValidEmail = (mail) => /\S+@\S+\.\S+/.test(mail);

  const saveToLocal = () => {
    const payload = { form, notifications, savedAt: Date.now() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  };

  const handleSubmit = (e) => {
    if (e && e.preventDefault) e.preventDefault();

    if (!form.firstName.trim() || !form.lastName.trim()) {
      setAlert({
        type: "info",
        message: "Please provide your first and last name.",
      });
      return;
    }

    if (!isValidEmail(form.email)) {
      setAlert({
        type: "info",
        message: "Please provide a valid email address.",
      });
      return;
    }

    if (passwords.newPass) {
      if (passwords.newPass.length < 6) {
        setAlert({
          type: "info",
          message: "New password must be at least 6 characters.",
        });
        return;
      }
      if (passwords.newPass !== passwords.confirm) {
        setAlert({
          type: "info",
          message: "New password and confirmation do not match.",
        });
        return;
      }
    }

    saveToLocal();
    setPasswords({ current: "", newPass: "", confirm: "" });
    setAlert({ type: "success", message: "Settings saved locally." });
    setTimeout(() => setAlert({ type: "", message: "" }), 10000);
    window.alert(
      "User settings functionality is being improved. Much Additional features and secure backend integration will be available in future updates. Thank you for your understanding."
    );
  };

  const handleCancel = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        if (saved.form) setForm(saved.form);
        if (saved.notifications) setNotifications(saved.notifications);
        setAlert({ type: "info", message: "Reverted to saved settings." });
        setTimeout(() => setAlert({ type: "", message: "" }), 2500);
        return;
      }
    } catch (err) {}

    // Nothing saved: reset to defaults
    setForm({ firstName: "", lastName: "", email: "", phone: "", address: "" });
    setNotifications({ task1: true, task2: false, task3: true, task4: false });
    setAlert({ type: "info", message: "Reset to defaults." });
    setTimeout(() => setAlert({ type: "", message: "" }), 2500);
  };

  return (
    <div className="settings-page">
      <header className="settings-header">
        <Link to="/studentPage" className="home-btn" aria-label="Go home">
          <FaHome />
        </Link>
        <h2>Account Settings</h2>
        <div className="icons">
          <span className="icon" role="img" aria-label="notifications">
            🔔
          </span>
          <span className="icon" role="img" aria-label="profile">
            👤
          </span>
        </div>
      </header>

      <main className="settings-main">
        <section className="settings-container">
          {alert.message && (
            <div
              className={
                alert.type === "success"
                  ? "alert alert-success"
                  : "alert alert-info"
              }
            >
              {alert.message}
            </div>
          )}

          <h3 className="section-title">Account Settings</h3>

          <form className="settings-form" onSubmit={handleSubmit}>
            <div className="settings-card">
              <h3>Edit Profile</h3>

              <div className="form-grid">
                <div className="input-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    id="firstName"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    type="text"
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    id="lastName"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    type="text"
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    type="email"
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="phone">Phone</label>
                  <input
                    id="phone"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    type="tel"
                  />
                </div>

                <div className="input-group full-width">
                  <label htmlFor="address">Address</label>
                  <input
                    id="address"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    type="text"
                  />
                </div>
              </div>
            </div>

            <div className="settings-card">
              <h3>Change Password</h3>
              <div className="form-grid password-inputs">
                <div className="input-group">
                  <label htmlFor="current">Current Password</label>
                  <input
                    id="current"
                    name="current"
                    value={passwords.current}
                    onChange={handlePassChange}
                    type="password"
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="newPass">New Password</label>
                  <input
                    id="newPass"
                    name="newPass"
                    value={passwords.newPass}
                    onChange={handlePassChange}
                    type="password"
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="confirm">Confirm Password</label>
                  <input
                    id="confirm"
                    name="confirm"
                    value={passwords.confirm}
                    onChange={handlePassChange}
                    type="password"
                  />
                </div>
              </div>
            </div>

            <div className="settings-card">
              <h3>Notifications</h3>
              <div className="notifications-list">
                {Object.keys(notifications).map((key, idx) => (
                  <div className="notification-item" key={key}>
                    <div className="notif-content">
                      <strong>{`Notification ${idx + 1}`}</strong>
                      <p className="small">
                        A short description of this notification preference.
                      </p>
                    </div>
                    <label
                      className="toggle-switch"
                      aria-label={`Toggle ${key}`}
                    >
                      <input
                        type="checkbox"
                        checked={notifications[key]}
                        onChange={() => toggleNotification(key)}
                      />
                      <span className="slider round"></span>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="action-buttons">
              <button type="button" className="btn-save" onClick={handleSubmit}>
                Save
              </button>
              <button
                type="button"
                className="btn-cancel"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}
