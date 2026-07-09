const {
  sendEmail
} = require('../../utils/sendEmail');
const {
  buildEmailTemplate
} = require('../../utils/emailTemplates');
const sendPlayerStatusEmail = async ({
  to,
  name,
  kind,
  extra = {}
}) => {
  if (!to) return;
  let title, bodyHtml, accent;
  switch (kind) {
    case 'video_approved':
      title = 'تم قبول فيديو مهاراتك مبدئياً';
      accent = 'green';
      bodyHtml = `مرحباً <strong>${name}</strong>،<br><br>تمت مراجعة فيديو مهاراتك من قِبل اللجنة الفنية وتم اعتماده. ملفك انتقل الآن لمرحلة انتظار تحديد موعد الاختبار الميداني، وسيتم التواصل معك قريباً لتحديد الموعد.`;
      break;
    case 'video_rejected':
      title = 'نتيجة مراجعة فيديو مهاراتك';
      accent = 'red';
      bodyHtml = `مرحباً <strong>${name}</strong>،<br><br>شكراً لتقديمك على منصة اكتشفني. بعد مراجعة فيديو مهاراتك من اللجنة الفنية، لم يجتز ملفك التقييم المبدئي حالياً.<br><br><strong>سبب القرار:</strong> ${extra.rejectionReason || 'غير محدد'}<br><br>يمكنك العمل على تطوير هذه النقاط والتقديم مرة أخرى في أي وقت.`;
      break;
    case 'field_test_scheduled':
      title = 'تم تحديد موعد اختبارك الميداني';
      accent = 'blue';
      bodyHtml = `مرحباً <strong>${name}</strong>،<br><br>تم تحديد موعد اختبارك الميداني كالتالي:<br>الملعب: ${extra.location || '-'}<br>التاريخ: ${extra.date || '-'}<br>التوقيت: ${extra.time || 'سيتم تحديده قريباً'}<br>الكشاف المسؤول: ${extra.coachName || 'اللجنة الفنية'}<br><br>يرجى الحضور في الموعد المحدد.`;
      break;
    case 'final_accepted':
      title = 'قبول نهائي في منصة اكتشفني';
      accent = 'green';
      bodyHtml = `مرحباً <strong>${name}</strong>،<br><br>بعد التقييم الفني والاختبار الميداني، تم اعتماد قبولك نهائياً في منصة اكتشفني. ملفك أصبح الآن متاحاً لجميع الكشافين والأندية المسجلة على المنصة.`;
      break;
    case 'final_rejected':
      title = 'نتيجة القرار الفني النهائي';
      accent = 'red';
      bodyHtml = `مرحباً <strong>${name}</strong>،<br><br>شكراً لمجهودك خلال رحلة التقييم بمنصة اكتشفني. بعد المراجعة النهائية، لم يستوفِ مستواك الحالي شروط القبول النهائي.<br><br>استمر في تطوير مهاراتك الفنية والبدنية، ويمكنك التقديم بطلب جديد لاحقاً.`;
      break;
    default:
      return;
  }
  try {
    await sendEmail({
      to,
      subject: `${title} - اكتشفني`,
      html: buildEmailTemplate({
        title,
        bodyHtml,
        accent
      })
    });
  } catch (err) {
    console.error('تعذر إرسال إيميل حالة اللاعب:', err);
  }
};
module.exports = sendPlayerStatusEmail;
