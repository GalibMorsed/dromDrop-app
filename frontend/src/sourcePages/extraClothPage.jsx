import React, { useState, useEffect } from "react";
import ExtraClothNav from "../staffComponents/extraClothComponents/extraClothNav";
import ExtraClothSection1 from "../staffComponents/extraClothComponents/extraClothSection1";
import ExtraClothSection2 from "../staffComponents/extraClothComponents/extraClothSection2";
import ExtraClothSection3 from "../staffComponents/extraClothComponents/extraClothSection3";

export default function ExtraClothPage() {
  const [allSubmissions, setAllSubmissions] = useState([]);
  const staffEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    if (!staffEmail) return;

    const fetchSubmissions = async () => {
      try {
        const res = await fetch(
          `https://dromdrop.onrender.com/submission/getSubmissionsForStaff?staffEmail=${staffEmail}`
        );
        const data = await res.json();
        setAllSubmissions(data);
      } catch (err) {
        console.error("Error fetching submissions:", err);
      }
    };

    fetchSubmissions();
  }, [staffEmail]);

  const extraOrCustomSubmissions = allSubmissions.filter((s) =>
    s.clothes.some((c) => c.status === "Extra" || c.status === "Custom")
  );

  const userTotals = allSubmissions.reduce((acc, submission) => {
    const { userEmail, totalSubmissionPrice } = submission;
    acc[userEmail] = (acc[userEmail] || 0) + totalSubmissionPrice;
    return acc;
  }, {});

  const usersWithAmountAbove500 = Object.keys(userTotals).filter(
    (email) => userTotals[email] > 500
  );

  const submissionsFromUsersAbove500 = allSubmissions.filter((s) =>
    usersWithAmountAbove500.includes(s.userEmail)
  );

  return (
    <div>
      <ExtraClothNav
        staffEmail={staffEmail}
        totalRequests={extraOrCustomSubmissions.length}
      />
      <ExtraClothSection1
        submissions={submissionsFromUsersAbove500}
        userTotals={userTotals}
      />
      <ExtraClothSection2
        submissions={extraOrCustomSubmissions}
        setAllSubmissions={setAllSubmissions}
      />
      <ExtraClothSection3 />
    </div>
  );
}

// This is the page for the extra cloth report, which includes the navigation bar and three sections.

// It fetches all submissions assigned to the logged-in staff member and filters them to find submissions with "Extra" or "Custom" clothes.

// It also calculates the total submission price for each user and identifies users whose total amount across all submissions exceeds 500, displaying all their submissions in Section 1. Sections 2 and 3 handle other aspects of the extra cloth report.
// The navigation bar displays the total number of extra or custom cloth requests assigned to the staff member.
