import React from "react";

export default function TrackSection1({ totalAmount, totalClothes }) {
  if (totalAmount <= 500) {
    return null;
  }

  return (
    <section className="track-section1">
      <div className="alert-box">
        <h2 className="alert-title">⚠ Payment Alert</h2>
        <p className="alert-message">
          Your current amount is <strong>₹{totalAmount}</strong> for Total{" "}
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
