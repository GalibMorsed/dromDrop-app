import React from "react";

export default function EditStaffSection2({ activities }) {
  const staffData = activities.filter((act) => act.role === "Staff");
  const studentData = activities.filter(
    (act) =>
      act.role === "Student" ||
      act.role === "User" ||
      act.role === "Student/User"
  );

  const renderTable = (data, title) => (
    <div className="data-card">
      <h3 className="data-title">{title}</h3>
      {data.length > 0 ? (
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
              {data.map((act) => (
                <tr key={act._id}>
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
        <p className="no-data">No records found for {title.toLowerCase()}.</p>
      )}
    </div>
  );

  return (
    <section className="editstaff-section2">
      <div className="title-container">
        <h2 className="section-title">User Activity Log</h2>
      </div>

      <div className="data-sections">
        {renderTable(staffData, "Staff Data")}
        {renderTable(studentData, "Student Data")}
      </div>
    </section>
  );
}
