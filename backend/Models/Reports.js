const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WeeklyReportSchema = new mongoose.Schema(
  {
    staffEmail: { type: String, required: true },
    instituteName: { type: String },
    hostelName: { type: String, required: true },
    noStudents: { type: Number, required: true },
    weekStart: { type: Date, required: true },
    weekEnd: { type: Date, required: true },
    noClothes: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["Pending", "Completed"],
      default: "Pending",
    },
    remarks: { type: String },
  },
  { timestamps: true }
);

const ReportsModel = mongoose.model("WeeklyReport", WeeklyReportSchema);
module.exports = ReportsModel;
