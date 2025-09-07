import React, { useEffect, useState } from "react";

export default function TrackSection1() {
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalClothes, setTotalClothes] = useState(0);

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:6060/submission/submittedCloth?userEmail=${storedEmail}`
        );
        const submissions = await response.json();
        // Calculate total amount and total clothes
        const totalAmount = Array.isArray(submissions)
          ? submissions.reduce(
              (sum, sub) => sum + (Number(sub.totalSubmissionPrice) || 0),
              0
            )
          : 0;
        const totalClothes = Array.isArray(submissions)
          ? submissions.reduce(
              (sum, sub) =>
                sum +
                (Array.isArray(sub.clothes)
                  ? sub.clothes
                      .filter(
                        (c) => c.status === "Extra" || c.status === "Custom"
                      )
                      .reduce((cSum, c) => cSum + (Number(c.quantity) || 0), 0)
                  : 0),
              0
            )
          : 0;
        setTotalAmount(totalAmount);
        setTotalClothes(totalClothes);
      } catch (error) {
        console.error("Error fetching track data:", error);
      }
    };

    fetchData();
  }, []);

  // Hide if totalAmount <= 500
  if (totalAmount <= 500) {
    return null;
  }

  return (
    <section className="track-section1">
      <div className="alert-box">
        <h2 className="alert-title">⚠ Payment Alert</h2>
        <p className="alert-message">
          Your current amount is <strong>₹{totalAmount}</strong> for{" "}
          <strong>{totalClothes}</strong> clothes.
        </p>
        <p className="alert-warning">
          After <strong>₹1000</strong>, extra cloth submissions will not be
          considered until you clear the payment. Please make a payment or
          contact the staff for assistance.
        </p>
        <button
          className="pay-btn"
          onClick={() => {
            alert("Payment functionality will be implemented soon!");
          }}
        >
          Pay
        </button>
      </div>
    </section>
  );
}
