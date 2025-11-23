const Teacher = require('../models/Teacher');
const { validationResult } = require('express-validator');

exports.list = async (req, res, next) => {
  try {
    const list = await Teacher.find().sort({ name: 1 });
    res.json(list);
  } catch (err) { next(err); }
};

exports.create = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) 
      return res.status(422).json({ errors: errors.array() });
    const t = await Teacher.create({ name: req.body.name, subject: req.body.subject });
    res.status(201).json(t);
  } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
  try {
    const t = await Teacher.findByIdAndDelete(req.params.id);
    if (!t) 
      return res.status(404).json({ message: 'Teacher not found' });
    res.json({ message: 'Deleted' });
  } catch (err) { next(err); }
};
