const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  subject: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    unique: true
  },
  mobileNo: {
    type: Number,
    max: 10,
    unique: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Teacher', TeacherSchema);
