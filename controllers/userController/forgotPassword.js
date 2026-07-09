const bcrypt = require('bcrypt');
const User = require('../../model/User');
const {
  sendEmail
} = require('../../utils/sendEmail');
const {
  RESET_CODE_EXPIRES_MINUTES,
  generateResetCode
} = require('./resetCode');
const forgotPassword = async (req, res, next) => {
  try {
    const {
      email
    } = req.body;
    if (!email) {
      return res.status(400).json({
        message: 'من فضلك ادخل البريد الإلكتروني'
      });
    }
    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({
      email: normalizedEmail
    });
    const genericMessage = 'لو الإيميل ده مسجل عندنا، هيوصله رمز إعادة تعيين كلمة المرور خلال لحظات.';
    if (!user) {
      return res.status(200).json({
        message: genericMessage
      });
    }
    const code = generateResetCode();
    const hashedCode = await bcrypt.hash(code, 10);
    user.resetPasswordCode = hashedCode;
    user.resetPasswordExpires = new Date(Date.now() + RESET_CODE_EXPIRES_MINUTES * 60 * 1000);
    await user.save();
    try {
      await sendEmail({
        to: user.email,
        subject: 'رمز إعادة تعيين كلمة المرور - اكتشفني',
        html: `
          <div dir="rtl" style="font-family: Tahoma, Arial, sans-serif; background:#0e1011; padding:32px; border-radius:16px; color:#f4f4f4;">
            <h2 style="color:#D4AF37; margin-bottom:8px;">إعادة تعيين كلمة المرور</h2>
            <p style="font-size:14px; color:#ccc;">استخدم الرمز ده عشان تغيّر كلمة المرور بتاعتك. الرمز صالح لمدة ${RESET_CODE_EXPIRES_MINUTES} دقايق بس.</p>
            <div style="background:#1a1d1f; border:1px solid #D4AF37; border-radius:12px; padding:16px; text-align:center; margin:20px 0;">
              <span style="font-size:32px; font-weight:900; letter-spacing:8px; color:#D4AF37;">${code}</span>
            </div>
            <p style="font-size:12px; color:#888;">لو مطلبتش الرمز ده، تجاهل الرسالة دي ببساطة.</p>
          </div>
        `
      });
    } catch (emailError) {
      console.error('Error sending reset email:', emailError);
      return res.status(500).json({
        message: 'تعذر إرسال الإيميل حاليًا. تأكد من إعدادات الإيميل في السيرفر وحاول مرة أخرى.'
      });
    }
    res.status(200).json({
      message: genericMessage
    });
  } catch (error) {
    next(error);
  }
};
module.exports = forgotPassword;
