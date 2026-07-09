const RESET_CODE_EXPIRES_MINUTES = 10;
const generateResetCode = () => String(Math.floor(100000 + Math.random() * 900000));
module.exports = {
  RESET_CODE_EXPIRES_MINUTES,
  generateResetCode
};
