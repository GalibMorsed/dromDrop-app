const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../Models/User");
const AdminModel = require("../Models/Admin");
const StaffModel = require("../Models/Staff");

// added controller for user authentication
const signin = async (req, res) => {
  try {
    const { uniqueId, instituteName, email, password, role } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(409).json({
        message: "User already exists, please login",
        success: false,
      });
    }
    const userModel = new UserModel({
      uniqueId,
      instituteName,
      email,
      password,
      role,
    });
    userModel.password = await bcrypt.hash(password, 10);
    await userModel.save();
    res.status(201).json({
      message: "Signup successful",
      success: true,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    const errorMsg = "Authentication failed: email or password is incorrect";
    if (!user) {
      return res.status(403).json({ message: errorMsg, success: false });
    }
    const isPassEqual = await bcrypt.compare(password, user.password);
    if (!isPassEqual) {
      return res.status(403).json({ message: errorMsg, success: false });
    }
    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "12h" }
    );

    res.status(200).json({
      message: "Login successful",
      success: true,
      jwtToken,
      email,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

// added controller for admin authentication
const adminSignup = async (req, res) => {
  try {
    const { institution, email, password, role } = req.body;
    const admin = await AdminModel.findOne({ email });
    if (admin) {
      return res.status(409).json({
        message: "Admin already exists, please login",
        success: false,
      });
    }
    const adminModel = new AdminModel({ institution, email, password, role });
    adminModel.password = await bcrypt.hash(password, 10);
    await adminModel.save();
    res.status(201).json({
      message: "Admin signup successful",
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message:
        "One Admin already exists for this institution can't signup again",
      success: false,
    });
  }
};
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await AdminModel.findOne({ email });
    const errorMsg = "Authentication failed: email or password is incorrect";
    if (!admin) {
      return res.status(403).json({ message: errorMsg, success: false });
    }
    const isPassEqual = await bcrypt.compare(password, admin.password);
    if (!isPassEqual) {
      return res.status(403).json({ message: errorMsg, success: false });
    }
    const jwtToken = jwt.sign(
      { email: admin.email, _id: admin._id },
      process.env.JWT_SECRET,
      { expiresIn: "12h" }
    );

    res.status(200).json({
      message: "Login successful",
      success: true,
      jwtToken,
      email,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

// adding controller for staff authentication
const staffSignup = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
        success: false,
      });
    }
    const existingStaff = await StaffModel.findOne({ email });
    if (existingStaff) {
      return res.status(409).json({
        message: "Staff already exists, please login",
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newStaff = new StaffModel({
      email,
      password: hashedPassword,
    });
    await newStaff.save();
    res.status(201).json({
      message:
        "Staff account created successfully, Pass the Id and Password to the Staffs",
      success: true,
    });
  } catch (err) {
    console.error("Error in staffSignup:", err);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const staffLogin = async (req, res) => {
  try {
    const { email, password, uniqueId, instituteName, role } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
        success: false,
      });
    }
    const staff = await StaffModel.findOne({ email });
    const errorMsg = "Authentication failed: email or password is incorrect";
    if (!staff) {
      return res.status(403).json({ message: errorMsg, success: false });
    }
    const isPasswordMatch = await bcrypt.compare(password, staff.password);
    if (!isPasswordMatch) {
      return res.status(403).json({ message: errorMsg, success: false });
    }
    if (uniqueId || instituteName || role) {
      staff.uniqueId = uniqueId || staff.uniqueId;
      staff.instituteName = instituteName || staff.instituteName;
      staff.role = role || staff.role;
      await staff.save();
    }
    const jwtToken = jwt.sign(
      { email: staff.email, _id: staff._id, role: staff.role },
      process.env.JWT_SECRET,
      { expiresIn: "12h" }
    );
    res.status(200).json({
      message: "Login successful",
      success: true,
      jwtToken,
      email: staff.email,
      role: staff.role,
    });
  } catch (err) {
    console.error("staffLogin error:", err);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

module.exports = {
  signin,
  login,
  adminSignup,
  adminLogin,
  staffSignup,
  staffLogin,
};
