const express = require("express");
const router = express.Router();
const attendanceController = require("../controllers/attendanceController");
const adminAuth = require("../middleware/adminAuth"); // optional: protect routes

// Get attendance for a specific date (query ?date=YYYY-MM-DD)
router.get("/", attendanceController.getByDate); // default today's
router.get("/list", attendanceController.listAll);
router.get("/:date", attendanceController.getByDate);

// Admin-only operations
router.post("/", adminAuth, attendanceController.saveForDate); // body: { date, attendance }
router.post("/:date", adminAuth, attendanceController.saveForDate);
router.patch("/:date/mark", adminAuth, attendanceController.markSingle);
router.delete("/:date", adminAuth, attendanceController.deleteDate);

module.exports = router;
