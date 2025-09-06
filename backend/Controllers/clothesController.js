const Cloth = require("../Models/Clothes");
const Reports = require("../Models/Reports");
const Staff = require("../Models/Staff");
const Admin = require("../Models/Admin");
const User = require("../Models/User");

// Save a cloth with image
const saveCloth = async (req, res) => {
  try {
    const { staffEmail, selectedOption, clothName, clothPrice } = req.body;

    if (!staffEmail || !selectedOption || !clothName) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const clothData = {
      selectedOption,
      clothName,
      clothPrice,
      photo: req.file
        ? { data: req.file.buffer, contentType: req.file.mimetype }
        : null,
    };

    let staffClothes = await Cloth.findOne({ staffEmail });

    if (!staffClothes) {
      staffClothes = new Cloth({
        staffEmail,
        clothes: [clothData],
      });
    } else {
      staffClothes.clothes.push(clothData);
    }

    await staffClothes.save();

    // Format clothes array for frontend
    const formatted = staffClothes.clothes.map((cloth) => ({
      _id: cloth._id,
      selectedOption: cloth.selectedOption,
      clothName: cloth.clothName,
      clothPrice: cloth.clothPrice,
      photo: cloth.photo?.data
        ? `data:${cloth.photo.contentType};base64,${cloth.photo.data.toString(
            "base64"
          )}`
        : null,
      createdAt: cloth.createdAt,
    }));

    res.status(201).json({
      message: "Cloth saved successfully",
      clothes: formatted,
    });
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

    const staffClothes = await Cloth.findOne({ staffEmail: email });

    if (!staffClothes) {
      return res.status(200).json({ clothes: [] });
    }

    // Convert photo buffer → base64
    const formatted = staffClothes.clothes.map((cloth) => ({
      _id: cloth._id,
      selectedOption: cloth.selectedOption,
      clothName: cloth.clothName,
      clothPrice: cloth.clothPrice,
      photo: cloth.photo?.data
        ? `data:${cloth.photo.contentType};base64,${cloth.photo.data.toString(
            "base64"
          )}`
        : null,
      createdAt: cloth.createdAt,
    }));

    res.status(200).json({ clothes: formatted });
  } catch (err) {
    console.error("Error fetching clothes:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete cloth
const deleteCloth = async (req, res) => {
  try {
    const staffEmail = req.query.email;
    const clothId = req.params.id;

    const staffClothes = await Cloth.findOne({ staffEmail });
    if (!staffClothes) {
      return res.status(404).json({ message: "Staff not found" });
    }

    staffClothes.clothes = staffClothes.clothes.filter(
      (c) => c._id.toString() !== clothId
    );

    await staffClothes.save();

    // Format clothes array for frontend
    const formatted = staffClothes.clothes.map((cloth) => ({
      _id: cloth._id,
      selectedOption: cloth.selectedOption,
      clothName: cloth.clothName,
      clothPrice: cloth.clothPrice,
      photo: cloth.photo?.data
        ? `data:${cloth.photo.contentType};base64,${cloth.photo.data.toString(
            "base64"
          )}`
        : null,
      createdAt: cloth.createdAt,
    }));

    res.status(200).json({
      message: "Cloth deleted successfully",
      clothes: formatted,
    });
  } catch (err) {
    console.error("Error deleting cloth:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Staff creates report
const createReport = async (req, res) => {
  try {
    const {
      hostelName,
      noStudents,
      weekStart,
      weekEnd,
      noClothes,
      totalAmount,
      status,
      remarks,
      staffEmail,
    } = req.body;

    const staff = await Staff.findOne({ email: staffEmail });
    if (!staff) {
      return res.status(404).json({ message: "Staff not found" });
    }

    const existing = await Reports.findOne({
      staffEmail,
      weekStart,
      weekEnd,
      hostelName,
    });

    if (existing) {
      return res.status(400).json({
        message:
          "Report already exists for this hostel on the same pickup & drop dates ❌",
      });
    }

    const report = new Reports({
      hostelName,
      noStudents,
      weekStart,
      weekEnd,
      noClothes,
      totalAmount,
      status,
      remarks,
      staffEmail,
      instituteName: staff.instituteName,
    });

    await report.save();

    res
      .status(201)
      .json({ message: "Report submitted successfully ✅", report });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error ❌" });
  }
};

const getReportsForAdmin = async (req, res) => {
  try {
    const { email } = req.query;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const reports = await Reports.find({
      instituteName: admin.institution,
    }).sort({ createdAt: -1 });

    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reports", error });
  }
};

const getReportsByStaff = async (req, res) => {
  try {
    const { email } = req.params;

    const staff = await Staff.findOne({ email });
    if (!staff) {
      return res.status(404).json({ message: "Staff not found" });
    }

    const reports = await Reports.find({ staffEmail: email }).sort({
      createdAt: -1,
    });

    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: "Error fetching staff reports", error });
  }
};

// Fetch clothes for user
const getClothesForUser = async (req, res) => {
  try {
    const { userEmail } = req.query;

    if (!userEmail) {
      return res.status(400).json({ message: "userEmail is required" });
    }

    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const staff = await Staff.find({ instituteName: user.instituteName });
    if (!staff || staff.length === 0) {
      return res
        .status(404)
        .json({ message: "No staff found for this institution" });
    }

    const staffEmails = staff.map((s) => s.email);

    const clothesDocs = await Cloth.find({ staffEmail: { $in: staffEmails } });

    const laundry = [];
    const extra = [];

    clothesDocs.forEach((doc) => {
      doc.clothes.forEach((cloth) => {
        const clothData = {
          _id: cloth._id,
          clothName: cloth.clothName,
          selectedOption: cloth.selectedOption,
          clothPrice: cloth.clothPrice || null,
          photo:
            cloth.photo && cloth.photo.data
              ? `data:${
                  cloth.photo.contentType
                };base64,${cloth.photo.data.toString("base64")}`
              : null,
        };

        if (cloth.selectedOption === "laundry") {
          laundry.push(clothData);
        } else {
          extra.push(clothData);
        }
      });
    });

    res.json({ laundry, extra });
  } catch (err) {
    console.error("Error fetching clothes:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = {
  saveCloth,
  getClothes,
  deleteCloth,
  getClothesForUser,
  createReport,
  getReportsForAdmin,
  getReportsByStaff,
};
