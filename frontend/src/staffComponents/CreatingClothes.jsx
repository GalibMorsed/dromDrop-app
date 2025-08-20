import React, { useState, useEffect } from "react";

export default function CreatingClothes() {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [clothes, setClothes] = useState([]);

  const [clothName, setClothName] = useState("");
  const [clothPrice, setClothPrice] = useState("");
  const [clothPhoto, setClothPhoto] = useState(null); // actual file
  const [preview, setPreview] = useState(""); // preview for UI

  const staffEmail = localStorage.getItem("userEmail"); // ✅ from localStorage

  // Fetch clothes from backend
  useEffect(() => {
    const fetchClothes = async () => {
      try {
        const res = await fetch(
          `http://localhost:6060/clothes/getClothes?email=${staffEmail}`
        );
        const data = await res.json();
        setClothes(data);
      } catch (err) {
        console.error("Error fetching clothes:", err);
      }
    };

    if (staffEmail) fetchClothes();
  }, [staffEmail]);

  // Save cloth to backend
  const handleSaveCloth = async () => {
    if (!clothName || !selectedOption || !clothPhoto) return;

    const formData = new FormData();
    formData.append("staffEmail", staffEmail);
    formData.append("clothName", clothName);
    formData.append(
      "clothPrice",
      selectedOption === "extra" ? clothPrice : "Included"
    );
    formData.append("seletedOption", selectedOption); // laundry or extra
    formData.append("file", clothPhoto); // actual file upload

    try {
      const res = await fetch(`http://localhost:6060/clothes/saveCloth`, {
        method: "POST",
        body: formData, // browser sets content-type
      });

      const savedCloth = await res.json();
      setClothes([...clothes, savedCloth]); // add new cloth
    } catch (error) {
      console.error("Error saving cloth:", error);
    }

    // reset form
    setClothName("");
    setClothPrice("");
    setClothPhoto(null);
    setPreview("");
    setShowOptions(false);
    setSelectedOption("");
  };

  // Delete cloth from backend
  const handleDelete = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:6060/clothes/deleteCloth/${id}`,
        { method: "DELETE" }
      );

      if (res.ok) {
        setClothes(clothes.filter((cloth) => cloth._id !== id));
      }
    } catch (error) {
      console.error("Error deleting cloth:", error);
    }
  };

  // split clothes into two categories
  const laundryClothes = clothes.filter((c) => c.type === "laundry");
  const extraClothes = clothes.filter((c) => c.type === "extra");

  return (
    <div className="cloth-details">
      <div className="creatingClothes">
        {/* Create Clothes Section */}
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
                Add Extra Clothes with Price
              </button>
            </div>
          )}

          {/* Dynamic Form */}
          {selectedOption && (
            <form className="creatingClothes__form">
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
                name="avatar"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setClothPhoto(file);
                    setPreview(URL.createObjectURL(file)); // preview
                  }
                }}
              />
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  style={{ width: "80px", marginTop: "10px" }}
                />
              )}
              <button
                className="creatingClothes__btn creatingClothes__btn--save"
                onClick={handleSaveCloth}
              >
                Save Cloth
              </button>
            </form>
          )}
        </div>

        <div className="creatingClothes__listsWrapper">
          {/* Laundry Clothes Section */}
          {laundryClothes.length > 0 && (
            <div className="creatingClothes__card creatingClothes__card--list">
              <h2 className="creatingClothes__title">Laundry Clothes</h2>
              <ul className="creatingClothes__list">
                {laundryClothes.map((cloth) => (
                  <li key={cloth._id} className="creatingClothes__item">
                    <img
                      src={`http://localhost:5000/api/clothes/${cloth._id}`}
                      alt={cloth.name}
                      className="creatingClothes__photo"
                    />
                    <div className="creatingClothes__info">
                      <p className="creatingClothes__name">{cloth.name}</p>
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

          {/* Extra Clothes Section */}
          {extraClothes.length > 0 && (
            <div className="creatingClothes__card creatingClothes__card--list">
              <h2 className="creatingClothes__title">
                Clothes Charged (With Price)
              </h2>
              <ul className="creatingClothes__list">
                {extraClothes.map((cloth) => (
                  <li key={cloth._id} className="creatingClothes__item">
                    <img
                      src={`http://localhost:5000/api/clothes/${cloth._id}`}
                      alt={cloth.name}
                      className="creatingClothes__photo"
                    />
                    <div className="creatingClothes__info">
                      <p className="creatingClothes__name">{cloth.name}</p>
                      <p className="creatingClothes__price">
                        Price: {cloth.price}
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
