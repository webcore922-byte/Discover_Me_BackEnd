const nodemailer = require('nodemailer');
let transporter = null;
const getTransporter = () => {
  if (transporter) return transporter;
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error('إعدادات الإيميل غير مكتملة. من فضلك ضيف EMAIL_USER و EMAIL_PASS في ملف .env بتاع الباك إند.');
  }
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
  return transporter;
};
const htmlToPlainText = html => {
  return html.replace(/<br\s*\/?>/gi, '\n').replace(/<\/(p|div|h[1-6]|li)>/gi, '\n').replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/[ \t]+/g, ' ').replace(/\n{3,}/g, '\n\n').trim();
};
const sendEmail = async ({
  to,
  subject,
  html,
  text
}) => {
  const mailer = getTransporter();
  const fromName = process.env.EMAIL_FROM_NAME || 'اكتشفني';
  const replyTo = process.env.EMAIL_REPLY_TO || process.env.EMAIL_USER;
  await mailer.sendMail({
    from: `"${fromName}" <${process.env.EMAIL_USER}>`,
    to,
    replyTo,
    subject,
    html,
    text: text || htmlToPlainText(html)
  });
};
module.exports = {
  sendEmail
};
