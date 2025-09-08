import React, { useState, useEffect } from "react";

export default function TrackSection3() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const dummyPayments = [
      {
        id: 1,
        date: "2025-08-21",
        amount: 750,
        method: "UPI",
        status: "Success",
      },
      {
        id: 2,
        date: "2025-07-10",
        amount: 1200,
        method: "Card",
        status: "Success",
      },
      {
        id: 3,
        date: "2025-06-02",
        amount: 500,
        method: "Cash",
        status: "Pending",
      },
    ];
    setPayments(dummyPayments);
  }, []);

  return (
    <section className="track-section3">
      <h2 className="section-title">💳 Payment History</h2>

      <div className="history-container">
        {payments.length > 0 ? (
          payments.map((payment) => (
            <div className="history-card" key={payment.id}>
              <div className="card-left">
                <p className="date">{payment.date}</p>
                <p className="method">{payment.method}</p>
              </div>
              <div className="card-right">
                <p className="amount">₹{payment.amount}</p>
                <p
                  className={`status ${
                    payment.status === "Success"
                      ? "success"
                      : payment.status === "Pending"
                      ? "pending"
                      : "failed"
                  }`}
                >
                  {payment.status}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="no-history">No payment history found.</p>
        )}
      </div>
      <p className="integration-note">
        ⚠ Payment integration will be updated soon in the website.
      </p>
    </section>
  );
}
