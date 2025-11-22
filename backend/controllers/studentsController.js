const Student = require('../models/Student');
const { validationResult } = require('express-validator');

// Get all students
exports.getAll = async (req, res, next) => {
    try {
        const students = await Student.find().sort({ roll: 1, name: 1 });
        res.json(students);
        // res.json({students});  //ye pass karne per mark mai to ja raha but this time it's not working
    } catch (err) { next(err); }
};

// Get student by ID
exports.getById = async (req, res, next) => {
    try {
        const s = await Student.findById(req.params.id);
        if (!s) return res.status(404).json({ message: 'Student not found' });
        res.json(s);
    } catch (err) { next(err); }
};

// Create student
exports.create = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

        const { roll, name, classSec, email } = req.body;
        const created = await Student.create({ roll, name, classSec, email });

        // Return as { student } for frontend consistency
        res.status(201).json({ student: created });
    } catch (err) { next(err); }
};

// Update student
exports.update = async (req, res, next) => {
    try {
        const { roll, name, classSec, email } = req.body;
        const s = await Student.findById(req.params.id);
        if (!s) return res.status(404).json({ message: 'Student not found' });

        s.roll = roll ?? s.roll;
        s.name = name ?? s.name;
        s.classSec = classSec ?? s.classSec;
        s.email = email ?? s.email;

        await s.save();
        res.json(s);
    } catch (err) { next(err); }
};

// Delete student
exports.remove = async (req, res, next) => {
    try {
        const s = await Student.findByIdAndDelete(req.params.id);
        if (!s) return res.status(404).json({ message: 'Student not found' });
        res.json({ message: 'Deleted', studentId: s._id });
    } catch (err) { next(err); }
};
