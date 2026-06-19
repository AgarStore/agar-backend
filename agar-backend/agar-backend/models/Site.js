const mongoose = require('mongoose');

/* ════════════════════════════════════════════════════════════
   ملحوظة مهمة: الـ Schema ده بـ strict:false في الأماكن المرنة
   عشان يطابق بالظبط الشكل اللي الفرونت اند والداش بورد بيتوقعوه
   (كل عنصر فيه id, name_en, name_ar... إلخ) من غير ما نحبس نفسنا
   في تفاصيل زيادة ممكن تضيف حقل جديد من الداش بورد بعدين.
════════════════════════════════════════════════════════════ */

const ItemSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    name_en: { type: String, default: '' },
    name_ar: { type: String, default: '' },
    img: { type: String, default: '' },
  },
  { _id: false, strict: false }
);

const FolderSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    name_en: { type: String, default: '' },
    name_ar: { type: String, default: '' },
    cover: { type: String, default: '' },
    items: { type: [ItemSchema], default: [] },
  },
  { _id: false, strict: false }
);

const CategorySchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    name_en: { type: String, default: '' },
    name_ar: { type: String, default: '' },
    cover: { type: String, default: '' },
    itemsLabel_en: { type: String, default: '' },
    itemsLabel_ar: { type: String, default: '' },
    folders: { type: [FolderSchema], default: [] },
  },
  { _id: false, strict: false }
);

const HeroSlideSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    img: { type: String, default: '' },
    title_en: { type: String, default: '' },
    title_ar: { type: String, default: '' },
  },
  { _id: false, strict: false }
);

const ProductSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    name_en: { type: String, default: '' },
    name_ar: { type: String, default: '' },
    cat_en: { type: String, default: '' },
    cat_ar: { type: String, default: '' },
    img: { type: String, default: '' },
  },
  { _id: false, strict: false }
);

const TeamMemberSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    name: { type: String, default: '' },
    role_en: { type: String, default: '' },
    role_ar: { type: String, default: '' },
    img: { type: String, default: '' },
  },
  { _id: false, strict: false }
);

const PartnerSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    name: { type: String, default: '' },
    img: { type: String, default: '' },
  },
  { _id: false, strict: false }
);

const SiteSchema = new mongoose.Schema(
  {
    // معرّف ثابت عشان نضمن إن في document واحد بس في الداتابيز
    slug: { type: String, default: 'main', unique: true, index: true },

    heroSlides: { type: [HeroSlideSchema], default: [] },
    categories: { type: [CategorySchema], default: [] },
    products: { type: [ProductSchema], default: [] },
    team: { type: [TeamMemberSchema], default: [] },
    partners: { type: [PartnerSchema], default: [] },

    // الترجمات شكلها { key: { en, ar } } كـ plain object عادي
    // (مستخدمين Mixed بدل Map عشان تتحول JSON زي ما الفرونت اند محتاجها بالظبط)
    translations: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  { timestamps: true, minimize: false }
);

module.exports = mongoose.models.Site || mongoose.model('Site', SiteSchema);