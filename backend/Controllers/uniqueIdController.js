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
    const { email } = req.params;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const record = await UniqueId.findOne({ email });
    if (!record) {
      return res.status(404).json({ uniqueId: null });
    }

    res.status(200).json({
      uniqueId: record.uniqueId,
      institutionName: record.institution,
    });
  } catch (error) {
    console.error("GetUniqueId Error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { createUniqueId, getUniqueId };
