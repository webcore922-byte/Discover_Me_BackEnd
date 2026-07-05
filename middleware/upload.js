// middleware/upload.js

const multer = require('multer');
const cloudinary = require('../config/cloudinary');

// بنستخدم memoryStorage عشان الملف يفضل في الـ RAM (buffer) بس
// من غير ما يتكتب على القرص خالص، وده اللي بيخليه شغال على Vercel
const storage = multer.memoryStorage();

// (اختياري) فلترة أنواع الملفات المسموح برفعها
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
  limits: { fileSize: 5 * 1024 * 1024 }, // حد أقصى 5 ميجا للصورة
});

// ================= دالة الرفع الفعلي لـ Cloudinary =================
// بتاخد الـ buffer اللي جاي من multer وترفعه مباشرة لـ cloudinary
// من غير ما تحفظه كملف على القرص في أي خطوة
const uploadToCloudinary = (fileBuffer, folder = 'scoutpro') => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result);
      }
    );
    uploadStream.end(fileBuffer);
  });
};

module.exports = { upload, uploadToCloudinary };