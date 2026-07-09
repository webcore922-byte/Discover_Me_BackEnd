const bcrypt = require('bcrypt');
const Admin = require('../../model/Admin');
const {
  generateToken
} = require('../../middleware/auth');
const loginAdmin = async (req, res, next) => {
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
    const admin = await Admin.findOne({
      email: normalizedEmail
    });
    if (!admin) {
      return res.status(401).json({
        message: 'بيانات الدخول غير صحيحة'
      });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({
        message: 'بيانات الدخول غير صحيحة'
      });
    }
    const token = generateToken({
      id: admin._id,
      type: 'admin'
    });
    res.status(200).json({
      message: 'تم تسجيل الدخول بنجاح',
      token,
      admin
    });
  } catch (error) {
    next(error);
  }
};
module.exports = loginAdmin;
