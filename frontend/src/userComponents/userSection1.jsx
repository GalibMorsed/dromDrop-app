import React, { useEffect, useState } from "react";

export default function UserSection1() {
  const [dates, setDates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDates = async () => {
      try {
        const studentEmail = localStorage.getItem("userEmail");

        if (!studentEmail) {
          console.warn("No student email found in localStorage");
          setLoading(false);
          return;
        }

        const response = await fetch(
          `https://dromdrop.jiteshroy2207.workers.dev/clothes/getUserDates?studentEmail=${studentEmail}`
        );

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error:", errorData.message);
          setDates([]);
          setLoading(false);
          return;
        }

        const data = await response.json();
        setDates(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching dates:", err);
        setLoading(false);
      }
    };

    fetchDates();
  }, []);

  const isToday = (dateStr) => {
    const date = new Date(dateStr);
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  return (
    <section className="u-sec1">
      <div className="user-section1">
        <h2 className="section-title">Pickup & Drop Alerts</h2>

        {loading ? (
          <p className="loading">Loading pickup/drop dates...</p>
        ) : dates.length === 0 ? (
          <p className="no-dates">No pickup or drop days available.</p>
        ) : (
          <div className="dates-list">
            {dates.map((item, index) => {
              const today = isToday(item.date);
              return (
                <div
                  className={`date-card${today ? " today-alert" : ""}`}
                  key={index}
                >
                  <h3 className="date-type">
                    {item.type}
                    {today && (
                      <span className="alert-icon" title="Today!">
                        <span
                          role="img"
                          aria-label="alert"
                          className="emoji-alert"
                        >
                          🚨
                        </span>
                      </span>
                    )}
                  </h3>
                  <p className="date-value">
                    {new Date(item.date).toDateString()}
                    {today && <span className="today-badge">Today!</span>}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
