const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema(
  {
    date: { 
      type: String, 
      required: true, 
      unique: true 
    },
    records: { 
      type: Object, 
      default: {} }, // { studentId: "present"|"absent" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Attendance", AttendanceSchema);
