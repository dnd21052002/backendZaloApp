const express = require('express');
const router = express.Router();
const { createUser, getUserByPhone, updateUserById, getUserByStudentId } = require('../controllers/UserController');

// Route để đăng ký người dùng
router.post('/register', createUser);

// Route để lấy thông tin người dùng dựa trên số điện thoại
router.get('/phone/:phone', getUserByPhone);

router.get('/:id', getUserByStudentId);

// Route để cập nhật thông tin người dùng dựa trên số điện thoại
router.post('/:id', updateUserById);

module.exports = router;