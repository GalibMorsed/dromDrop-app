const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Sub-schema for each cloth item
const ClothItemSchema = new Schema({
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
    contentType: { type: String },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Main schema (grouped by staffEmail)
const ClothSchema = new Schema({
  staffEmail: {
    type: String,
    required: true,
    trim: true,
  },
  clothes: [ClothItemSchema],
});

const ClothModel = mongoose.model("Cloth", ClothSchema);
module.exports = ClothModel;
