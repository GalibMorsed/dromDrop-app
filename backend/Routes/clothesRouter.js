const {
  saveCloth,
  getClothes,
  deleteCloth,
} = require("../Controllers/clothesController");
const upload = require("../Middlewares/upload");

const { Router } = require("express");
const router = Router();

router.post("/saveCloth", upload.single("file"), saveCloth); // Save with image
router.get("/getClothes", getClothes); // Fetch clothes
router.delete("/deleteCloth/:id", deleteCloth); // Delete cloth

module.exports = router;
