const {
  createUniqueId,
  getUniqueId,
  verifyUniqueId,
} = require("../Controllers/uniqueIdController.js");
const { verifyAdmin } = require("../Middlewares/uniqueIdValidation.js");

const { Router } = require("express");
const router = Router();

router.post("/createUniqueId", verifyAdmin, createUniqueId);
router.get("/getUniqueId", getUniqueId);
router.post("/verifyUniqueId", verifyUniqueId);

module.exports = router;
