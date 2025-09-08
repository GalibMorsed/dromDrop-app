import React, { useEffect, useState } from "react";

export default function TrackSection2() {
  const [clothesData, setClothesData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    const fetchClothes = async () => {
      try {
        const response = await fetch(
          `http://localhost:6060/submission/submittedCloth?userEmail=${storedEmail}`
        );
        const submissions = await response.json();

        let clothesMap = {
          Extra: { type: "Extra", count: 0, names: [] },
          Custom: { type: "Custom", count: 0, names: [] },
        };
        let totalPrice = 0;

        if (Array.isArray(submissions)) {
          submissions.forEach((sub) => {
            totalPrice += Number(sub.totalSubmissionPrice) || 0;
            if (Array.isArray(sub.clothes)) {
              clothesMap["Extra"].count += sub.clothes.filter(
                (c) => c.status === "Extra"
              ).length;
              clothesMap["Extra"].names.push(
                ...sub.clothes
                  .filter((c) => c.status === "Extra")
                  .map((c) => c.clothName)
              );
              clothesMap["Custom"].count += sub.clothes.filter(
                (c) => c.status === "Custom"
              ).length;
              clothesMap["Custom"].names.push(
                ...sub.clothes
                  .filter((c) => c.status === "Custom")
                  .map((c) => c.clothName)
              );
            }
          });
        }

        const clothesData = Object.values(clothesMap).filter(
          (item) => item.count > 0
        );
        setClothesData(clothesData);
        setTotalPrice(totalPrice);
      } catch (error) {
        console.error("Error fetching clothes data:", error);
      }
    };

    fetchClothes();
  }, []);

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
