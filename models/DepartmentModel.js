const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
  nameDepartment: {
    type: String,
    required: true,
    unique: true,
  }
});

const Department = mongoose.model("Department", departmentSchema);

module.exports = Department;
