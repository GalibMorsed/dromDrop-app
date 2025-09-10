import React from "react";

export default function ExtraClothSection3() {
  const dummyPayments = [
    {
      id: 1,
      email: "student1@example.com",
      amount: 750,
      date: "2025-09-01",
    },
    {
      id: 2,
      email: "student2@example.com",
      amount: 1200,
      date: "2025-09-03",
    },
    {
      id: 3,
      email: "student3@example.com",
      amount: 950,
      date: "2025-09-05",
    },
  ];

  return (
    <section className="extra-section3">
      <h2 className="title">Payment History</h2>
      <p className="info">
        ⚠ Payment integration will be available soon on the website. For now,
        here is a dummy report of payments made by students for extra or custom
        clothes.
      </p>

      <div className="table-container">
        <table className="report-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Amount Paid</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {dummyPayments.map((p) => (
              <tr key={p.id}>
                <td>{p.email}</td>
                <td>₹{p.amount}</td>
                <td>{new Date(p.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
