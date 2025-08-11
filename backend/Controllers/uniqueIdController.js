const UniqueId = require("../Models/UniqueId");

const createUniqueId = async (req, res) => {
  try {
    const { uniqueId } = req.body;

    if (!uniqueId) {
      return res.status(400).json({ error: "Unique ID is required" });
    }

    // Check if this admin already has a Unique ID
    const existing = await UniqueId.findOne({ email: req.adminEmail });
    if (existing) {
      return res
        .status(400)
        .json({ error: "Unique ID already created for this admin" });
    }

    // Create and save new unique ID record
    const newId = new UniqueId({
      uniqueId,
      adminEmail: req.adminEmail,
      institutionName: req.institution,
    });

    await newId.save();

    res.status(201).json({
      message: "Unique ID created successfully",
      uniqueId: newId.uniqueId,
      institution: newId.institution,
    });
  } catch (error) {
    console.error("CreateUniqueId Error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const getUniqueId = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const record = await UniqueId.findOne({ adminEmail: email });

    if (!record) {
      return res.status(200).json({
        success: true,
        message: "No unique ID found. You can create one.",
        uniqueId: null,
        createdAt: null,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Unique ID found",
      uniqueId: record.uniqueId,
      createdAt: record.createdAt,
      institutionName: record.institution,
    });
  } catch (error) {
    console.error("GetUniqueId Error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const verifyUniqueId = async (req, res) => {
  try {
    const { uniqueId } = req.body;

    if (!uniqueId) {
      return res.status(400).json({ error: "Unique ID is required" });
    }

    const record = await UniqueId.findOne({ uniqueId });
    if (!record) {
      return res.status(404).json({ error: "Invalid Unique ID" });
    }

    res.json({
      message: "Valid Unique ID",
      success: true,
      institutionName: record.institutionName,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { createUniqueId, getUniqueId, verifyUniqueId };
