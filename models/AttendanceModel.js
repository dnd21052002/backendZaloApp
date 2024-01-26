const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
  },
  eventId: {
    type: mongoose.Types.ObjectId,
  },
  timeLineAtten: [
    {
      date: { type: Date, default: Date.now },
    },
  ],
  imgAtten:{
    type: String
  },
  statusAttendance: {
    type: Boolean,
    default: false
  }
});

const Attendance = mongoose.model("Attendance", attendanceSchema);

module.exports = Attendance;
