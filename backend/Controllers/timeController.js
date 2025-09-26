const PickupDrop = require("../Models/Timing");
const Staff = require("../Models/Staff");
const User = require("../Models/User");

// Get pickup/drop dates for student
const getUserDates = async (req, res) => {
  try {
    const { studentEmail } = req.query;

    if (!studentEmail) {
      return res.status(400).json({ message: "studentEmail is required" });
    }

    const student = await User.findOne({ email: studentEmail });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const { instituteName } = student;

    const staffList = await Staff.find({ instituteName }).select("email");
    if (!staffList.length) {
      return res
        .status(404)
        .json({ message: "No staff found for this institute" });
    }

    const staffEmails = staffList.map((s) => s.email);

    const dates = await PickupDrop.find({ userEmail: { $in: staffEmails } });

    res.json(dates);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get dates for a staff
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

module.exports = { getDates, getUserDates, addDate, deleteDate };
