import React from "react";

export default function EditStaffSection2({ activities }) {
  return (
    <section className="editstaff-section2">
      <h2 className="section-title">Activities</h2>
      <div className="activity-list">
        {activities.length > 0 ? (
          activities.map((act) => (
            <div className="activity-card" key={act._id}>
              <p>
                <strong>Email:</strong> {act.email}
              </p>
              <p>
                <strong>Role:</strong> {act.role}
              </p>
              <p>
                <strong>Institution:</strong> {act.instituteName || "N/A"}
              </p>
              <p>
                <strong>Last Active:</strong>{" "}
                {act.lastActive
                  ? new Date(act.lastActive).toLocaleString()
                  : "N/A"}
              </p>
            </div>
          ))
        ) : (
          <p className="no-data">No activity records found.</p>
        )}
      </div>
    </section>
  );
}
