const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/DepartmentController');

// Xem tất cả các phòng ban
router.get('/departments', departmentController.getAllDepartments);

// Xem thông tin một phòng ban theo ID
router.get('/departments/:id', departmentController.getDepartmentById);

// Thêm một phòng ban mới
router.post('/departments', departmentController.createDepartment);

// Cập nhật thông tin một phòng ban theo ID
router.put('/departments/:id', departmentController.updateDepartment);

// Xóa một phòng ban theo ID
router.delete('/departments/:id', departmentController.deleteDepartment);

module.exports = router;
