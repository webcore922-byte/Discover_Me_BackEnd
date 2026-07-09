const jwt = require('jsonwebtoken');
const User = require('../model/User');
const Admin = require('../model/Admin');
const JWT_SECRET = process.env.JWT_SECRET;
const generateToken = payload => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: '30d'
  });
};
const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        message: 'مفيش توكن، الدخول مرفوض'
      });
    }
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    let account;
    if (decoded.type === 'admin') {
      account = await Admin.findById(decoded.id);
    } else {
      account = await User.findById(decoded.id);
    }
    if (!account) {
      return res.status(401).json({
        message: 'الحساب غير موجود'
      });
    }
    req.user = account;
    req.userType = decoded.type;
    next();
  } catch (error) {
    return res.status(401).json({
      message: 'توكن غير صالح أو منتهي الصلاحية'
    });
  }
};
const adminOnly = (...roles) => {
  return (req, res, next) => {
    if (req.userType !== 'admin') {
      return res.status(403).json({
        message: 'الوصول مسموح للأدمن فقط'
      });
    }
    if (roles.length && !roles.includes(req.user.role)) {
      return res.status(403).json({
        message: 'ليس لديك صلاحية لهذا الإجراء'
      });
    }
    next();
  };
};
module.exports = {
  generateToken,
  protect,
  adminOnly
};
