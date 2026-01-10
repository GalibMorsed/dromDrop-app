import React, { useEffect, useState } from "react";

export default function AdminSection4() {
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState([]);
  const [alert, setAlert] = useState({ type: "", message: "" });

  useEffect(() => {
    const fetchReports = async () => {
      const adminEmail = localStorage.getItem("userEmail");
      try {
        setLoading(true);
        const res = await fetch(
          `https://dromdrop.onrender.com/clothes/adminReports?email=${adminEmail}`
        );
        const data = await res.json();

        if (res.ok) {
          setReports(data);
        } else {
          setAlert({
            type: "error",
            message: data.message || "No reports found",
          });
        }
      } catch (err) {
        console.error("Error fetching reports:", err);
        setAlert({
          type: "error",
          message: "Error fetching reports from server ❌",
        });
      } finally {
        setLoading(false);
        setTimeout(() => setAlert({ type: "", message: "" }), 3000);
      }
    };

    fetchReports();
  }, []);

  return (
    <section className="admin-report">
      <div className="section4-container">
        <h2 className="section4-title">Weekly Laundry Reports</h2>

        {/* Alert */}
        {alert.message && (
          <div className={`alert ${alert.type}`}>{alert.message}</div>
        )}

        {loading ? (
          <p className="section4-loading">Loading reports...</p>
        ) : reports.length > 0 ? (
          <div className="section4-list">
            {reports.map((report) => (
              <div key={report._id} className="section4-card">
                <div className="section4-header">
                  <strong>Dates:</strong>
                  <span className="section4-date">
                    {new Date(report.weekStart).toLocaleDateString()} -{" "}
                    {new Date(report.weekEnd).toLocaleDateString()}
                  </span>
                </div>
                <span className="section4-staff">
                  <strong>Staff Email:</strong> {report.staffEmail}
                </span>
                <p>
                  <strong>Hostel:</strong> {report.hostelName}
                </p>
                <p>
                  <strong>No. of Students:</strong> {report.noStudents}
                </p>
                <p>
                  <strong>No. of Clothes:</strong> {report.noClothes}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={
                      report.status === "Pending"
                        ? "status-pending"
                        : "status-completed"
                    }
                  >
                    {report.status}
                  </span>
                </p>
                {report.remarks && (
                  <p>
                    <strong>Remarks:</strong> {report.remarks}
                  </p>
                )}
                <div className="section4-footer">
                  <span className="amount">
                    <strong>Total Amount:</strong> ₹{report.totalAmount}
                  </span>
                  <button
                    className="pay-btn"
                    onClick={() => {
                      window.alert(
                        "Payment functionality is currently under development. Upon implementation, successful payments will update the status to Completed. Thank you for your understanding."
                      );
                    }}
                  >
                    PAY
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="section4-empty">No reports available.</p>
        )}
      </div>
    </section>
  );
}
