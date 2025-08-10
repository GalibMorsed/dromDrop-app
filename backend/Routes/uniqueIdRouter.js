const {
  createUniqueId,
  getUniqueId,
} = require("../Controllers/uniqueIdController.js");
const { verifyAdmin } = require("../Middlewares/uniqueIdValidation.js");

const { Router } = require("express");
const router = Router();

router.post("/createUniqueId", verifyAdmin, createUniqueId);
router.get("/verifyUniqueId", getUniqueId);

module.exports = router;
