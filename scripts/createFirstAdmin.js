require('dotenv').config();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Admin = require('../model/Admin');
const [,, argUsername, argEmail, argPassword] = process.argv;
const username = argUsername || 'المدير العام';
const email = (argEmail || 'admin@discoverme.com').toLowerCase().trim();
const password = argPassword || 'ChangeMe123!';
const role = 'super_admin';
(async () => {
  try {
    await connectDB();
    const existing = await Admin.findOne({
      email
    });
    if (existing) {
      console.log(`⚠️  فيه أدمن مسجل بالفعل بالإيميل ده (${email}). مفيش داعي تعمل واحد جديد.`);
      process.exit(0);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await Admin.create({
      username,
      email,
      password: hashedPassword,
      role
    });
    console.log('✅ تم إنشاء حساب الأدمن بنجاح!');
    console.log('----------------------------------');
    console.log('الإيميل:   ', admin.email);
    console.log('الباسورد:  ', password, '(احتفظ بيه، مش هيتخزن كنص عادي في الداتابيز)');
    console.log('الصلاحية:  ', admin.role);
    console.log('----------------------------------');
    console.log('دلوقتي تقدر تسجل دخول بيهم في صفحة /login.');
    process.exit(0);
  } catch (error) {
    console.error('❌ حصل خطأ أثناء إنشاء الأدمن:', error.message);
    process.exit(1);
  }
})();
