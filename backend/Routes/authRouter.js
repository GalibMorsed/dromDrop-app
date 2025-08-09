const {
  signin,
  login,
  adminLogin,
  adminSignup,
} = require("../Controllers/authController");
const { getAdminDashboardInfo } = require("../Controllers/adminController");
const {
  signinValidation,
  loginValidation,
  adminSignupValidation,
  adminLoginValidation,
} = require("../Middlewares/authValidation");

const { Router } = require("express");
const router = Router();

router.post("/Userlogin", loginValidation, login);
router.post("/Usersignin", signinValidation, signin);
router.post("/Adminlogin", adminLoginValidation, adminLogin);
router.post("/Adminsignup", adminSignupValidation, adminSignup);
router.get("/AdminDashboard", getAdminDashboardInfo);

module.exports = router;
