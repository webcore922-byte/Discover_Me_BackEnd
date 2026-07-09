const multer = require('multer');
const cloudinary = require('../config/cloudinary');
const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('نوع الملف غير مسموح به، الرجاء رفع صورة فقط'), false);
  }
};
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024
  }
});
const uploadToCloudinary = (fileBuffer, folder = 'scoutpro') => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream({
      folder
    }, (error, result) => {
      if (error) {
        return reject(error);
      }
      resolve(result);
    });
    uploadStream.end(fileBuffer);
  });
};
const processImageUpload = (folder = 'scoutpro') => {
  return async (req, res, next) => {
    try {
      if (req.file) {
        const result = await uploadToCloudinary(req.file.buffer, folder);
        req.body.image = result.secure_url;
      }
      next();
    } catch (error) {
      error.status = 500;
      error.message = 'حصلت مشكلة أثناء رفع الصورة، جرب تاني أو بصورة أصغر حجم';
      next(error);
    }
  };
};
module.exports = {
  upload,
  uploadToCloudinary,
  processImageUpload
};
