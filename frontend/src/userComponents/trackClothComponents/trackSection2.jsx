import React from "react";

export default function TrackSection2({ clothesData = [], totalPrice = 0 }) {
  return (
    <section className="track-section2">
      <h2 className="section-title">
        📋 Summary of Your Submitted Extra Clothes
      </h2>

      <div className="table-container">
        <table className="clothes-table">
          <thead>
            <tr>
              <th>Cloth Type</th>
              <th>Count</th>
              <th>Names</th>
            </tr>
          </thead>
          <tbody>
            {clothesData.length > 0 ? (
              clothesData.map((item, index) => (
                <tr key={index}>
                  <td>{item.type}</td>
                  <td>{item.count}</td>
                  <td>{item.names.length > 0 ? item.names.join(", ") : "-"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">
                  No extra or custom clothes have been submitted yet.
                </td>
              </tr>
            )}
            <tr className="total-row">
              <td colSpan="2" className="total-label">
                Total Price
              </td>
              <td className="total-value">₹{totalPrice}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="payment-section">
        <p className="info-text">
          Please review your submission carefully. Additional charges may apply
          for extra or custom clothes. For custom clothes, confirm the price
          with a staff member. Proceed to payment to finalize your laundry
          submission.
        </p>
        <button
          className="pay-btn-2"
          onClick={() => {
            alert("Payment functionality will be available soon.");
          }}
        >
          💳 Proceed to Payment
        </button>
      </div>
    </section>
  );
}
