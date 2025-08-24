const PickupDrop = require("../Models/Timing");

// Get dates for a staff (by userEmail)
const getDates = async (req, res) => {
  try {
    const { userEmail } = req.query;
    if (!userEmail) {
      return res.status(400).json({ message: "userEmail is required" });
    }
    const dates = await PickupDrop.find({ userEmail });
    res.json(dates);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add new date
const addDate = async (req, res) => {
  try {
    const { type, date, userEmail } = req.body;

    if (!userEmail) {
      return res.status(400).json({ message: "userEmail is required" });
    }

    // Prevent duplicate Pickup/Drop for the same staff
    const existing = await PickupDrop.findOne({ type, userEmail });
    if (existing) {
      return res.status(400).json({ message: `${type} date already exists` });
    }

    const newDate = new PickupDrop({ type, date, userEmail });
    await newDate.save();
    res.status(201).json(newDate);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete date
const deleteDate = async (req, res) => {
  try {
    const { id } = req.params;
    await PickupDrop.findByIdAndDelete(id);
    res.json({ message: "Date deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getDates, addDate, deleteDate };
