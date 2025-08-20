// Middlewares/upload.js
const multer = require("multer");

// store file in memory
const storage = multer.memoryStorage();

// initialize multer
const upload = multer({ storage });

module.exports = upload;
