const bcrypt = require('bcrypt');
const User = require('../../model/User');
const resetPassword = async (req, res, next) => {
  try {
    const {
      email,
      code,
      newPassword
    } = req.body;
    if (!email || !code || !newPassword) {
      return res.status(400).json({
        message: 'من فضلك ادخل كل البيانات المطلوبة'
      });
    }
    if (newPassword.length < 6) {
      return res.status(400).json({
        message: 'كلمة المرور الجديدة لازم تكون 6 أحرف على الأقل'
      });
    }
    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({
      email: normalizedEmail
    }).select('+resetPasswordCode +resetPasswordExpires');
    if (!user || !user.resetPasswordCode || !user.resetPasswordExpires) {
      return res.status(400).json({
        message: 'من فضلك اطلب رمز جديد أولاً'
      });
    }
    if (user.resetPasswordExpires < new Date()) {
      user.resetPasswordCode = null;
      user.resetPasswordExpires = null;
      await user.save();
      return res.status(400).json({
        message: 'انتهت صلاحية الرمز، من فضلك اطلب رمز جديد'
      });
    }
    const isCodeValid = await bcrypt.compare(code, user.resetPasswordCode);
    if (!isCodeValid) {
      return res.status(400).json({
        message: 'الرمز غير صحيح'
      });
    }
    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordCode = null;
    user.resetPasswordExpires = null;
    await user.save();
    res.status(200).json({
      message: 'تم تغيير كلمة المرور بنجاح، سجّل دخولك بالباسورد الجديدة'
    });
  } catch (error) {
    next(error);
  }
};
module.exports = resetPassword;
