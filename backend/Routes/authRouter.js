const {
  signin,
  login,
  adminLogin,
  adminSignup,
  staffSignup,
  staffLogin,
  getCreatedStaffs,
  getActivities,
  deleteStaff,
  resetStaffPassword,
} = require("../Controllers/authController");
const { getAdminDashboardInfo } = require("../Controllers/adminController");
const {
  signinValidation,
  loginValidation,
  adminSignupValidation,
  adminLoginValidation,
  staffSignupValidation,
  staffLoginValidation,
  resetStaffPasswordValidation,
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

// Routers for Edit Staffs details
router.get("/getCreatedStaffs", getCreatedStaffs);
router.get("/getActivities", getActivities);
router.delete("/deleteStaff/:id", deleteStaff);
router.patch(
  "/resetStaffPassword/:id",
  resetStaffPasswordValidation,
  resetStaffPassword
);
module.exports = router;
