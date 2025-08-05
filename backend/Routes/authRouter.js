const { signin, login } = require("../Controllers/authController");
const {
  signinValidation,
  loginValidation,
} = require("../Middlewares/authValidation");
const { Router } = require("express");

const router = Router();

router.post("/Userlogin", loginValidation, login);
router.post("/Usersignin", signinValidation, signin);

module.exports = router;
