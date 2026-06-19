# AGAR Backend — دليل النشر

Backend بـ Express + MongoDB (Mongoose) + Cloudinary، مُصمم للنشر على Vercel كـ serverless function.

## الهيكل

```
agar-backend/
├── api/
│   └── index.js          ← نقطة الدخول (Express app, مُصدّرة كـ module.exports = app)
├── lib/
│   ├── db.js              ← الاتصال بـ MongoDB (مع caching للـ serverless)
│   ├── cloudinary.js      ← رفع الصور base64 إلى Cloudinary
│   ├── defaultData.js     ← البيانات الافتراضية (Default / Seed)
│   └── processImages.js   ← يدور على أي صورة base64 في الـ payload ويرفعها
├── models/
│   └── Site.js             ← Mongoose Schema
├── local-server.js         ← للتشغيل المحلي فقط (npm start) — Vercel مش بيستخدمه
├── package.json
├── vercel.json
├── .env.example            ← نموذج للمتغيرات البيئية (انسخه إلى .env محلياً)
└── .gitignore
```

## 1) إعداد MongoDB Atlas

1. اعمل حساب على https://mongodb.com/atlas (الباقة المجانية M0 كافية)
2. اعمل Cluster جديد
3. Database Access → اعمل مستخدم جديد بباسورد
4. Network Access → Allow Access from Anywhere (0.0.0.0/0) — ضروري لأن Vercel IPs متغيرة
5. Connect → Drivers → نسخ الـ connection string، شكله:
   ```
   mongodb+srv://USERNAME:PASSWORD@cluster0.xxxxx.mongodb.net/agar?retryWrites=true&w=majority
   ```

## 2) إعداد Cloudinary

1. اعمل حساب مجاني على https://cloudinary.com
2. من الـ Dashboard، هتلاقي:
   - Cloud Name
   - API Key
   - API Secret

## 3) التشغيل المحلي (اختياري، للتجربة قبل النشر)

```bash
npm install
cp .env.example .env
# عبّي القيم الحقيقية في .env
npm start
```

جرب:
- http://localhost:3000/api/health
- http://localhost:3000/api/agar/site

## 4) النشر على Vercel

1. ادفع الكود إلى GitHub (تأكد إن `.env` و `node_modules` متستبعدين — موجودين في `.gitignore` بالفعل)
2. على https://vercel.com → Add New Project → اختار الـ repo
3. **قبل الضغط على Deploy**، روح على Environment Variables وضيف:

   | Key | Value |
   |---|---|
   | `MONGODB_URI` | الـ connection string من Atlas |
   | `CLOUDINARY_CLOUD_NAME` | من Cloudinary |
   | `CLOUDINARY_API_KEY` | من Cloudinary |
   | `CLOUDINARY_API_SECRET` | من Cloudinary |

4. اضغط Deploy
5. بعد ما يخلص، جرب:
   ```
   https://your-project.vercel.app/api/health
   ```
   لازم يرجع:
   ```json
   {"ok":true,"mongoConfigured":true,"cloudinaryConfigured":true}
   ```

## 5) ربط الفرونت اند (الموقع + الداش بورد)

- ملف الموقع (`Site.js` / index.html) بيعمل `fetch('/api/agar/site')` برابط نسبي — هيشتغل تلقائي **لو** الموقع منشور على نفس دومين الباك اند في Vercel.
- لو الموقع منشور على دومين/مشروع تاني، لازم تغيّر:
  - في كود الموقع: `fetch('/api/agar/site')` → `fetch('https://your-backend.vercel.app/api/agar/site')`
  - في الداش بورد: متغير `API_BASE` في أول السكريبت، غيّره لرابط الباك اند الحقيقي بدل `https://agar-backend.vercel.app/api/agar/site`

## ملاحظات

- `scripts.seed` في `package.json` بيشاور على `scripts/seed.js` غير موجود فعلياً — البيانات الافتراضية بتتعمل تلقائياً أول ما أي request يجي على `/api/agar/site` ومفيش document في الداتابيز (عبر `getOrCreateSite()`)، فمش لازم سكريبت seed منفصل.
- `multer` موجودة في dependencies بس مش مستخدمة فعلياً (الرفع بيتم بـ base64 مباشرة)، ممكن تشيلها من `package.json` لو عايز تقلل حجم الـ install، بس وجودها ملوش أي ضرر.
