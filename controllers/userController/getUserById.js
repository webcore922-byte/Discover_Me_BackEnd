const User = require('../../model/User');
const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        message: 'اليوزر غير موجود'
      });
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
module.exports = getUserById;
