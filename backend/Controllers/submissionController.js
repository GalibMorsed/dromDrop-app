const Submission = require("../Models/Submission.js");

const submitClothes = async (req, res) => {
  try {
    const { userEmail, laundry = [], extra = [], custom = [] } = req.body;

    const clothes = [
      ...laundry.map((c) => ({
        clothName: c.clothName,
        quantity: c.quantity,
        status: "Laundry",
        clothPrice: 0,
        totalPrice: 0,
        selectedOption: "Laundry",
      })),
      ...extra.map((c) => ({
        clothName: c.clothName,
        quantity: c.quantity,
        status: "Extra",
        clothPrice: c.clothPrice || 0,
        totalPrice: (c.clothPrice || 0) * (c.quantity || 0),
        selectedOption: "Extra",
      })),
      ...custom.map((c) => ({
        clothName: c.clothName,
        quantity: 1,
        status: "Custom",
        clothPrice: 0,
        totalPrice: 0,
        selectedOption: "Custom",
      })),
    ];

    const totalSubmissionPrice = clothes.reduce(
      (sum, item) => sum + (item.totalPrice || 0),
      0
    );

    // Always create a new Submission document for every submission
    const submission = new Submission({
      userEmail,
      clothes,
      totalSubmissionPrice,
      date: new Date(),
    });

    const saved = await submission.save();

    res.status(200).json({
      success: true,
      message: "Clothes submitted successfully",
      data: saved,
    });
  } catch (error) {
    console.error("Error submitting clothes:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Fetch submitted clothes for a user
const getSubmittedClothes = async (req, res) => {
  try {
    const { userEmail } = req.query;
    const submission = await Submission.find({ userEmail }).sort({
      date: -1,
    });
    res.status(200).json(submission || {});
  } catch (error) {
    console.error("Error fetching submitted clothes:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = {
  submitClothes,
  getSubmittedClothes,
};
