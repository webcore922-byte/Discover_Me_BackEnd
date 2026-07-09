const bcrypt = require('bcrypt');
const User = require('../../model/User');
const {
  generateToken
} = require('../../middleware/auth');
const registerUser = async (req, res, next) => {
  try {
    const {
      username,
      email,
      password,
      phone
    } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({
        message: 'من فضلك ادخل كل البيانات المطلوبة'
      });
    }
    const normalizedEmail = email.toLowerCase().trim();
    const existingUser = await User.findOne({
      email: normalizedEmail
    });
    if (existingUser) {
      return res.status(409).json({
        message: 'الإيميل مستخدم بالفعل'
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const image = `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`;
    const newUser = await User.create({
      username,
      email: normalizedEmail,
      password: hashedPassword,
      phone,
      image
    });
    const token = generateToken({
      id: newUser._id,
      type: 'user'
    });
    res.status(201).json({
      message: 'تم إنشاء الحساب بنجاح',
      token,
      user: newUser
    });
  } catch (error) {
    next(error);
  }
};
module.exports = registerUser;
