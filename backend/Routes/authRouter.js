const {
  signin,
  login,
  adminLogin,
  adminSignup,
  staffSignup,
  staffLogin,
} = require("../Controllers/authController");
const { getAdminDashboardInfo } = require("../Controllers/adminController");
const {
  signinValidation,
  loginValidation,
  adminSignupValidation,
  adminLoginValidation,
  staffSignupValidation,
  staffLoginValidation,
} = require("../Middlewares/authValidation");

const { Router } = require("express");
const router = Router();

router.post("/Userlogin", loginValidation, login);
router.post("/Usersignin", signinValidation, signin);
router.post("/Adminlogin", adminLoginValidation, adminLogin);
router.post("/Adminsignup", adminSignupValidation, adminSignup);
router.get("/AdminDashboard", getAdminDashboardInfo);
router.post("/Staffsignup", staffSignupValidation, staffSignup);
router.post("/Stafflogin", staffLoginValidation, staffLogin);

module.exports = router;
