import React, { useState } from "react";

const ReadMoreCell = ({ text, maxLength = 60 }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!text || text.length <= maxLength) {
    return <span>{text || "-"}</span>;
  }

  return (
    <span>
      {isExpanded ? text : `${text.substring(0, maxLength)}...`}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          background: "none",
          border: "none",
          color: "#92400e",
          cursor: "pointer",
          padding: "0",
          marginLeft: "5px",
          fontWeight: "bold",
          textDecoration: "underline",
        }}
      >
        {isExpanded ? "Read Less" : "Read More"}
      </button>
    </span>
  );
};

export default function ExtraClothSection1({ submissions, userTotals }) {
  // Group submissions by user email to show one row per user
  const submissionsByUser = submissions.reduce((acc, submission) => {
    const { userEmail } = submission;
    if (!acc[userEmail]) {
      acc[userEmail] = [];
    }
    acc[userEmail].push(submission);
    return acc;
  }, {});
  return (
    <section className="extra-section1">
      <h2 className="title">Students with Total Amount Above ₹500</h2>

      {submissions.length > 0 ? (
        <div className="table-container">
          <table className="report-table">
            <thead>
              <tr>
                <th>Email</th>
                <th>Extra/Custom Clothes (Quantity)</th>
                <th>Submission Prices</th>
                <th>User Total Due</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(submissionsByUser).map(
                ([userEmail, userSubmissions]) => {
                  // Aggregate details from all submissions for the user
                  const allExtraClothes = userSubmissions.flatMap((s) =>
                    s.clothes.filter(
                      (c) => c.status === "Extra" || c.status === "Custom"
                    )
                  );

                  const clothDetails = allExtraClothes
                    .map((c) => `${c.clothName} (${c.quantity})`)
                    .join(", ");
                  const submissionPrices = userSubmissions
                    .map((s) => `₹${s.totalSubmissionPrice}`)
                    .join(", ");

                  return (
                    <tr key={userEmail}>
                      <td>{userEmail}</td>
                      <td>
                        <ReadMoreCell text={clothDetails} />
                      </td>
                      <td>{submissionPrices}</td>
                      <td>₹{userTotals[userEmail]}</td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="no-data">No students found with amount above ₹500.</p>
      )}
    </section>
  );
}
