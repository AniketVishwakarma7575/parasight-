const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema({
    date: { 
      type: String, 
      required: true, 
      unique: true 
    },
    records: { 
      type: Map, 
      of: String, // studentId: "present"|"absent"
      default: {}
    }
}, { timestamps: true });

module.exports = mongoose.model("Attendance", AttendanceSchema);
