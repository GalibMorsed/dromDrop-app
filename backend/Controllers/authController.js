const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../Models/User");
const AdminModel = require("../Models/Admin");

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
    console.error(err); // 👈 see exact cause
    res.status(500).json({
      message: err.message, // send actual error for now
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
      message: "Internal server error",
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

module.exports = { signin, login, adminSignup, adminLogin };
