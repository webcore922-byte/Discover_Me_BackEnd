const bcrypt = require('bcrypt');
const User = require('../../model/User');
const {
  generateToken
} = require('../../middleware/auth');
const loginUser = async (req, res, next) => {
  try {
    const {
      email,
      password
    } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: 'من فضلك ادخل الإيميل والباسورد'
      });
    }
    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({
      email: normalizedEmail
    });
    if (!user) {
      return res.status(401).json({
        message: 'بيانات الدخول غير صحيحة'
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: 'بيانات الدخول غير صحيحة'
      });
    }
    const token = generateToken({
      id: user._id,
      type: 'user'
    });
    res.status(200).json({
      message: 'تم تسجيل الدخول بنجاح',
      token,
      user
    });
  } catch (error) {
    next(error);
  }
};
module.exports = loginUser;
