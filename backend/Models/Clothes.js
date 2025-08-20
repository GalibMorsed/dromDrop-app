const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clothSchema = new Schema({
  staffEmail: {
    type: String,
    required: true,
  },
  selectedOption: {
    type: String, // "laundry" | "extra"
    required: true,
  },
  clothName: {
    type: String,
    required: true,
  },
  clothPrice: {
    type: Schema.Types.Mixed, // <-- allows Number or String
    default: 0,
  },
  photo: {
    data: Buffer, // storing image data
    contentType: String, // e.g. "image/png" | "image/jpeg"
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ClothModel = mongoose.model("Cloth", clothSchema);
module.exports = ClothModel;
