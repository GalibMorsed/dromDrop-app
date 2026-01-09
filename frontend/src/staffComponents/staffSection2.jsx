import React, { useState, useEffect } from "react";

export default function StaffSection2() {
  const [type, setType] = useState("Pickup");
  const [date, setDate] = useState("");
  const [datesList, setDatesList] = useState([]);

  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    if (!userEmail) return;

    fetch(`https://dromdrop.jiteshroy2207.workers.dev/clothes/getDates?userEmail=${userEmail}`)
      .then((res) => res.json())
      .then((data) => setDatesList(data))
      .catch((err) => console.error(err));
  }, [userEmail]);

  const handleSetDate = async () => {
    if (!date) return alert("Please select a date.");

    if (datesList.find((item) => item.type === type)) {
      alert(`A ${type} date already exists. Delete it first to set a new one.`);
      return;
    }

    try {
      const res = await fetch("https://dromdrop.jiteshroy2207.workers.dev/clothes/addDate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, date, userEmail }),
      });

      const newDate = await res.json();
      setDatesList([...datesList, newDate]);
      setDate("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`https://dromdrop.jiteshroy2207.workers.dev/clothes/deleteDate/${id}`, {
        method: "DELETE",
      });
      setDatesList(datesList.filter((item) => item._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="staff-set">
      <p className="section-title">Set Pickup / Drop Date</p>
      <div className="pick-drop-section">
        <div className="date-picker">
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="Pickup">Pickup</option>
            <option value="Drop">Drop</option>
          </select>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <button className="set-btn" onClick={handleSetDate}>
            Set
          </button>
        </div>

        <div className="dates-list">
          {datesList.length === 0 && <p>No dates set yet.</p>}
          {datesList.map((item, index) => (
            <div
              key={item._id}
              className="date-item"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <span>
                {item.type}: {item.date}
              </span>
              <button
                className="dlt-btn"
                onClick={() => handleDelete(item._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
