const express = require('express');
const router = express.Router();
const eventController = require('../controllers/EventController');// Routes for events
const attendanceController = require('../controllers/AttendanceController');
router.get('/', eventController.getAllEvents);
router.get('/:id', eventController.getEventById);
router.post('/', eventController.createEvent);
router.put('/:id', eventController.updateEvent);
router.delete('/:id', eventController.deleteEvent);

router.get("/byUser/:userId/:status", attendanceController.getEventByAttendance)
module.exports = router;
