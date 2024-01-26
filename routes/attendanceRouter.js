const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/AttendanceController');

router.post('/', attendanceController.markAttendance);

router.get('/user/:userId', attendanceController.getAttendanceByUserId);

// router.get('/', attendanceController.getEventByAttendance);
// Add more routes as needed

module.exports = router;
