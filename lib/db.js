const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  // مش بنرمي error هنا عشان الملف ميوقعش وقت الـ build،
  // الخطأ هيظهر بوضوح أول ما حد يحاول يتصل بالداتابيز فعلاً.
  console.warn('⚠️  MONGODB_URI is not set in environment variables.');
}

/* ════════════════════════════════════════════════════════════
   Serverless functions (زي Vercel) بتشغّل نفس الكود كذا مرة،
   فلازم نعمل "cache" للاتصال عشان منعملش اتصال جديد كل request
   (ده بيبطئ الأداء جداً ولو معملناهوش ممكن نضرب حد اتصالات Atlas)
════════════════════════════════════════════════════════════ */
let cached = global.__agarMongooseCache;
if (!cached) {
  cached = global.__agarMongooseCache = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    mongoose.set('strictQuery', true);
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        bufferCommands: false,
        serverSelectionTimeoutMS: 10000,
      })
      .then((m) => m);
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null;
    throw err;
  }

  return cached.conn;
}

module.exports = connectDB;