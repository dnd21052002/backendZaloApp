const User = require('../models/User');

const createUser = async (req, res) => {
  try {
    const {
      phone,
      fullName,
      className,
      deviceId,
      department,
    } = req.body;

    // Kiểm tra xem số điện thoại đã tồn tại trong cơ sở dữ liệu chưa
    const existingUser = await User.findOne({ phone });

    if (existingUser) {
      return res.status(400).json({ message: 'Số điện thoại đã tồn tại trong hệ thống.' });
    }

    // Tạo một người dùng mới
    const newUser = new User({
      phone,
      fullName,
      className,
      deviceId,
      department,
    });

    // Lưu người dùng vào cơ sở dữ liệu
    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getUserByPhone = async (req, res) => {
    try {
      const { phone } = req.params;
  
      // Tìm người dùng dựa trên số điện thoại
      const user = await User.findOne({ phone });
  
      if (!user) {
        return res.status(404).json({ message: 'Người dùng không được tìm thấy.' });
      }
  
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  const updateUserByPhone = async (req, res) => {
    try {
      const { phone } = req.params;
      const updateData = req.body; // Dữ liệu cập nhật
  
      // Tìm người dùng dựa trên số điện thoại và cập nhật thông tin mới
      const updatedUser = await User.findOneAndUpdate({ phone }, updateData, {
        new: true, // Trả về người dùng đã được cập nhật
      });
  
      if (!updatedUser) {
        return res.status(404).json({ message: 'Người dùng không được tìm thấy.' });
      }
  
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

module.exports = {
  createUser,
  getUserByPhone,
  updateUserByPhone,
};
