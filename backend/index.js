const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const authRouter = require("./Routes/authRouter");
const uniqueIdRouter = require("./Routes/uniqueIdRouter");
const clothesRouter = require("./Routes/clothesRouter");

require("dotenv").config();
require("./Models/db.js");
const PORT = process.env.PORT || 6060;

app.get("/ping", (req, res) => {
  res.send("PONGA STARTED ON DROMDROP PORT 6060 BACKEND");
});

app.use(bodyParser.json());
app.use(cors());
app.use("/auth", authRouter);
app.use("/uniqueId", uniqueIdRouter);
app.use("/clothes", clothesRouter);

app.listen(PORT, (error) => {
  if (error) {
    console.error("Server startup error:", error);
  } else {
    console.log(`Server is running on ${PORT}`);
  }
});
