const {
  sendEmail
} = require('../../utils/sendEmail');
const {
  buildEmailTemplate
} = require('../../utils/emailTemplates');
const ORDER_STATUS_INFO = require('./orderStatusInfo');
const sendOrderStatusEmail = async (order, status) => {
  if (!order?.userEmail) return;
  const info = ORDER_STATUS_INFO[status];
  if (!info) return;
  try {
    await sendEmail({
      to: order.userEmail,
      subject: `${info.title} - اكتشفني`,
      html: buildEmailTemplate({
        title: info.title,
        bodyHtml: info.body(order),
        accent: info.accent
      })
    });
  } catch (err) {
    console.error('تعذر إرسال إيميل حالة الأوردر:', err);
  }
};
module.exports = sendOrderStatusEmail;
