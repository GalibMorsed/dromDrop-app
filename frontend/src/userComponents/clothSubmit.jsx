import React, { useEffect, useState } from "react";

export default function SubmitClothes() {
  const [laundryClothes, setLaundryClothes] = useState([]);
  const [extraClothes, setExtraClothes] = useState([]);
  const [selectedItems, setSelectedItems] = useState({});
  const [customCloth, setCustomCloth] = useState("");
  const [customClothes, setCustomClothes] = useState([]);

  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    fetch(
      `http://localhost:6060/clothes/getClothesForUser?userEmail=${userEmail}`
    )
      .then((res) => res.json())
      .then((data) => {
        setLaundryClothes(data.laundry || []);
        setExtraClothes(data.extra || []);
      })
      .catch((err) => console.error("Error fetching clothes:", err));
  }, [userEmail]);

  const handleQuantityChange = (cloth, value) => {
    const quantity = Math.max(0, Math.min(value, cloth.quantity || 1));

    // total laundry clothes selected (excluding extra/custom)
    const totalLaundrySelected = Object.values(selectedItems).reduce(
      (sum, q) => sum + q,
      0
    );

    if (quantity > (selectedItems[cloth._id] || 0)) {
      if (totalLaundrySelected >= 10) {
        alert("You can only select up to 10 clothes.");
        return;
      }
    }

    setSelectedItems((prev) => ({
      ...prev,
      [cloth._id]: quantity,
    }));
  };

  const handleAddCustomCloth = () => {
    if (!customCloth.trim()) return;
    setCustomClothes([...customClothes, { clothName: customCloth }]);
    setCustomCloth("");
  };

  const handleSubmit = () => {
    const finalSelection = {
      laundry: laundryClothes
        .map((c) => ({
          ...c,
          quantity: selectedItems[c._id] || 0,
        }))
        .filter((c) => c.quantity > 0),
      extra: extraClothes.filter((c) => selectedItems[c._id] > 0),
      custom: customClothes,
    };

    if (customClothes.length > 0) {
      alert(
        "You added extra clothes. Please contact staff to confirm if they are receivable."
      );
    }

    console.log("Submitting clothes:", finalSelection);
    // 👉 API call to submit clothes can be added here
  };

  return (
    <div className="submit-clothes">
      <h2 className="title">Select Your Clothes</h2>

      {/* Laundry Clothes */}
      <section>
        <h3>Laundry Clothes</h3>
        <div className="clothes-grid">
          {laundryClothes.map((cloth) => (
            <div key={cloth._id} className="cloth-card">
              {cloth.photo && <img src={cloth.photo} alt={cloth.clothName} />}
              <p>{cloth.clothName}</p>
              <input
                type="number"
                min="0"
                max={cloth.quantity || 1}
                value={selectedItems[cloth._id] || 0}
                onChange={(e) =>
                  handleQuantityChange(cloth, parseInt(e.target.value, 10))
                }
              />
              <span className="available">
                Available: {cloth.quantity || 1}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Extra Clothes */}
      <section>
        <h3>Extra Clothes (With Price)</h3>
        <div className="clothes-grid">
          {extraClothes.map((cloth) => (
            <div key={cloth._id} className="cloth-card">
              {cloth.photo && <img src={cloth.photo} alt={cloth.clothName} />}
              <p>{cloth.clothName}</p>
              <span className="price">₹{cloth.clothPrice}</span>
              <button
                onClick={() =>
                  setSelectedItems((prev) => ({
                    ...prev,
                    [cloth._id]: prev[cloth._id] ? 0 : 1,
                  }))
                }
                className={
                  selectedItems[cloth._id] ? "selected-btn" : "select-btn"
                }
              >
                {selectedItems[cloth._id] ? "Remove" : "Add"}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Add Custom Clothes */}
      <section>
        <h3>Add Extra Clothes (Custom)</h3>
        <div className="custom-add">
          <input
            type="text"
            placeholder="Enter cloth name"
            value={customCloth}
            onChange={(e) => setCustomCloth(e.target.value)}
          />
          <button onClick={handleAddCustomCloth}>Add</button>
        </div>
        <ul>
          {customClothes.map((cloth, i) => (
            <li key={i}>{cloth.clothName}</li>
          ))}
        </ul>
      </section>

      <button className="submit-btn" onClick={handleSubmit}>
        Submit Clothes
      </button>

      {/* Styling */}
      <style>{`
        .clothes-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 1rem;
        }
        .cloth-card {
          background: #fff;
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 0.5rem;
          text-align: center;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
        }
        .cloth-card img {
          width: 100px;
          height: 100px;
          object-fit: cover;
          border-radius: 6px;
          margin-bottom: 0.5rem;
        }
        .cloth-card input {
          width: 60px;
          text-align: center;
          margin-top: 0.5rem;
        }
        .price {
          display: block;
          margin: 0.5rem 0;
          font-weight: bold;
          color: #444;
        }
        .available {
          display: block;
          margin-top: 0.2rem;
          font-size: 0.8rem;
          color: gray;
        }
        .select-btn, .selected-btn {
          padding: 0.3rem 0.6rem;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        .select-btn {
          background: #007bff;
          color: white;
        }
        .selected-btn {
          background: #dc3545;
          color: white;
        }
      `}</style>
    </div>
  );
}
