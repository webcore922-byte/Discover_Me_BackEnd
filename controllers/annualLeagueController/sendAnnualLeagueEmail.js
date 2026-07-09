const {
  sendEmail
} = require('../../utils/sendEmail');
const {
  buildEmailTemplate
} = require('../../utils/emailTemplates');
const sendAnnualLeagueEmail = async (submission, newStatus) => {
  if (!submission?.userEmail) return;
  const isWon = newStatus === 'won';
  const title = isWon ? 'تم قبول مشاركتك في الدوري السنوي' : 'نتيجة طلب المشاركة في الدوري السنوي';
  const bodyHtml = isWon ? `مرحباً <strong>${submission.userName}</strong>،<br><br>تم تأكيد مشاركتك في "<strong>${submission.leagueTitle}</strong>". سيتم التواصل معك قريباً بتفاصيل المباريات والمواعيد.` : `مرحباً <strong>${submission.userName}</strong>،<br><br>شكراً لتقديمك للمشاركة في "<strong>${submission.leagueTitle}</strong>". تم استبعاد طلبك هذه المرة، يمكنك المحاولة في الموسم القادم.`;
  try {
    await sendEmail({
      to: submission.userEmail,
      subject: `${title} - اكتشفني`,
      html: buildEmailTemplate({
        title,
        bodyHtml,
        accent: isWon ? 'green' : 'red'
      })
    });
  } catch (err) {
    console.error('تعذر إرسال إيميل الدوري السنوي:', err);
  }
};
module.exports = sendAnnualLeagueEmail;
