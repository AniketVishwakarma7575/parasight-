const router = require('express').Router();
const Attendance = require('../models/Attendance');
const Student = require('../models/Student');
const auth = require('../middleware/auth');

// Create or update attendance for a date (admin only)
router.post('/', auth, async (req, res) => {
  // body: { date: '2025-11-21', records: [{ student: id, status: 'present' }, ...] }
  const { date, records } = req.body;
  // Upsert one doc per date
  const doc = await Attendance.findOneAndUpdate(
    { date },
    { date, records, createdBy: req.user.id },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );
  res.json(doc);
});

// Get attendance for a date
router.get('/:date', auth, async (req, res) => {
  const date = req.params.date; // yyyy-mm-dd
  let att = await Attendance.findOne({ date }).populate('records.student');
  // if not exists return students list with absent default
  if(!att) {
    const students = await Student.find().limit(1000);
    const records = students.map(s => ({ student: s._id, status: 'absent' }));
    return res.json({ date, records, generated: true, students });
  }
  res.json(att);
});

// Edit single record
router.put('/:date/record/:studentId', auth, async (req, res) => {
  const { date, studentId } = req.params;
  const { status, remark } = req.body;
  const att = await Attendance.findOne({ date });
  if(!att) return res.status(404).json({ msg: 'Attendance not found' });
  const rec = att.records.find(r => String(r.student) === String(studentId));
  if(rec){
    rec.status = status;
    rec.remark = remark;
  } else {
    att.records.push({ student: studentId, status, remark });
  }
  await att.save();
  res.json(att);
});

module.exports = router;
