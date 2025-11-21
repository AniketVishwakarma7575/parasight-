const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const u = await User.findOne({ email });
  if(!u) return res.status(400).json({ msg: 'Invalid credentials' });
  const ok = await bcrypt.compare(password, u.passwordHash);
  if(!ok) return res.status(400).json({ msg: 'Invalid credentials' });
  const token = jwt.sign({ id: u._id, role: u.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '8h' });
  res.json({ token, user: { id: u._id, name: u.name, email: u.email, role: u.role } });
});

module.exports = router;
