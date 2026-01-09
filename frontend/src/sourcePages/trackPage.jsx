import React, { useState, useEffect } from "react";
import TrackNav from "../userComponents/trackClothComponents/trackNav";
import TrackSection1 from "../userComponents/trackClothComponents/trackSection1";
import TrackSection2 from "../userComponents/trackClothComponents/trackSection2";
import TrackSection3 from "../userComponents/trackClothComponents/trackSection3";

export default function TrackPage() {
  const [email, setEmail] = useState("");
  const [submissions, setSubmissions] = useState([]);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    }

    const fetchData = async () => {
      if (!storedEmail) return;
      try {
        const response = await fetch(
          `https://dromdrop.jiteshroy2207.workers.dev/submission/submittedCloth?userEmail=${storedEmail}`
        );
        const data = await response.json();
        setSubmissions(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching submissions:", error);
        setSubmissions([]);
      }
    };

    const fetchPayments = () => {
      // Using dummy data as there is no payment API endpoint provided, and will be implemented later.
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
    };

    fetchData();
    fetchPayments();
  }, []);

  const totalAmount = submissions.reduce(
    (sum, submission) => sum + (Number(submission.totalSubmissionPrice) || 0),
    0
  );

  const totalClothes = submissions.reduce(
    (sum, sub) =>
      sum +
      (Array.isArray(sub.clothes)
        ? sub.clothes.filter(
            (c) => c.status === "Extra" || c.status === "Custom"
          ).length
        : 0),
    0
  );

  const clothesData = Object.values(
    submissions.reduce(
      (acc, sub) => {
        if (Array.isArray(sub.clothes)) {
          sub.clothes.forEach((c) => {
            if (c.status === "Extra" || c.status === "Custom") {
              acc[c.status].count++;
              acc[c.status].names.push(c.clothName);
            }
          });
        }
        return acc;
      },
      {
        Extra: { type: "Extra", count: 0, names: [] },
        Custom: { type: "Custom", count: 0, names: [] },
      }
    )
  ).filter((item) => item.count > 0);

  return (
    <div>
      <TrackNav email={email} totalAmount={totalAmount} />
      <TrackSection1 totalAmount={totalAmount} totalClothes={totalClothes} />
      <TrackSection2 clothesData={clothesData} totalPrice={totalAmount} />
      <TrackSection3 payments={payments} />
    </div>
  );
}

// This is the page for tracking cloth, which includes the navigation bar and three sections.
// Section 1 shows a payment alert if the total amount exceeds ₹500.
// Section 2 provides a summary of submitted extra and custom clothes.
// Section 3 displays the payment history using dummy data for now.
// Total amount and total clothes are calculated from the fetched submissions.
// Payment history is currently hardcoded as there is no API endpoint for it.
// Alerts are shown for payment functionality, which will be implemented later.
