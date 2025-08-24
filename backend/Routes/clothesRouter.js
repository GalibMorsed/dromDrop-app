const {
  saveCloth,
  getClothes,
  deleteCloth,
} = require("../Controllers/clothesController");
const upload = require("../Middlewares/upload");

const {
  getDates,
  addDate,
  deleteDate,
} = require("../Controllers/timeController");

const { Router } = require("express");
const router = Router();

router.post("/saveCloth", upload.single("file"), saveCloth);
router.get("/getClothes", getClothes);
router.delete("/deleteCloth/:id", deleteCloth);

router.get("/getDates", getDates);
router.post("/addDate", addDate);
router.delete("/deleteDate/:id", deleteDate);

module.exports = router;
