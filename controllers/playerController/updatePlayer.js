const Player = require('../../model/Player');
const withUserEmail = require('./withUserEmail');
const sendPlayerStatusEmail = require('./sendPlayerStatusEmail');
const updatePlayer = async (req, res, next) => {
  try {
    const updates = {
      ...req.body
    };
    delete updates.userEmail;
    delete updates.user;
    delete updates._id;
    const beforeUpdate = await Player.findById(req.params.id);
    if (!beforeUpdate) return res.status(404).json({
      message: 'اللاعب غير موجود'
    });
    const player = await Player.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true
    }).populate('user', 'email username image');
    if (!player) return res.status(404).json({
      message: 'اللاعب غير موجود'
    });
    const recipientEmail = player.user?.email;
    const statusChanged = updates.status && updates.status !== beforeUpdate.status;
    if (statusChanged && updates.status === 'approved') {
      sendPlayerStatusEmail({
        to: recipientEmail,
        name: player.name,
        kind: 'video_approved'
      });
    } else if (statusChanged && updates.status === 'rejected') {
      sendPlayerStatusEmail({
        to: recipientEmail,
        name: player.name,
        kind: 'video_rejected',
        extra: {
          rejectionReason: player.rejectionReason
        }
      });
    } else if (statusChanged && updates.status === 'final_accepted') {
      sendPlayerStatusEmail({
        to: recipientEmail,
        name: player.name,
        kind: 'final_accepted'
      });
    } else if (statusChanged && updates.status === 'final_rejected') {
      sendPlayerStatusEmail({
        to: recipientEmail,
        name: player.name,
        kind: 'final_rejected'
      });
    } else if (updates.fieldTest && updates.fieldTest.date && updates.fieldTest.location && !beforeUpdate.fieldTest?.date) {
      sendPlayerStatusEmail({
        to: recipientEmail,
        name: player.name,
        kind: 'field_test_scheduled',
        extra: {
          date: updates.fieldTest.date,
          time: updates.fieldTest.time,
          location: updates.fieldTest.location,
          coachName: updates.fieldTest.coachName
        }
      });
    }
    res.status(200).json(withUserEmail(player));
  } catch (error) {
    next(error);
  }
};
module.exports = updatePlayer;
