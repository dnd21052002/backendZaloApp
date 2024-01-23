const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
  },
  eventId: {
    type: mongoose.Types.ObjectId,
  },
  listAction: [
    {
      date: { type: Date, default: Date.now },
    },
  ],
  imgAtten:{
    type: String
  }
});

const Attendance = mongoose.model("Attendance", attendanceSchema);

module.exports = Attendance;
