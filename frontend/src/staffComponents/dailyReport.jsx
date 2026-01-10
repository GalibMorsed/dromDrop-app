import React, { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function DailyReport() {
  const [submissions, setSubmissions] = useState([]);
  const staffEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const res = await fetch(
          `https://dromdrop.onrender.com/submission/getSubmissionsForStaff?staffEmail=${staffEmail}`
        );
        const data = await res.json();
        setSubmissions(data);
      } catch (err) {
        console.error("Error fetching submissions:", err);
      }
    };

    fetchSubmissions();
  }, [staffEmail]);

  const handleCompleteLaundry = async (id) => {
    const confirmAction = window.confirm(
      "Please verify that the student has received their clothes and that all payments for extra or custom items have been settled before completing this action."
    );

    if (!confirmAction) return;

    try {
      const res = await fetch(
        `https://dromdrop.onrender.com/submission/deleteSubmission/${id}`,
        { method: "DELETE" }
      );

      if (res.ok) {
        setSubmissions(submissions.filter((s) => s._id !== id));
        alert("Submission deleted successfully!");
      } else {
        alert("Error deleting submission.");
      }
    } catch (err) {
      console.error("Error deleting submission:", err);
    }
  };

  return (
    <div className="sec-daily-report">
      <nav className="daily-report-nav">
        {/* Left - Home */}
        <div className="report-nav-left">
          <Link to="/staffPage">
            <FaHome className="home-icon" />
          </Link>
        </div>
        {/* Middle - Staff Email */}
        <div className="report-nav-center">
          <span>Email: {staffEmail || "Guest User"}</span>
        </div>
        {/* Right - Total Submissions */}
        <div className="report-nav-right">
          <span>Total Laundry Request: {submissions.length}</span>
        </div>
      </nav>

      {/* ✅ Daily Report Section */}
      <section className="daily-report">
        <h2 className="title">Daily Laundry Submission Report</h2>

        {submissions.length > 0 ? (
          <div className="report-list">
            {submissions.map((submission) => (
              <div className="report-card" key={submission._id}>
                <div className="report-header">
                  <p>
                    <strong>Student Email:</strong> {submission.userEmail}
                  </p>
                  <p>
                    <strong>Submitted Date:</strong>{" "}
                    {new Date(submission.date).toLocaleDateString()}
                  </p>
                </div>

                <p>
                  <strong>Total Clothes:</strong>{" "}
                  {submission.clothes.reduce((sum, c) => sum + c.quantity, 0)}
                </p>

                <p>
                  <strong>Types of Clothes:</strong>{" "}
                  {submission.clothes.map((c) => c.selectedOption).join(", ")}
                </p>

                <p>
                  <strong>Cloth Names:</strong>{" "}
                  {submission.clothes
                    .map((c) => `${c.clothName} (${c.quantity})`)
                    .join(", ")}
                </p>

                <p>
                  <strong>Total Price:</strong> ₹
                  {submission.totalSubmissionPrice}
                </p>

                <button
                  className="complete-btn"
                  onClick={() => handleCompleteLaundry(submission._id)}
                >
                  Complete Laundry
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-reports">No laundry submissions available.</p>
        )}
      </section>
    </div>
  );
}
