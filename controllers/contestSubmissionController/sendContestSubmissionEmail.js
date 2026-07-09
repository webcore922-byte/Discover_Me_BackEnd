const {
  sendEmail
} = require('../../utils/sendEmail');
const {
  buildEmailTemplate
} = require('../../utils/emailTemplates');
const sendContestSubmissionEmail = async (submission, newStatus) => {
  if (!submission?.userEmail) return;
  const isWon = newStatus === 'won';
  const title = isWon ? 'مبروك الفوز في المسابقة' : 'نتيجة المشاركة في المسابقة';
  const prizeLine = submission.awardedPrize?.label ? `<br><br>الجائزة الممنوحة: <strong>${submission.awardedPrize.label}: ${submission.awardedPrize.value}</strong>` : '';
  const bodyHtml = isWon ? `مرحباً <strong>${submission.userName}</strong>،<br><br>لقد فزت في مسابقة "<strong>${submission.contestTitle}</strong>" بعد تقييم مشاركتك من اللجنة الفنية.${prizeLine}` : `مرحباً <strong>${submission.userName}</strong>،<br><br>شكراً لمشاركتك في مسابقة "<strong>${submission.contestTitle}</strong>". لم تفز هذه المرة، يمكنك المشاركة في المسابقات القادمة.`;
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
    console.error('تعذر إرسال إيميل نتيجة المسابقة:', err);
  }
};
module.exports = sendContestSubmissionEmail;
