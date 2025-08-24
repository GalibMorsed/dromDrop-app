const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PickupDrop = new Schema({
  userEmail: { type: String, required: true },
  type: {
    type: String,
    enum: ["Pickup", "Drop"],
    required: true,
  },
  date: { type: String, required: true },
});

// Ensure only 1 Pickup & 1 Drop per staff
PickupDrop.index({ userEmail: 1, type: 1 }, { unique: true });

const TimingModel = mongoose.model("PickUP/Drop", PickupDrop);
module.exports = TimingModel;
