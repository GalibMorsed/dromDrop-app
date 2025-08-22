const {
  saveCloth,
  getClothes,
  deleteCloth,
} = require("../Controllers/clothesController");
const upload = require("../Middlewares/upload");

const { Router } = require("express");
const router = Router();

router.post("/saveCloth", upload.single("file"), saveCloth);
router.get("/getClothes", getClothes);
router.delete("/deleteCloth/:id", deleteCloth);

module.exports = router;
