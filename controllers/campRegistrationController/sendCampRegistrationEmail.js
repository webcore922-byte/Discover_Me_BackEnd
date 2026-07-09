const {
  sendEmail
} = require('../../utils/sendEmail');
const {
  buildEmailTemplate
} = require('../../utils/emailTemplates');
const sendCampRegistrationEmail = async (registration, newStatus) => {
  if (!registration?.playerEmail) return;
  const isAccept = newStatus === 'accepted';
  const title = isAccept ? 'تم قبولك في المعسكر التدريبي' : 'نتيجة التسجيل في المعسكر التدريبي';
  const bodyHtml = isAccept ? `مرحباً <strong>${registration.playerName}</strong>،<br><br>تم قبول طلبك في معسكر "<strong>${registration.campTitle}</strong>". سيتواصل معك المدرب المسؤول قريباً لتحديد موعد الانضمام.` : `مرحباً <strong>${registration.playerName}</strong>،<br><br>شكراً لتقديمك في معسكر "<strong>${registration.campTitle}</strong>". لم يتم قبول طلبك في الوقت الحالي، يمكنك المحاولة مرة أخرى في معسكر قادم.`;
  try {
    await sendEmail({
      to: registration.playerEmail,
      subject: `${title} - اكتشفني`,
      html: buildEmailTemplate({
        title,
        bodyHtml,
        accent: isAccept ? 'green' : 'red'
      })
    });
  } catch (err) {
    console.error('تعذر إرسال إيميل تسجيل المعسكر:', err);
  }
};
module.exports = sendCampRegistrationEmail;
