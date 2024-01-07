const express = require('express');
const router = express.Router();
const { createUser, getUserByPhone, updateUserByPhone } = require('../controllers/UserController');

// Route để đăng ký người dùng
router.post('/register', createUser);

// Route để lấy thông tin người dùng dựa trên số điện thoại
router.get('/:phone', getUserByPhone);

// Route để cập nhật thông tin người dùng dựa trên số điện thoại
router.put('/:phone', updateUserByPhone);

module.exports = router;