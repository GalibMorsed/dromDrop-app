const AdminModel = require("../Models/Admin");
const User = require("../Models/User");
const StaffModel = require("../Models/Staff");

const getAdminDashboardInfo = async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ message: "Admin email is required" });
    }

    const admin = await AdminModel.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const studentCount = await User.countDocuments({
      instituteName: admin.institution,
    });

    const staffCount = await StaffModel.countDocuments({
      instituteName: admin.institution,
    });

    res.status(200).json({
      institution: admin.institution,
      email: admin.email,
      role: admin.role,
      studentCount,
      staffCount,
      message: `Welcome back ${admin.institution} Admin! 
        You currently have ${studentCount} students and ${staffCount} staff members.`,
    });
  } catch (error) {
    console.error("Error fetching admin dashboard info:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getAdminDashboardInfo,
};
