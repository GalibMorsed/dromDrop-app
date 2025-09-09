const {
  submitClothes,
  getSubmittedClothes,
} = require("../Controllers/submissionController");

const { Router } = require("express");
const router = Router();

router.post("/submitCloth", submitClothes);
router.get("/submittedCloth", getSubmittedClothes);

module.exports = router;
