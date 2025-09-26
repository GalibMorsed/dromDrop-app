const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClothItemSchema = new Schema({
  clothName: { type: String, required: true },
  quantity: { type: Number, default: 0 },
  status: { type: String, default: "Custom" },
  clothPrice: { type: Number, default: 0 },
  totalPrice: { type: Number, default: 0 },
  selectedOption: { type: String, default: "Laundry" },
});

const SubmittedClothesSchema = new Schema({
  userEmail: { type: String, required: true },
  clothes: [ClothItemSchema],
  totalSubmissionPrice: { type: Number, default: 0 },
  date: { type: Date, default: Date.now },
});

const SubmissionModel = mongoose.model(
  "SubmittedClothes",
  SubmittedClothesSchema
);
module.exports = SubmissionModel;
