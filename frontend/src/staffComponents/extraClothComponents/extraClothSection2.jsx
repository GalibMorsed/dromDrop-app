import React from "react";

export default function ExtraClothSection2({ submissions, setAllSubmissions }) {
  const handleConfirmPayment = async (id) => {
    const confirmAction = window.confirm(
      "Please confirm that the student has paid for extra/custom clothes before deleting this submission."
    );

    if (!confirmAction) return;

    try {
      const res = await fetch(
        `http://localhost:6060/submission/deleteSubmission/${id}`,
        { method: "DELETE" }
      );

      if (res.ok) {
        setAllSubmissions((prevSubmissions) =>
          prevSubmissions.filter((s) => s._id !== id)
        );
        alert("Payment confirmed and submission removed!");
      } else {
        alert("Error deleting submission.");
      }
    } catch (err) {
      console.error("Error deleting submission:", err);
    }
  };

  return (
    <section className="extra-section2">
      <h2 className="title">Extra & Custom Clothes Requests</h2>

      {submissions.length > 0 ? (
        <div className="report-list">
          {submissions.map((s) => (
            <div className="report-card" key={s._id}>
              <div className="report-header">
                <p>
                  <strong>Student Email:</strong> {s.userEmail}
                </p>
                <p>
                  <strong>Date:</strong> {new Date(s.date).toLocaleDateString()}
                </p>
              </div>

              <p>
                <strong>Extra/Custom Clothes:</strong>{" "}
                {s.clothes
                  .filter((c) => c.status === "Extra" || c.status === "Custom")
                  .map((c) => `${c.clothName} (${c.quantity})`)
                  .join(", ")}
              </p>

              <p>
                <strong>Total Price:</strong> ₹{s.totalSubmissionPrice}
              </p>

              <button
                className="confirm-btn"
                onClick={() => handleConfirmPayment(s._id)}
              >
                Confirm Payment
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-data">No extra/custom clothes requests found.</p>
      )}
    </section>
  );
}
