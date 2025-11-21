const mongoose = require('mongoose');
const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rollNo: { type: String, required: true, unique: true },
  className: String,
  section: String,
  email: String,
  phone: String,
  meta: Object
}, { timestamps: true });
module.exports = mongoose.model('Student', StudentSchema);
