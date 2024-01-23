const Attendance = require("../models/AttendanceModel");
const Event = require("../models/EventModel");

exports.getAllAttendance = async (req, res) => {
  try {
    const { userId, eventId } = req.params;
    const attendance = await Attendance.find({ userId, eventId });
    res.json(attendance);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.markAttendance = async (req, res) => {
  // const { userId, eventId } = req.params;
  const {lat, long, userId, eventId} = req.body;

  try {
    const attendance = await Attendance.findOne({ userId, eventId });
    const event = await Event.findById(eventId);
    const limitLat = event.location == "T45" ? 10 : 20 
    const limitLong = event.location == "T45" ? 10 : 20 
    if(limitLat < lat || limitLong < long){
      return res.json({
        error: true,
        message: "Bạn đã rời khởi vị trí điểm danh vui lòng quay trở lại!!"
      })
    }
    if (!attendance) {
      const newAttendance = new Attendance({
        userId,
        eventId,
        listAction: [{ date: new Date() }],
      });

      const savedAttendance = await newAttendance.save();
      res.json(savedAttendance);
    } else {
      attendance.listAction.push({ date: new Date() });
      await attendance.save();
      res.json(attendance);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.getAttendanceStatistics = async (req, res) => {
  try {
    const { eventId } = req.params;
    const attendanceStatistics = await Attendance.aggregate([
      { $match: { eventId: mongoose.Types.ObjectId(eventId) } },
      { $unwind: "$listAction" },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$listAction.date" },
          },
          count: { $sum: 1 },
        },
      },
    ]);

    res.json(attendanceStatistics);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.getAttendanceByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const userAttendance = await Attendance.find({ userId });

    res.json(userAttendance);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
module.exports = exports;
