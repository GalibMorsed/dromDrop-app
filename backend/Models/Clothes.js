const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clothSchema = new Schema({
  staffEmail: {
    type: String,
    required: true,
    trim: true,
  },
  selectedOption: {
    type: String,
    enum: ["laundry", "extra"],
    required: true,
  },
  clothName: {
    type: String,
    required: true,
    trim: true,
  },
  clothPrice: {
    type: Number,
    default: 0,
  },
  photo: {
    data: Buffer,
    contentType: {
      type: String,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ClothModel = mongoose.model("Cloth", clothSchema);
module.exports = ClothModel;
