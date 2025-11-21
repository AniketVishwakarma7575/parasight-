const router = require('express').Router();
const Student = require('../models/Student');
const auth = require('../middleware/auth');

// Create
router.post('/', auth, async (req, res) => {
  const s = new Student(req.body);
  await s.save();
  res.json(s);
});

// List (with simple search / pagination)
router.get('/', auth, async (req,res) => {
  const { q, page=1, limit=20 } = req.query;
  const filter = q ? { name: new RegExp(q, 'i') } : {};
  const students = await Student.find(filter).skip((page-1)*limit).limit(parseInt(limit));
  const total = await Student.countDocuments(filter);
  res.json({ data: students, total });
});

// Get
router.get('/:id', auth, async (req,res)=> {
  const s = await Student.findById(req.params.id);
  res.json(s);
});

// Update
router.put('/:id', auth, async (req,res)=>{
  const s = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(s);
});

// Delete
router.delete('/:id', auth, async (req,res)=>{
  await Student.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

module.exports = router;
