import React, { useState, useEffect } from "react";

export default function CreatingClothes() {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [clothes, setClothes] = useState([]);

  const [clothName, setClothName] = useState("");
  const [clothPrice, setClothPrice] = useState("");
  const [clothPhoto, setClothPhoto] = useState(null);
  const [preview, setPreview] = useState("");

  const staffEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    const fetchClothes = async () => {
      try {
        const res = await fetch(
          `https://dromdrop.jiteshroy2207.workers.dev/clothes/getClothes?email=${staffEmail}`
        );
        const data = await res.json();

        if (data && data.clothes) {
          setClothes(data.clothes);
        } else {
          setClothes([]);
        }
      } catch (err) {
        console.error("Error fetching clothes:", err);
        alert("⚠️ Failed to fetch clothes from server.");
      }
    };
    if (staffEmail) fetchClothes();
  }, [staffEmail]);

  const handleSaveCloth = async (e) => {
    e.preventDefault();

    if (!clothName || !selectedOption || !clothPhoto) {
      alert("⚠️ Please fill all required fields before saving.");
      return;
    }

    const formData = new FormData();
    formData.append("staffEmail", staffEmail);
    formData.append("clothName", clothName);
    formData.append("clothPrice", selectedOption === "extra" ? clothPrice : 0);
    formData.append("selectedOption", selectedOption);
    formData.append("file", clothPhoto);

    try {
      const res = await fetch(`https://dromdrop.jiteshroy2207.workers.dev/clothes/saveCloth`, {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (res.ok && result.clothes) {
        setClothes(result.clothes);
        alert("✅ Cloth saved successfully!");
      } else {
        alert(`❌ Failed to save cloth: ${result.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error saving cloth:", error);
      alert("🚨 Server error while saving cloth.");
    }

    setClothName("");
    setClothPrice("");
    setClothPhoto(null);
    setPreview("");
    setShowOptions(false);
    setSelectedOption("");
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(
        `https://dromdrop.jiteshroy2207.workers.dev/clothes/deleteCloth/${id}?email=${staffEmail}`,
        { method: "DELETE" }
      );

      const result = await res.json();

      if (res.ok && result.clothes) {
        setClothes(result.clothes);
        alert("🗑️ Cloth deleted successfully!");
      } else {
        alert("❌ Failed to delete cloth.");
      }
    } catch (error) {
      console.error("Error deleting cloth:", error);
      alert("🚨 Server error while deleting cloth.");
    }
  };

  const laundryClothes = clothes.filter((c) => c.selectedOption === "laundry");
  const extraClothes = clothes.filter((c) => c.selectedOption === "extra");

  return (
    <div className="cloth-details">
      <div className="creatingClothes">
        <div className="creatingClothes__card creatingClothes__card--create">
          <h2 className="creatingClothes__title">Create Clothes Items</h2>

          {!showOptions ? (
            <div className="creatingClothes__btnWrapper">
              <button
                className="creatingClothes__btn creatingClothes__btn--primary"
                onClick={() => setShowOptions(true)}
              >
                Create
              </button>
            </div>
          ) : (
            <div className="creatingClothes__options">
              <button
                className={`creatingClothes__btn ${
                  selectedOption === "laundry"
                    ? "creatingClothes__btn--active"
                    : ""
                }`}
                onClick={() => setSelectedOption("laundry")}
              >
                Add Laundry Clothes
              </button>
              <button
                className={`creatingClothes__btn ${
                  selectedOption === "extra"
                    ? "creatingClothes__btn--active"
                    : ""
                }`}
                onClick={() => setSelectedOption("extra")}
              >
                Add Extra Clothes (With Price)
              </button>
            </div>
          )}

          {selectedOption && (
            <form className="creatingClothes__form" onSubmit={handleSaveCloth}>
              <input
                type="text"
                placeholder="Cloth Name"
                value={clothName}
                onChange={(e) => setClothName(e.target.value)}
              />
              {selectedOption === "extra" && (
                <input
                  type="number"
                  placeholder="Price"
                  value={clothPrice}
                  onChange={(e) => setClothPrice(e.target.value)}
                />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setClothPhoto(file);
                    setPreview(URL.createObjectURL(file));
                  }
                }}
              />
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="creatingClothes__preview"
                />
              )}
              <button
                type="submit"
                className="creatingClothes__btn creatingClothes__btn--save"
              >
                Save Cloth
              </button>
            </form>
          )}
        </div>

        <h1 className="creatingClothes__historyTitle">
          Created Clothes History
        </h1>
        <div className="creatingClothes__listsWrapper">
          {laundryClothes.length > 0 && (
            <div className="creatingClothes__card creatingClothes__card--list">
              <h2 className="creatingClothes__title">Laundry Clothes</h2>
              <ul className="creatingClothes__list">
                {laundryClothes.map((cloth) => (
                  <li key={cloth._id} className="creatingClothes__item">
                    {cloth.photo && (
                      <img
                        src={cloth.photo}
                        alt={cloth.clothName}
                        className="creatingClothes__photo"
                      />
                    )}
                    <div className="creatingClothes__info">
                      <p className="creatingClothes__name">{cloth.clothName}</p>
                      <p className="creatingClothes__price">Price: Included</p>
                    </div>
                    <button
                      className="creatingClothes__btn creatingClothes__btn--delete"
                      onClick={() => handleDelete(cloth._id)}
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {extraClothes.length > 0 && (
            <div className="creatingClothes__card creatingClothes__card--list">
              <h2 className="creatingClothes__title">
                Clothes Charged (With Price)
              </h2>
              <ul className="creatingClothes__list">
                {extraClothes.map((cloth) => (
                  <li key={cloth._id} className="creatingClothes__item">
                    {cloth.photo && (
                      <img
                        src={cloth.photo}
                        alt={cloth.clothName}
                        className="creatingClothes__photo"
                      />
                    )}
                    <div className="creatingClothes__info">
                      <p className="creatingClothes__name">{cloth.clothName}</p>
                      <p className="creatingClothes__price">
                        Price: ₹{cloth.clothPrice}
                      </p>
                    </div>
                    <button
                      className="creatingClothes__btn creatingClothes__btn--delete"
                      onClick={() => handleDelete(cloth._id)}
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
