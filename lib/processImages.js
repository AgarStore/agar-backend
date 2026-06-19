const { uploadImageToCloudinary } = require('./cloudinary');

/* ════════════════════════════════════════════════════════════
   الداش بورد بترسل الصور بشكلين:
   1) رابط URL عادي (المستخدم لصق رابط)        → نسيبه زي ما هو
   2) base64 data URL (المستخدم رفع من جهازه)   → نرفعها Cloudinary
      ونستبدلها بالرابط النهائي قبل الحفظ في MongoDB

   الحقول دي بتظهر في أماكن كتير في الـ payload:
   heroSlides[].img , categories[].cover , categories[].folders[].cover,
   categories[].folders[].items[].img , products[].img , team[].img , partners[].img

   بدل ما نكتب كود مكرر لكل حقل، الفنكشن دي بتدور على أي مفتاح
   اسمه img أو cover وقيمته base64 وبترفعه تلقائياً، أياً كان عمقه
   في الكائن (نفعها بالذات مع الفولدرز/آيتمز المتداخلة جوه الكاتيجوريز).
════════════════════════════════════════════════════════════ */

const IMAGE_KEYS = new Set(['img', 'cover']);

async function processImagesInPlace(node) {
  if (Array.isArray(node)) {
    for (const item of node) {
      await processImagesInPlace(item);
    }
    return;
  }

  if (node && typeof node === 'object') {
    for (const key of Object.keys(node)) {
      const value = node[key];

      if (IMAGE_KEYS.has(key) && typeof value === 'string' && value.startsWith('data:')) {
        node[key] = await uploadImageToCloudinary(value);
      } else if (value && typeof value === 'object') {
        await processImagesInPlace(value);
      }
    }
  }
}

/**
 * بتاخد الـ site payload كامل (heroSlides, categories, products, team, partners)
 * وبترفع أي صورة base64 موجودة جواها على Cloudinary، وبترجع نفس الكائن
 * بعد ما استبدلت كل الصور بروابط Cloudinary نهائية.
 */
async function processSiteImages(sitePayload) {
  const keysToProcess = ['heroSlides', 'categories', 'products', 'team', 'partners'];
  for (const key of keysToProcess) {
    if (sitePayload[key]) {
      await processImagesInPlace(sitePayload[key]);
    }
  }
  return sitePayload;
}

module.exports = { processSiteImages };