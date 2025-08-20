const Cloth = require("../Models/Clothes");

// Save a cloth with image
const saveCloth = async (req, res) => {
  try {
    const { staffEmail, selectedOption, clothName, clothPrice } = req.body;

    if (!staffEmail || !selectedOption || !clothName) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newCloth = new Cloth({
      staffEmail,
      selectedOption,
      clothName,
      clothPrice,
      photo: req.file
        ? { data: req.file.buffer, contentType: req.file.mimetype }
        : null,
    });

    await newCloth.save();
    res
      .status(201)
      .json({ message: "Cloth saved successfully", cloth: newCloth });
  } catch (err) {
    console.error("Error saving cloth:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Fetch clothes for staff
const getClothes = async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ message: "Staff email required" });
    }

    const clothes = await Cloth.find({ staffEmail: email });

    // convert photo buffer → base64 string for frontend
    const formatted = clothes.map((cloth) => ({
      _id: cloth._id,
      email: cloth.email,
      clothType: cloth.clothType,
      name: cloth.name,
      price: cloth.price,
      photo: cloth.photo?.data
        ? `data:${cloth.photo.contentType};base64,${cloth.photo.data.toString(
            "base64"
          )}`
        : null,
      createdAt: cloth.createdAt,
    }));

    res.status(200).json(formatted);
  } catch (err) {
    console.error("Error fetching clothes:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete cloth
const deleteCloth = async (req, res) => {
  try {
    const { id } = req.params;
    const cloth = await Cloth.findByIdAndDelete(id);

    if (!cloth) {
      return res.status(404).json({ message: "Cloth not found" });
    }

    res.status(200).json({ message: "Cloth deleted successfully" });
  } catch (err) {
    console.error("Error deleting cloth:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { saveCloth, getClothes, deleteCloth };
