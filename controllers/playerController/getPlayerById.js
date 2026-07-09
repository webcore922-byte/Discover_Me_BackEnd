const Player = require('../../model/Player');
const withUserEmail = require('./withUserEmail');
const getPlayerById = async (req, res, next) => {
  try {
    const player = await Player.findById(req.params.id).populate('user', 'email username image');
    if (!player) return res.status(404).json({
      message: 'اللاعب غير موجود'
    });
    res.status(200).json(withUserEmail(player));
  } catch (error) {
    next(error);
  }
};
module.exports = getPlayerById;
