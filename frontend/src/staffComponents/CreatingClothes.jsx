import React, { useState } from "react";

export default function CreatingClothes() {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [clothes, setClothes] = useState([]);

  const [clothName, setClothName] = useState("");
  const [clothPrice, setClothPrice] = useState("");
  const [clothPhoto, setClothPhoto] = useState("");

  const handleSaveCloth = () => {
    if (!clothName) return;
    const newCloth = {
      id: Date.now(),
      name: clothName,
      price: selectedOption === "extra" ? clothPrice : "Included",
      photo: clothPhoto,
    };
    setClothes([...clothes, newCloth]);
    setClothName("");
    setClothPrice("");
    setClothPhoto("");
    setShowOptions(false);
    setSelectedOption("");
  };

  const handleDelete = (id) => {
    setClothes(clothes.filter((cloth) => cloth.id !== id));
  };

  return (
    <div className="creatingClothes">
      {/* Create Clothes Section */}
      <div className="creatingClothes__card creatingClothes__card--create">
        <h2 className="creatingClothes__title">Create Clothes Items</h2>

        {!showOptions ? (
          <button
            className="creatingClothes__btn creatingClothes__btn--primary"
            onClick={() => setShowOptions(true)}
          >
            Create
          </button>
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
                selectedOption === "extra" ? "creatingClothes__btn--active" : ""
              }`}
              onClick={() => setSelectedOption("extra")}
            >
              Add Extra Clothes with Price
            </button>
          </div>
        )}

        {/* Dynamic Form */}
        {selectedOption && (
          <div className="creatingClothes__form">
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
              onChange={(e) =>
                setClothPhoto(URL.createObjectURL(e.target.files[0]))
              }
            />
            <button
              className="creatingClothes__btn creatingClothes__btn--save"
              onClick={handleSaveCloth}
            >
              Save Cloth
            </button>
          </div>
        )}
      </div>

      {/* Manage Clothes Section */}
      {clothes.length > 0 && (
        <div className="creatingClothes__card creatingClothes__card--list">
          <h2 className="creatingClothes__title">Your Clothes</h2>
          <ul className="creatingClothes__list">
            {clothes.map((cloth) => (
              <li key={cloth.id} className="creatingClothes__item">
                <img
                  src={cloth.photo || "https://via.placeholder.com/50"}
                  alt={cloth.name}
                  className="creatingClothes__photo"
                />
                <div className="creatingClothes__info">
                  <p className="creatingClothes__name">{cloth.name}</p>
                  <p className="creatingClothes__price">Price: {cloth.price}</p>
                </div>
                <button
                  className="creatingClothes__btn creatingClothes__btn--delete"
                  onClick={() => handleDelete(cloth.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
