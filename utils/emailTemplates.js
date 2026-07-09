const ACCENTS = {
  gold: '#D4AF37',
  green: '#22c55e',
  red: '#ef4444',
  blue: '#3b82f6'
};
const BRAND_NAME = 'منصة اكتشفني';
const buildEmailTemplate = ({
  title,
  bodyHtml,
  accent = 'gold',
  footerNote
}) => {
  const color = ACCENTS[accent] || ACCENTS.gold;
  return `
    <div dir="rtl" style="font-family: Tahoma, Arial, sans-serif; background:#0e1011; padding:32px; border-radius:16px; color:#f4f4f4; max-width:560px; margin:0 auto;">
      <p style="font-size:12px; color:#999; margin:0 0 16px;">${BRAND_NAME}</p>
      <h2 style="color:${color}; margin:0 0 8px; font-size:19px;">${title}</h2>
      <div style="background:#1a1d1f; border:1px solid ${color}; border-radius:12px; padding:20px; margin:20px 0; font-size:14px; line-height:1.9; color:#e5e5e5;">
        ${bodyHtml}
      </div>
      <p style="font-size:12px; color:#888; line-height:1.7; border-top:1px solid #2a2d2f; padding-top:14px;">
        ${footerNote || `وصلتك هذه الرسالة لأنك مسجّل على ${BRAND_NAME}. هذه رسالة تلقائية، من فضلك لا ترد عليها مباشرة إذا كان عندك استفسار تواصل معنا من خلال المنصة.`}
      </p>
    </div>
  `;
};
module.exports = {
  buildEmailTemplate
};
