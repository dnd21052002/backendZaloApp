const { checkPoint } = require("../functions/checkPoint");
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


const t45 = {
  lat1: 21.00752741126261,
  lat2: 21.00737404538046,
  lat3: 21.00734086825052,
  lat4: 21.00718061634922,
  long1: 105.82506591622553,
  long2: 105.82538979294438,
  long3: 105.82496399228916,
  long4: 105.82528786900801,
}

const t35 = {
  lat1: 21.00752741126261,
  lat2: 21.00737404538046,
  lat3: 21.00734086825052,
  lat4: 21.00718061634922,
  long1: 105.82506591622553,
  long2: 105.82538979294438,
  long3: 105.82496399228916,
  long4: 105.82528786900801,
}

exports.markAttendance = async (req, res) => {
  // const { userId, eventId } = req.params;
  const { lat, long, userId, eventId } = req.body;

  try {
    const attendance = await Attendance.findOne({ userId, eventId });
    const event = await Event.findById(eventId);

    const checkLatLong = checkPoint(event.location == "t45" ? t45 : t35, lat, long);

    if (!checkLatLong) {
      return res.json({
        error: true,
        message: "Bạn đã rời khởi vị trí điểm danh vui lòng quay trở lại!!"
      })
    }
    // const limitLat = event.location == "T45" ? 21.00752 : 20 
    // const litmitLatO = event.$locals == "T45" ? 21.00734 : 20
    // const litmitLongO = event.$locals == "T45" ? 21.00734 : 20
    // const limitLong = event.location == "T45" ? 105.82506 : 20 
    // if(limitLat < lat || limitLong < long){
    // return res.json({
    //   error: true,
    //   message: "Bạn đã rời khởi vị trí điểm danh vui lòng quay trở lại!!"
    // })
    // }
    if (!attendance) {
      const newAttendance = new Attendance({
        userId,
        eventId,
        timeLineAtten: [{ date: new Date() }],
        statusAttendance: true
      });

      const savedAttendance = await newAttendance.save();
      res.json(savedAttendance);
    } else {
      attendance.timeLineAtten.push({ date: new Date() });
      attendance.statusAttendance = true;
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
      { $unwind: "$timeLineAtten" },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$timeLineAtten.date" },
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

exports.getEventByAttendance = async (req, res) => {
  try {
    const { userId, status } = req.params
    console.log(typeof status)
    const attendanceModel = await Attendance.find({ userId: userId }).populate({
      path: 'eventId',
    });
    let dataNew = [];

    if (status == "true") {
      attendanceModel.forEach((item) => {
        const { statusAttendance } = item;
        if (statusAttendance == true) {
          dataNew.push(item);
        }
      })
    }
    else {
      dataNew = attendanceModel;
    }

    return res.json(dataNew);
  } catch (error) {
    return res.json({ message: "Error", error })
  }
}
module.exports = exports;
