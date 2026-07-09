const Admin = require('../../model/Admin');
const getAllAdmins = async (req, res, next) => {
  try {
    const admins = await Admin.find();
    res.status(200).json(admins);
  } catch (error) {
    next(error);
  }
};
module.exports = getAllAdmins;
