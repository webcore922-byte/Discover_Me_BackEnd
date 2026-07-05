const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true, // هيتخزن بعد ما يتعمله hash بـ bcrypt في الـ controller
    },
    phone: {
      type: String,
      trim: true,
    },
    image: {
      type: String, // هيبقى لينك cloudinary بعد الرفع
      default: '',
    },
  },
  { timestamps: true } // بيضيف createdAt و updatedAt تلقائي
);

module.exports = mongoose.model('User', userSchema);