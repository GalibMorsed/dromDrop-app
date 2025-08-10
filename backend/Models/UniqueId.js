const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const uniqueIdSchema = new Schema({
  institutionName: {
    type: String,
    required: true,
  },
  adminEmail: {
    type: String,
    required: true,
  },
  uniqueId: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const UniqueIdModel = mongoose.model("UniqueId", uniqueIdSchema);
module.exports = UniqueIdModel;
