const Admin = require("../Models/Admin");

const verifyAdmin = async (req, res, next) => {
  try {
    const { role, email } = req.body;

    if (!role || !email) {
      return res.status(400).json({ error: "Role and email are required" });
    }

    if (role !== "Administrator") {
      return res.status(403).json({ error: "Access denied. Admins only." });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }

    // Attach institution & email to request for next step
    req.institution = admin.institution;
    req.adminEmail = admin.email;

    next();
  } catch (error) {
    console.error("VerifyAdmin Error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { verifyAdmin };
