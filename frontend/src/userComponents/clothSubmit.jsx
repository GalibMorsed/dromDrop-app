import React, { useEffect, useState } from "react";

export default function SubmitClothes() {
  const [laundryClothes, setLaundryClothes] = useState([]);
  const [extraClothes, setExtraClothes] = useState([]);
  const [selectedItems, setSelectedItems] = useState({});
  const [customCloth, setCustomCloth] = useState("");
  const [customClothes, setCustomClothes] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

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

  const totalLaundrySelected = Object.entries(selectedItems)
    .filter(([id, qty]) => laundryClothes.find((c) => c._id === id))
    .reduce((sum, [_, qty]) => sum + qty, 0);

  const handleQuantityChange = (cloth, value) => {
    const quantity = Math.max(0, isNaN(value) ? 0 : value);
    if (laundryClothes.find((c) => c._id === cloth._id)) {
      const prevQty = selectedItems[cloth._id] || 0;
      const newTotal = totalLaundrySelected - prevQty + quantity;
      if (newTotal > 10) {
        alert("⚠ You cannot select more than 10 laundry clothes.");
        return;
      }
    }
    setSelectedItems((prev) => ({ ...prev, [cloth._id]: quantity }));
  };

  const handleAddCustomCloth = () => {
    if (!customCloth.trim()) return;
    setCustomClothes([...customClothes, { clothName: customCloth }]);
    setCustomCloth("");
  };

  const handleRemoveSelected = (cloth) => {
    if (cloth._id) {
      setSelectedItems((prev) => ({ ...prev, [cloth._id]: 0 }));
    } else {
      setCustomClothes((prev) =>
        prev.filter((c) => c.clothName !== cloth.clothName)
      );
    }
  };

  const selectedLaundry = laundryClothes
    .map((c) => ({ ...c, quantity: selectedItems[c._id] || 0 }))
    .filter((c) => c.quantity > 0);

  const selectedExtra = extraClothes
    .map((c) => ({ ...c, quantity: selectedItems[c._id] || 0 }))
    .filter((c) => c.quantity > 0);

  const totalPrice = selectedExtra.reduce(
    (sum, c) => sum + (c.clothPrice || 0) * (c.quantity || 0),
    0
  );

  const hasSelection =
    selectedLaundry.length > 0 ||
    selectedExtra.length > 0 ||
    customClothes.length > 0;

  const handleSubmit = async () => {
    if (!hasSelection) return;

    setLoading(true);

    const payload = {
      userEmail,
      laundry: selectedLaundry,
      extra: selectedExtra,
      custom: customClothes,
    };

    try {
      const res = await fetch("http://localhost:6060/submission/submitCloth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        setSuccessMessage("✅ Clothes submitted successfully!");
        setSelectedItems({});
        setCustomClothes([]);
      } else {
        alert("❌ Submission failed: " + (data.message || "Unknown error"));
      }
    } catch (err) {
      console.error("Error submitting clothes:", err);
      alert("❌ Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  return (
    <div className="submit-clothes-container">
      <h2 className="page-title">
        <img src="userSecImgs/clothLogo2.png" alt="logo" /> Submit Your Clothes
      </h2>

      {/* Laundry Clothes Table */}
      <section>
        <h3 className="section-title">Laundry Clothes</h3>
        {laundryClothes.length === 0 ? (
          <p>No laundry clothes available.</p>
        ) : (
          <table className="clothes-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Cloth Name</th>
                <th>Select Quantity</th>
              </tr>
            </thead>
            <tbody>
              {laundryClothes.map((cloth) => (
                <tr key={cloth._id}>
                  <td>
                    {cloth.photo && (
                      <img
                        src={cloth.photo}
                        alt={cloth.clothName}
                        className="cloth-img"
                      />
                    )}
                  </td>
                  <td>{cloth.clothName}</td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      value={selectedItems[cloth._id] || 0}
                      onChange={(e) =>
                        handleQuantityChange(
                          cloth,
                          parseInt(e.target.value, 10)
                        )
                      }
                      className="quantity-input"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {totalLaundrySelected >= 10 && (
          <p className="limit-msg">
            ⚠ You have selected maximum 10 laundry clothes
          </p>
        )}
      </section>

      {/* Extra Clothes Table */}
      <section>
        <h3 className="section-title">Extra Clothes (With Price)</h3>
        {extraClothes.length === 0 ? (
          <p>No extra clothes available.</p>
        ) : (
          <table className="clothes-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Cloth Name</th>
                <th>Price</th>
                <th>Select</th>
              </tr>
            </thead>
            <tbody>
              {extraClothes.map((cloth) => (
                <tr key={cloth._id}>
                  <td>
                    {cloth.photo && (
                      <img
                        src={cloth.photo}
                        alt={cloth.clothName}
                        className="cloth-img"
                      />
                    )}
                  </td>
                  <td>{cloth.clothName}</td>
                  <td>₹{cloth.clothPrice}</td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      value={selectedItems[cloth._id] || 0}
                      onChange={(e) =>
                        handleQuantityChange(
                          cloth,
                          parseInt(e.target.value, 10)
                        )
                      }
                      className="quantity-input"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {/* Custom Clothes */}
      <section>
        <h3 className="section-title">Add Extra Clothes (Custom)</h3>
        <div className="custom-add">
          <input
            type="text"
            placeholder="Enter cloth name"
            value={customCloth}
            onChange={(e) => setCustomCloth(e.target.value)}
            className="custom-input"
          />
          <button onClick={handleAddCustomCloth} className="btn-primary">
            Add
          </button>
        </div>
        {customClothes.length > 0 && (
          <ul className="custom-list">
            {customClothes.map((cloth, i) => (
              <li key={i}>{cloth.clothName}</li>
            ))}
          </ul>
        )}
      </section>

      {/* Selected Clothes Table */}
      {hasSelection && (
        <section>
          <h3 className="section-title">✅ Selected Clothes</h3>
          <table className="clothes-table">
            <thead>
              <tr>
                <th>Cloth Name</th>
                <th>Quantity / Status</th>
                <th>Price</th>
                <th>Unselect</th>
              </tr>
            </thead>
            <tbody>
              {selectedLaundry.map((c) => (
                <tr key={c._id}>
                  <td>{c.clothName}</td>
                  <td>{c.quantity}</td>
                  <td>0 ₹</td>
                  <td>
                    <button
                      onClick={() => handleRemoveSelected(c)}
                      className="btn-outline"
                    >
                      ❌
                    </button>
                  </td>
                </tr>
              ))}
              {selectedExtra.map((c) => (
                <tr key={c._id}>
                  <td>{c.clothName}</td>
                  <td>{c.quantity}</td>
                  <td>₹{(c.clothPrice || 0) * (c.quantity || 0)}</td>
                  <td>
                    <button
                      onClick={() => handleRemoveSelected(c)}
                      className="btn-outline"
                    >
                      ❌
                    </button>
                  </td>
                </tr>
              ))}
              {customClothes.map((c, i) => (
                <tr key={i}>
                  <td>{c.clothName}</td>
                  <td>Custom</td>
                  <td>0 ₹</td>
                  <td>
                    <button
                      onClick={() => handleRemoveSelected(c)}
                      className="btn-outline"
                    >
                      ❌
                    </button>
                  </td>
                </tr>
              ))}

              {/* Total Price Row */}
              <tr>
                <td
                  colSpan="2"
                  style={{ textAlign: "right", fontWeight: "600" }}
                >
                  Total Price
                </td>
                <td
                  colSpan="2"
                  style={{ textAlign: "left", fontWeight: "600" }}
                >
                  ₹{totalPrice} - This price will be added to your account
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      )}

      <div className="submit-wrapper">
        <button
          className="btn-submit"
          onClick={handleSubmit}
          disabled={!hasSelection || loading}
        >
          {loading ? "Submitting..." : "Submit Clothes"}
        </button>
      </div>

      {successMessage && <p className="success-msg">{successMessage}</p>}
    </div>
  );
}
