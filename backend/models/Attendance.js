const mongoose = require('mongoose');
const AttendanceSchema = new mongoose.Schema({
  date: { type: String, required: true }, // ISO date string (YYYY-MM-DD)
  records: [{
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
    status: { type: String, enum: ['present','absent'], required: true },
    remark: String
  }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

AttendanceSchema.index({ date: 1 }, { unique: true }); // one attendance document per date
module.exports = mongoose.model('Attendance', AttendanceSchema);
