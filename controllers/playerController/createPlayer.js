const Player = require('../../model/Player');
const User = require('../../model/User');
const withUserEmail = require('./withUserEmail');
const createPlayer = async (req, res, next) => {
  try {
    const {
      userEmail,
      user: userId,
      name
    } = req.body;
    if (!name || !userEmail && !userId) {
      return res.status(400).json({
        message: 'من فضلك ادخل كل البيانات المطلوبة'
      });
    }
    let resolvedUserId = userId;
    if (!resolvedUserId && userEmail) {
      const userDoc = await User.findOne({
        email: userEmail.toLowerCase().trim()
      });
      if (!userDoc) return res.status(404).json({
        message: 'اليوزر غير موجود'
      });
      resolvedUserId = userDoc._id;
    }
    const existing = await Player.findOne({
      user: resolvedUserId,
      status: {
        $in: ['pending', 'approved', 'final_accepted']
      }
    });
    if (existing) {
      return res.status(409).json({
        message: 'عندك بالفعل بروفايل لاعب مسجل'
      });
    }
    const playerData = {
      ...req.body,
      user: resolvedUserId
    };
    delete playerData.userEmail;
    const player = await Player.create(playerData);
    const populated = await player.populate('user', 'email username image');
    res.status(201).json(withUserEmail(populated));
  } catch (error) {
    next(error);
  }
};
module.exports = createPlayer;
