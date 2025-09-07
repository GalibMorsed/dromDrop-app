import React, { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function TrackNav() {
  const [email, setEmail] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    }

    const fetchAmount = async () => {
      try {
        const response = await fetch(
          `http://localhost:6060/submission/submittedCloth?userEmail=${storedEmail}`
        );
        const submissions = await response.json();
        // submissions is an array, each with totalSubmissionPrice
        const total = Array.isArray(submissions)
          ? submissions.reduce(
              (sum, submission) =>
                sum + (Number(submission.totalSubmissionPrice) || 0),
              0
            )
          : 0;
        setTotalAmount(total);
      } catch (error) {
        console.error("Error fetching amount:", error);
      }
    };

    fetchAmount();
  }, []);

  return (
    <nav className="track-nav">
      {/* Left - Home */}
      <div className="nav-left">
        <Link to="/studentPage">
          <FaHome className="home-icon" />
        </Link>
      </div>

      {/* Middle - User Email */}
      <div className="nav-center">
        <span>Email: {email || "Guest User"}</span>
      </div>

      {/* Right - Total Amount */}
      <div className="nav-right">
        <span>Total Amount: ₹{totalAmount}</span>
      </div>
    </nav>
  );
}
