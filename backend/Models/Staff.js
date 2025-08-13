const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  uniqueId: {
    type: String,
    required: true,
  },
  instituteName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["Staff/Faculty"],
  },
});

const StaffModel = mongoose.model("logStaff", UserSchema);
module.exports = StaffModel;
