const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email đã được sử dụng.' });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashed });
    res.status(201).json({ message: 'Đăng ký thành công', user });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi máy chủ' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Không tìm thấy người dùng' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Sai mật khẩu' });

    res.json({ message: 'Đăng nhập thành công', user: { email: user.email, name: user.email.split('@')[0] } });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi máy chủ' });
  }
};