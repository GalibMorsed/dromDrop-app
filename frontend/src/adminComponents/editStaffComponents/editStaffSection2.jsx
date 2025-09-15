import React from "react";

export default function EditStaffSection2({ activities }) {
  return (
    <section className="editstaff-section2">
      <div className="title-container">
        <h2 className="section-title">User Activity Log</h2>
      </div>
      {activities.length > 0 ? (
        <div className="table-container">
          <table className="activity-table">
            <thead>
              <tr>
                <th>Email</th>
                <th>Role</th>
                <th>Created At</th>
                <th>Last Active</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((act) => (
                <tr
                  key={act._id}
                  className={act.role === "Student/User" ? "user-row" : ""}
                >
                  <td>{act.email}</td>
                  <td>{act.role}</td>
                  <td>
                    {act.createdAt
                      ? new Date(act.createdAt).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td>
                    {act.lastActive
                      ? new Date(act.lastActive).toLocaleString()
                      : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="no-data">No activity records found.</p>
      )}
    </section>
  );
}
