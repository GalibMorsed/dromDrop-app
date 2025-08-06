const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  institution: {
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
    enum: ["Administrator"],
  },
});

const AdminModel = mongoose.model("logAdmins", UserSchema);
module.exports = AdminModel;
