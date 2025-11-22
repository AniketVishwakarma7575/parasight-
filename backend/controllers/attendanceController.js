const Attendance = require("../models/Attendance");
const fmtDate = (d) => new Date(d).toISOString().slice(0, 10);

// Get attendance by date
exports.getByDate = async (req, res, next) => {
    try {
        const date = req.params.date || req.query.date || fmtDate(new Date());
        const rec = await Attendance.findOne({ date });
        res.json(rec || { date, records: {} });
    } catch (err) { next(err); }
};

// Save or update attendance for a date
exports.saveForDate = async (req, res, next) => {
    try {
        const date = req.params.date || req.body.date || fmtDate(new Date());
        const { attendance } = req.body;

        if (!attendance || typeof attendance !== "object")
            return res.status(400).json({ message: "attendance records required" });

        let rec = await Attendance.findOne({ date });
        if (!rec) {
            rec = await Attendance.create({ date, records: attendance });
        } else {
            rec.records = attendance;
            await rec.save();
        }

        res.json(rec);
    } catch (err) { next(err); }
};

// Mark a single student present/absent
exports.markSingle = async (req, res, next) => {
    try {
        const { date } = req.params;
        const { studentId, status } = req.body;

        if (!studentId || !status)
            return res.status(400).json({ message: "studentId and status required" });

        let rec = await Attendance.findOne({ date });
        if (!rec) rec = await Attendance.create({ date, records: {} });

        rec.records[studentId] = status;
        await rec.save();

        res.json(rec);
    } catch (err) { next(err); }
};

// List all attendance records
exports.listAll = async (req, res, next) => {
    try {
        const list = await Attendance.find().sort({ date: -1 }).limit(200);
        res.json(list);
    } catch (err) { next(err); }
};

// Delete attendance for a date
exports.deleteDate = async (req, res, next) => {
    try {
        const date = req.params.date;
        const rec = await Attendance.findOneAndDelete({ date });
        if (!rec) return res.status(404).json({ message: "Not found" });
        res.json({ message: "Deleted successfully" });
    } catch (err) { next(err); }
};
