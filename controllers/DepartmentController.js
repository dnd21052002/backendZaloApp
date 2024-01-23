const Department = require('../models/DepartmentModel');

const createResponseObject = (success, message, data = null) => {
  return {
    success: success,
    message: message,
    data: data,
  };
};

const getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    res.json(createResponseObject(true, 'Danh sách phòng ban', departments));
  } catch (error) {
    res.status(500).json(createResponseObject(false, error.message));
  }
};

const getDepartmentById = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    if (department) {
      res.json(createResponseObject(true, 'Thông tin phòng ban', department));
    } else {
      res.status(404).json(createResponseObject(false, 'Không tìm thấy phòng ban'));
    }
  } catch (error) {
    res.status(500).json(createResponseObject(false, error.message));
  }
};

const createDepartment = async (req, res) => {
  const department = new Department({
    nameDepartment: req.body.nameDepartment,
  });

  try {
    const newDepartment = await department.save();
    res.status(201).json(createResponseObject(true, 'Thêm phòng ban thành công', newDepartment));
  } catch (error) {
    res.status(400).json(createResponseObject(false, error.message));
  }
};

const updateDepartment = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);

    if (department) {
      department.nameDepartment = req.body.nameDepartment;
      const updatedDepartment = await department.save();
      res.json(createResponseObject(true, 'Cập nhật phòng ban thành công', updatedDepartment));
    } else {
      res.status(404).json(createResponseObject(false, 'Không tìm thấy phòng ban'));
    }
  } catch (error) {
    res.status(400).json(createResponseObject(false, error.message));
  }
};

const deleteDepartment = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);

    if (department) {
      await department.remove();
      res.json(createResponseObject(true, 'Xóa phòng ban thành công'));
    } else {
      res.status(404).json(createResponseObject(false, 'Không tìm thấy phòng ban'));
    }
  } catch (error) {
    res.status(500).json(createResponseObject(false, error.message));
  }
};

module.exports = {
  getAllDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment,
};
