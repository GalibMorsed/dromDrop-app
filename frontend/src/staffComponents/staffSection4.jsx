import React, { useEffect, useState } from "react";
import axios from "axios";

export default function StaffSection4() {
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState([]);

  const staffEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await axios.get(
          `https://dromdrop.onrender.com/clothes/staffReports/${staffEmail}`
        );
        if (res.data && res.data.length > 0) {
          setReports(res.data);
        } else {
          setReports([]);
        }
      } catch (err) {
        console.error("Error fetching staff reports:", err);
        setReports([]);
      }
      setLoading(false);
    };

    if (staffEmail) {
      fetchReports();
    }
  }, [staffEmail]);

  return (
    <section className="report">
      <div className="staffReports-container">
        <h2 className="staffReports-title">My Report History</h2>

        {loading ? (
          <p className="staffReports-loading">Loading reports...</p>
        ) : reports.length > 0 ? (
          <div className="staffReports-list">
            {reports.map((report, index) => (
              <div key={index} className="staffReports-card">
                <div className="staffReports-header">
                  <span className="staffReports-date">
                    {new Date(report.weekStart).toLocaleDateString()} -{" "}
                    {new Date(report.weekEnd).toLocaleDateString()}
                  </span>
                  <span className="staffReports-hostel">
                    {" "}
                    <strong>Hostel:</strong> {report.hostelName}
                  </span>
                </div>
                <p>
                  <strong>Total Laundry:</strong> {report.noStudents}
                </p>
                <p>
                  <strong>Status :</strong> {report.status}
                </p>
                <div className="staffReports-footer">
                  <span className="staffReports-amount">
                    <strong>Total Amount:</strong> ₹{report.totalAmount}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="staffReports-empty">No reports found.</p>
        )}
      </div>
    </section>
  );
}
