import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminSection4() {
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState([]);

  // Fake reports for now
  const fakeReports = [
    {
      id: 1,
      staffId: "John Doe",
      date: "2025-08-10",
      hostelName: "Galaxy A",
      totalLaundry: 45,
      extraItems: 5,
      TotalAmount: 7263,
    },
    {
      id: 2,
      staffId: "Emma Smith",
      date: "2025-08-11",
      hostelName: "Galaxy B",
      totalLaundry: 38,
      extraItems: 2,
      TotalAmount: 5000,
    },
    {
      id: 3,
      staffId: "Michael Johnson",
      date: "2025-08-12",
      hostelName: "Galaxy C",
      totalLaundry: 52,
      extraItems: 7,
      TotalAmount: 8000,
    },
  ];

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await axios.get("http://localhost:6060/reports/weekly");
        if (res.data && res.data.length > 0) {
          setReports(res.data);
        } else {
          setReports(fakeReports); // fallback to fake reports
        }
      } catch (err) {
        console.error("Error fetching weekly reports:", err);
        setReports(fakeReports); // fallback
      }
      setLoading(false);
    };

    fetchReports();
  }, []);

  return (
    <div className="section4-container">
      <h2 className="section4-title">Weekly Laundry Reports</h2>
      {loading ? (
        <p className="section4-loading">Loading reports...</p>
      ) : reports.length > 0 ? (
        <div className="section4-list">
          {reports.map((report) => (
            <div key={report.id} className="section4-card">
              <div className="section4-header">
                <span className="section4-date">{report.date}</span>
                <span className="section4-staff">{report.staffId}</span>
              </div>
              <p>
                <strong>Hostel:</strong> {report.hostelName}
              </p>
              <p>
                <strong>Total Laundry:</strong> {report.totalLaundry}
              </p>
              <p>
                <strong>Extra Items:</strong> {report.extraItems}
              </p>
              <div className="section4-footer">
                <span className="amount">
                  <strong>Total Amount:</strong> ₹{report.TotalAmount}
                </span>
                <button className="pay-btn">PAY</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="section4-empty">No reports available.</p>
      )}
    </div>
  );
}
