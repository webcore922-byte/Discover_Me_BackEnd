// api/index.js

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('../config/db');

// ================= استدعاء الراوتس =================
const userRoutes = require('../routes/userRoutes');
const playerRoutes = require('../routes/playerRoutes');
const adminRoutes = require('../routes/adminRoutes');
const coachRoutes = require('../routes/coachRoutes');
const consultantRoutes = require('../routes/consultantRoutes');
const fieldTesterRoutes = require('../routes/fieldTesterRoutes');
const campRoutes = require('../routes/campRoutes');
const campRegistrationRoutes = require('../routes/campRegistrationRoutes');
const contestRoutes = require('../routes/contestRoutes');
const contestSubmissionRoutes = require('../routes/contestSubmissionRoutes');
const annualLeagueRoutes = require('../routes/annualLeagueRoutes');
const newsRoutes = require('../routes/newsRoutes');
const productRoutes = require('../routes/productRoutes');
const orderRoutes = require('../routes/orderRoutes');
const shippingRateRoutes = require('../routes/shippingRateRoutes');
const contactRoutes = require('../routes/contactRoutes');

// ================= إعداد التطبيق =================
const app = express();

// ================= Middlewares عامة =================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// بيتأكد إن الاتصال بقاعدة البيانات جاهز قبل ما يكمل لأي راوت
// بفضل الـ caching في db.js، ده مش هيفتح اتصال جديد في كل request،
// هيستخدم نفس الاتصال المحفوظ إلا لو مش موجود أصلاً
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    next(error);
  }
});

// ================= تسجيل الراوتس =================
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/players', playerRoutes);
app.use('/api/v1/admins', adminRoutes);
app.use('/api/v1/coaches', coachRoutes);
app.use('/api/v1/consultants', consultantRoutes);
app.use('/api/v1/field-testers', fieldTesterRoutes);
app.use('/api/v1/camps', campRoutes);
app.use('/api/v1/camp-registrations', campRegistrationRoutes);
app.use('/api/v1/contests', contestRoutes);
app.use('/api/v1/contest-submissions', contestSubmissionRoutes);
app.use('/api/v1/annual-league-submissions', annualLeagueRoutes);
app.use('/api/v1/news', newsRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/shipping-rates', shippingRateRoutes);
app.use('/api/v1/contact', contactRoutes);

// ================= Route تجريبي للتأكد إن السيرفر شغال =================
app.get('/', (req, res) => {
  res.json({ message: 'ScoutPro API is running ✅' });
});

// ================= هاندلر لو الراوت مش موجود (404) =================
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// ================= هاندلر عام للأخطاء =================
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'حدث خطأ في السيرفر',
  });
});

// ================= تشغيل السيرفر محليًا فقط =================
// لو شغال على جهازك (localhost)، الكود ده هيشغل السيرفر عادي
// لو مرفوع على Vercel، Vercel مش بيدخل هنا خالص، هو بيستخدم الـ export تحت مباشرة
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  connectDB()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`🚀 Server is running on port ${PORT}`);
      });
    })
    .catch((error) => {
      console.error('فشل تشغيل السيرفر بسبب مشكلة في الاتصال:', error.message);
      process.exit(1);
    });
}

// ده اللي Vercel محتاجه عشان يشغل الـ app كـ serverless function
module.exports = app;