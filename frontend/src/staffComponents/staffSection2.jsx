import React, { useState } from "react";

export default function StaffSection2() {
  const [type, setType] = useState("Pickup");
  const [date, setDate] = useState("");
  const [datesList, setDatesList] = useState([]);

  const handleSetDate = () => {
    if (!date) return alert("Please select a date.");

    // Check if the type already exists
    if (datesList.find((item) => item.type === type)) {
      alert(`A ${type} date already exists. Delete it first to set a new one.`);
      return;
    }

    setDatesList([...datesList, { type, date }]);
    setDate("");
  };

  const handleDelete = (typeToDelete) => {
    setDatesList(datesList.filter((item) => item.type !== typeToDelete));
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
            <div key={item.type} className="date-item">
              <span>
                {item.type}: {item.date}
              </span>
              <button onClick={() => handleDelete(item.type)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
