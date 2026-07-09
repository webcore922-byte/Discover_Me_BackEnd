const {
  uploadToCloudinary
} = require('../middleware/upload');
const ALLOWED_FOLDERS = ['players', 'coaches', 'news', 'products', 'users', 'scoutpro'];
const uploadImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: 'من فضلك اختر صورة قبل الرفع'
      });
    }
    const requestedFolder = (req.body.folder || 'scoutpro').toLowerCase();
    const folder = ALLOWED_FOLDERS.includes(requestedFolder) ? requestedFolder : 'scoutpro';
    const result = await uploadToCloudinary(req.file.buffer, folder);
    res.status(200).json({
      message: 'تم رفع الصورة بنجاح',
      url: result.secure_url
    });
  } catch (error) {
    error.status = 500;
    error.message = 'حصلت مشكلة أثناء رفع الصورة، جرب تاني أو بصورة أصغر حجم';
    next(error);
  }
};
module.exports = {
  uploadImage
};
