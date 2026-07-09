const bcrypt = require('bcrypt');
const Admin = require('../../model/Admin');
const createAdmin = async (req, res, next) => {
  try {
    const {
      username,
      email,
      password,
      role
    } = req.body;
    if (!username || !email || !password || !role) {
      return res.status(400).json({
        message: 'من فضلك ادخل كل البيانات المطلوبة'
      });
    }
    const normalizedEmail = email.toLowerCase().trim();
    const existingAdmin = await Admin.findOne({
      email: normalizedEmail
    });
    if (existingAdmin) {
      return res.status(409).json({
        message: 'الإيميل مستخدم بالفعل'
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = await Admin.create({
      username,
      email: normalizedEmail,
      password: hashedPassword,
      role
    });
    res.status(201).json(newAdmin);
  } catch (error) {
    next(error);
  }
};
module.exports = createAdmin;
