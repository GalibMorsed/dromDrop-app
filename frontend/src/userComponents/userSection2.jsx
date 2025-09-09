import React from "react";
import { useNavigate } from "react-router-dom";

export default function UserSection2() {
  const navigate = useNavigate();

  return (
    <section className="u-sec2">
      <div className="user-section2">
        <h2 className="user2-title">
          <img src="userSecImgs/clothLogo1.png" alt="logo" />
          Submit Weekly Cloth Drops
        </h2>
        <div className="content">
          <p className="desc" style={{ margin: "1em 0", color: "#475569" }}>
            Keep your wardrobe fresh and organized! Submit your weekly cloth
            drop to ensure timely cleaning and pickup. It's quick and easy—just
            click below to get started.
          </p>
          <ul
            className="tips"
            style={{
              marginBottom: "1em",
              paddingLeft: "1.2em",
              color: "#64748b",
              fontSize: "0.98em",
            }}
          >
            <li>
              ✔️ Make sure to check your pickup/drop schedule before submitting.
            </li>
            <li>✔️ Only clean clothes should be submitted for drop.</li>
            <li>✔️ You can track your submission status in your dashboard.</li>
          </ul>
          <button
            className="create-btn"
            onClick={() => navigate("/clothSubmit")}
            style={{
              fontWeight: "bold",
              fontSize: "1.1em",
              padding: "0.7em 2em",
            }}
          >
            Create Drop
          </button>
        </div>
      </div>
    </section>
  );
}
