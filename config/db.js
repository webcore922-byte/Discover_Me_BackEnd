const mongoose = require('mongoose');
let cachedConnection = global._mongooseConnection;
if (!cachedConnection) {
  cachedConnection = global._mongooseConnection = {
    conn: null,
    promise: null
  };
}
const connectDB = async () => {
  if (cachedConnection.conn) {
    return cachedConnection.conn;
  }
  if (!cachedConnection.promise) {
    cachedConnection.promise = mongoose.connect(process.env.DB_URL, {
      bufferCommands: false
    }).then(mongooseInstance => {
      console.log('✅ MongoDB connected successfully');
      return mongooseInstance;
    }).catch(error => {
      console.error('❌ MongoDB connection failed:', error.message);
      cachedConnection.promise = null;
      throw error;
    });
  }
  cachedConnection.conn = await cachedConnection.promise;
  return cachedConnection.conn;
};
module.exports = connectDB;
