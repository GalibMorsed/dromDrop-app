import React, { useState, useEffect } from "react";

export default function StaffSection2() {
  const [type, setType] = useState("Pickup");
  const [date, setDate] = useState("");
  const [datesList, setDatesList] = useState([]);

  const userEmail = localStorage.getItem("userEmail"); // ✅ staff email from localStorage

  // Fetch dates on load (specific to user)
  useEffect(() => {
    if (!userEmail) return;

    fetch(`http://localhost:6060/clothes/getDates?userEmail=${userEmail}`)
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
      const res = await fetch("http://localhost:6060/clothes/addDate", {
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
      await fetch(`http://localhost:6060/clothes/deleteDate/${id}`, {
        method: "DELETE",
      });
      setDatesList(datesList.filter((item) => item._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="staff-set">
      <div className="pick-drop-section">
        <p className="section-title">Set Pickup/Drop Date</p>

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

          <button onClick={handleSetDate}>Set</button>
        </div>

        <div className="dates-list">
          {datesList.length === 0 && <p>No dates set yet.</p>}
          {datesList.map((item) => (
            <div key={item._id} className="date-item">
              <span>
                {item.type}: {item.date}
              </span>
              <button onClick={() => handleDelete(item._id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
