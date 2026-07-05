// config/db.js

const mongoose = require('mongoose');

// بنستخدم متغير برة الفانكشن عشان يفضل محتفظ بالاتصال بين الـ requests
// المتغير ده بيتخزن في الـ "global" عشان يفضل موجود حتى لو Vercel عمل reuse للـ instance
let cachedConnection = global._mongooseConnection;

if (!cachedConnection) {
  cachedConnection = global._mongooseConnection = { conn: null, promise: null };
}

const connectDB = async () => {
  // لو فيه اتصال جاهز ومحفوظ بالفعل، استخدمه من غير ما تفتح اتصال جديد
  if (cachedConnection.conn) {
    return cachedConnection.conn;
  }

  // لو مفيش promise شغالة، ابدأ اتصال جديد واحفظه
  if (!cachedConnection.promise) {
    cachedConnection.promise = mongoose
      .connect(process.env.DB_URL, {
        bufferCommands: false, // يمنع تراكم queries وهو مستني اتصال لسه مش جاهز
      })
      .then((mongooseInstance) => {
        console.log('✅ MongoDB connected successfully');
        return mongooseInstance;
      })
      .catch((error) => {
        console.error('❌ MongoDB connection failed:', error.message);
        cachedConnection.promise = null; // يسمح بمحاولة اتصال جديدة تانية بدل ما يفضل عالق
        throw error;
      });
  }

  cachedConnection.conn = await cachedConnection.promise;
  return cachedConnection.conn;
};

module.exports = connectDB;