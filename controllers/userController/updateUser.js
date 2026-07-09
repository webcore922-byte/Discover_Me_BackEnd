const bcrypt = require('bcrypt');
const User = require('../../model/User');
const updateUser = async (req, res, next) => {
  try {
    if (req.userType !== 'admin' && req.user._id.toString() !== req.params.id) {
      return res.status(403).json({
        message: 'مش مسموح تعدل بيانات حساب تاني'
      });
    }
    const updates = {
      ...req.body
    };
    delete updates.email;
    delete updates._id;
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true
    });
    if (!updatedUser) {
      return res.status(404).json({
        message: 'اليوزر غير موجود'
      });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};
module.exports = updateUser;
