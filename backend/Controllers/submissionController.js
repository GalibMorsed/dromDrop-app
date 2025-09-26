const Submission = require("../Models/Submission.js");
const User = require("../Models/User.js");
const Staff = require("../Models/Staff.js");

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
// ✅ Fetch submissions for a user
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

// ✅ Fetch submissions for staff
const getSubmissionsForStaff = async (req, res) => {
  try {
    const { staffEmail } = req.query;

    if (!staffEmail) {
      return res.status(400).json({ message: "Staff email is required" });
    }

    const staff = await Staff.findOne({ email: staffEmail });
    if (!staff) {
      return res.status(404).json({ message: "Staff not found" });
    }

    const users = await User.find({
      instituteName: staff.instituteName,
    }).select("email");
    const userEmails = users.map((u) => u.email);

    const submissions = await Submission.find({
      userEmail: { $in: userEmails },
    });

    res.status(200).json(submissions);
  } catch (error) {
    console.error("Error fetching submissions:", error);
    res
      .status(500)
      .json({ message: "Server error while fetching submissions" });
  }
};

// ✅ Delete submission
const deleteSubmission = async (req, res) => {
  try {
    const { id } = req.params;

    const submission = await Submission.findByIdAndDelete(id);
    if (!submission) {
      return res.status(404).json({ message: "Submission not found" });
    }

    res.status(200).json({ message: "Submission deleted successfully" });
  } catch (error) {
    console.error("Error deleting submission:", error);
    res.status(500).json({ message: "Server error while deleting submission" });
  }
};

module.exports = {
  submitClothes,
  getSubmittedClothes,
  getSubmissionsForStaff,
  deleteSubmission,
};
