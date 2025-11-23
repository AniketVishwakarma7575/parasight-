const express = require("express");
const router = express.Router();
const attendanceController = require("../controllers/attendanceController");
const adminAuth = require("../middleware/adminAuth");

// Get attendance
router.get("/", attendanceController.getByDate);
router.get("/list", attendanceController.listAll);
router.get("/:date", attendanceController.getByDate);

// Admin-only
router.post("/", adminAuth, attendanceController.saveForDate);
router.post("/:date", adminAuth, attendanceController.saveForDate);
router.patch("/:date/mark", adminAuth, attendanceController.markSingle);
router.delete("/:date", adminAuth, attendanceController.deleteDate);

module.exports = router;
