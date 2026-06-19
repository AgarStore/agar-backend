const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

/**
 * بيرفع صورة على Cloudinary من base64 data URL (جاية من الداش بورد لما
 * المستخدم يختار "رفع من الجهاز") وبيرجع الرابط الجاهز (https://...).
 * بيستخدم f_auto و q_auto عشان الصورة تترفع بأفضل صيغة وحجم تلقائياً.
 */
async function uploadImageToCloudinary(base64DataUrl, folder = 'agar-furniture') {
  if (!base64DataUrl || typeof base64DataUrl !== 'string') {
    throw new Error('لا توجد بيانات صورة لرفعها');
  }

  // لو أصلاً رابط Cloudinary أو رابط عادي (مش base64) سيبه زي ما هو
  if (!base64DataUrl.startsWith('data:')) {
    return base64DataUrl;
  }

  const result = await cloudinary.uploader.upload(base64DataUrl, {
    folder,
    resource_type: 'image',
    transformation: [{ quality: 'auto', fetch_format: 'auto' }],
  });

  return result.secure_url;
}

module.exports = { cloudinary, uploadImageToCloudinary };