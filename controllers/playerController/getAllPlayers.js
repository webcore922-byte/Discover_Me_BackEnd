const Player = require('../../model/Player');
const withUserEmail = require('./withUserEmail');
const getAllPlayers = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    let query = Player.find(filter).populate('user', 'email username image');
    let players = await query;
    if (req.query.userEmail) {
      const email = req.query.userEmail.toLowerCase().trim();
      players = players.filter(p => p.user?.email?.toLowerCase() === email);
    }
    res.status(200).json(players.map(withUserEmail));
  } catch (error) {
    next(error);
  }
};
module.exports = getAllPlayers;
