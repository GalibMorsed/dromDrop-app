const {
  saveCloth,
  getClothes,
  deleteCloth,
  createReport,
  getReportsForAdmin,
  getReportsByStaff,
} = require("../Controllers/clothesController");
const upload = require("../Middlewares/upload");

const {
  getDates,
  addDate,
  deleteDate,
} = require("../Controllers/timeController");

const { Router } = require("express");
const router = Router();

// Staff Creates Clothes details
router.post("/saveCloth", upload.single("file"), saveCloth);
router.get("/getClothes", getClothes);
router.delete("/deleteCloth/:id", deleteCloth);

// Staff Creates Pickup&Drop dates
router.get("/getDates", getDates);
router.post("/addDate", addDate);
router.delete("/deleteDate/:id", deleteDate);

// Staff creates report
router.post("/createReport", createReport);
router.get("/adminReports", getReportsForAdmin);
router.get("/staffReports/:email", getReportsByStaff);
module.exports = router;
