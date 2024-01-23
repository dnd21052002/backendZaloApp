const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRouter');
const attendanceRoutes = require('./routes/attendanceRouter');
const departmentRoutes = require('./routes/departmentRouter');
const dotenv = require("dotenv")
const app = express();
const connectDatabase = require("./config/db");
const PORT = process.env.PORT || 5000;

app.use(express.json());
dotenv.config();


// Sử dụng routes liên quan đến người dùng
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/event', eventRoutes);
app.use('/api/v1/attendance', attendanceRoutes);
app.use('/api/v1/department', departmentRoutes)

// Khởi động server
connectDatabase().then((res) => {
  console.log(res);
  app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
  });
});
