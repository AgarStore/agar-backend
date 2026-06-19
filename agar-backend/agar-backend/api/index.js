const express = require('express');
const cors = require('cors');
const connectDB = require('../lib/db');
const Site = require('../models/Site');
const { processSiteImages } = require('../lib/processImages');
const { getDefaultSiteData } = require('../lib/defaultData');

const app = express();

/* ════════════════════════════════════════════════════════════
   إعدادات عامة
════════════════════════════════════════════════════════════ */
app.use(cors()); // مفتوح للجميع حالياً (مفيش لوجين على الداش بورد)
app.use(express.json({ limit: '25mb' })); // لازم limit كبير عشان الصور base64

/* ════════════════════════════════════════════════════════════
   Middleware: يتأكد إننا متصلين بالداتابيز قبل أي route
════════════════════════════════════════════════════════════ */
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error('DB connection error:', err);
    res.status(500).json({ message: 'فشل الاتصال بقاعدة البيانات. تأكد من MONGODB_URI.' });
  }
});

/* ════════════════════════════════════════════════════════════
   Helper: بيرجع أول document، ولو مش موجود بيعمل واحد بالـ default
════════════════════════════════════════════════════════════ */
async function getOrCreateSite() {
  let site = await Site.findOne({ slug: 'main' });
  if (!site) {
    site = await Site.create(getDefaultSiteData());
  }
  return site;
}

/* ════════════════════════════════════════════════════════════
   GET /api/agar/site
   بيرجع بيانات الموقع كاملة — ده اللي بيستخدمه index.html (الموقع)
   والداش بورد لتحميل البيانات الحالية
════════════════════════════════════════════════════════════ */
app.get('/api/agar/site', async (req, res) => {
  try {
    const site = await getOrCreateSite();
    res.json(site.toObject({ versionKey: false }));
  } catch (err) {
    console.error('GET /site error:', err);
    res.status(500).json({ message: err.message || 'حدث خطأ أثناء جلب البيانات' });
  }
});

/* ════════════════════════════════════════════════════════════
   PUT /api/agar/site
   بيحفظ تعديلات الداش بورد. بيرفع أي صور base64 على Cloudinary
   أولاً، وبعدين يحفظ الـ document بالكامل في MongoDB
════════════════════════════════════════════════════════════ */
app.put('/api/agar/site', async (req, res) => {
  try {
    const { heroSlides, categories, products, team, partners, translations } = req.body;

    const payload = { heroSlides, categories, products, team, partners, translations };

    // يرفع أي صورة base64 موجودة جوه أي حقل (img/cover) على Cloudinary
    // ويستبدلها برابط نهائي قبل ما نحفظ في الداتابيز
    await processSiteImages(payload);

    let site = await Site.findOne({ slug: 'main' });
    if (!site) {
      site = new Site({ slug: 'main' });
    }

    if (payload.heroSlides !== undefined) site.heroSlides = payload.heroSlides;
    if (payload.categories !== undefined) site.categories = payload.categories;
    if (payload.products !== undefined) site.products = payload.products;
    if (payload.team !== undefined) site.team = payload.team;
    if (payload.partners !== undefined) site.partners = payload.partners;
    if (payload.translations !== undefined) {
      site.translations = payload.translations;
      site.markModified('translations'); // ضروري لأن translations نوعه Mixed
    }

    await site.save();
    res.json(site.toObject({ versionKey: false }));
  } catch (err) {
    console.error('PUT /site error:', err);
    res.status(500).json({ message: err.message || 'حدث خطأ أثناء حفظ البيانات' });
  }
});

/* ════════════════════════════════════════════════════════════
   POST /api/agar/site/reset
   بيرجع كل البيانات للقيم الافتراضية (زرار "Default" في الداش بورد)
════════════════════════════════════════════════════════════ */
app.post('/api/agar/site/reset', async (req, res) => {
  try {
    const defaults = getDefaultSiteData();
    let site = await Site.findOne({ slug: 'main' });

    if (!site) {
      site = await Site.create(defaults);
    } else {
      site.heroSlides = defaults.heroSlides;
      site.categories = defaults.categories;
      site.products = defaults.products;
      site.team = defaults.team;
      site.partners = defaults.partners;
      site.translations = defaults.translations;
      site.markModified('translations');
      await site.save();
    }

    res.json({ site: site.toObject({ versionKey: false }) });
  } catch (err) {
    console.error('POST /site/reset error:', err);
    res.status(500).json({ message: err.message || 'حدث خطأ أثناء استرجاع البيانات الافتراضية' });
  }
});

/* ════════════════════════════════════════════════════════════
   Health check بسيط — يفيد للتأكد إن السيرفر شغال والمتغيرات مظبوطة
════════════════════════════════════════════════════════════ */
app.get('/api/health', (req, res) => {
  res.json({
    ok: true,
    mongoConfigured: !!process.env.MONGODB_URI,
    cloudinaryConfigured: !!(
      process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET
    ),
  });
});

/* 404 افتراضي لأي route غير معروف تحت /api */
app.use('/api', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

module.exports = app;