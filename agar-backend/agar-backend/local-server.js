/* ════════════════════════════════════════════════════════════
   ده ملف للتشغيل على جهازك أنت بس (للتجربة قبل الرفع على Vercel).
   شغّله بـ: npm start
   مش بيتاستخدم في Vercel — هناك api/index.js هو اللي بيشتغل مباشرة.
════════════════════════════════════════════════════════════ */
require('dotenv').config();
const app = require('./api/index.js');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ AGAR backend شغال محلياً على http://localhost:${PORT}`);
  console.log(`   جرب: http://localhost:${PORT}/api/health`);
  console.log(`   بيانات الموقع: http://localhost:${PORT}/api/agar/site`);
});