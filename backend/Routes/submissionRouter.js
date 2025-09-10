const {
  submitClothes,
  getSubmittedClothes,
  getSubmissionsForStaff,
  deleteSubmission,
} = require("../Controllers/submissionController");

const { Router } = require("express");
const router = Router();

router.post("/submitCloth", submitClothes);
router.get("/submittedCloth", getSubmittedClothes);
router.get("/getSubmissionsForStaff", getSubmissionsForStaff);
router.delete("/deleteSubmission/:id", deleteSubmission);

module.exports = router;
