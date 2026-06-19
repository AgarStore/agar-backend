/* ════════════════════════════════════════════════════════════
   البيانات الافتراضية (Default Data)
   بتتستخدم في حالتين:
   1) أول مرة السيرفر يشتغل ومفيش document في الداتابيز خالص
      → بيتعمل واحد تلقائي بالبيانات دي
   2) لما تضغط زرار "Default" في الداش بورد (POST /api/agar/site/reset)
      → كل حاجة ترجع للقيم دي

   عدّل النصوص والصور هنا براحتك، أو ببساطة ابني المحتوى بالكامل
   من الداش بورد بعد أول نشر (مفيش داعي تيجي تعدل هنا أصلاً).
════════════════════════════════════════════════════════════ */

const uid = (prefix) => `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

function getDefaultSiteData() {
  return {
    slug: 'main',

    heroSlides: [
      {
        id: uid('hs'),
        img: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=1600&q=80',
        title_en: 'Find the Perfect Balance of Comfort and Style',
        title_ar: 'اكتشف التوازن المثالي بين الراحة والأناقة',
      },
      {
        id: uid('hs'),
        img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1600&q=80',
        title_en: 'Timeless Pieces for Every Room',
        title_ar: 'قطع خالدة لكل ركن في منزلك',
      },
    ],

    categories: [
      {
        id: uid('cat'),
        name_en: 'Living Room',
        name_ar: 'غرفة المعيشة',
        cover: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
        itemsLabel_en: '120 Items',
        itemsLabel_ar: '١٢٠ قطعة',
        folders: [],
      },
      {
        id: uid('cat'),
        name_en: 'Bedroom',
        name_ar: 'غرفة النوم',
        cover: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80',
        itemsLabel_en: '85 Items',
        itemsLabel_ar: '٨٥ قطعة',
        folders: [],
      },
    ],

    products: [],
    team: [],
    partners: [],

    translations: {
      nav_home: { en: 'Home', ar: 'الرئيسية' },
      nav_category: { en: 'Category', ar: 'الأقسام' },
      nav_about: { en: 'About Us', ar: 'من نحن' },
      hero_subtitle: { en: 'Discover timeless pieces for every room in your Home', ar: 'اكتشف قطعًا خالدة لكل ركن في منزلك' },
      hero_title: { en: 'Find the Perfect Balance of Comfort and Style with <strong>Our Curated Collection.</strong>', ar: 'اعثر على التوازن المثالي بين الراحة والأناقة مع <strong>تشكيلتنا المختارة.</strong>' },
      card_title: { en: 'High-Quality Furniture', ar: 'أثاث عالي الجودة' },
      card_desc: { en: 'Discover timeless pieces for every room in your Home', ar: 'اكتشف قطعًا خالدة لكل ركن في منزلك' },
      shop_now: { en: 'Shop Now', ar: 'تسوق الآن' },
      feat1_title: { en: 'Premium Quality', ar: 'جودة ممتازة' },
      feat1_desc: { en: 'Every piece is crafted from the finest materials, ensuring durability and lasting beauty.', ar: 'كل قطعة مصنوعة من أجود الخامات لضمان المتانة والجمال الدائم.' },
      feat2_title: { en: 'Fast Delivery', ar: 'توصيل سريع' },
      feat2_desc: { en: 'We provide fast and reliable delivery services, ensuring your furniture arrives on time and in perfect condition.', ar: 'نوفر خدمة توصيل سريعة وموثوقة لضمان وصول الأثاث في الموعد وبحالة ممتازة.' },
      feat3_title: { en: 'Expert Advice', ar: 'استشارة متخصصة' },
      feat3_desc: { en: 'Our interior design consultants help you find the perfect fit for your space and taste.', ar: 'مستشارو التصميم الداخلي لدينا يساعدونك في إيجاد الأنسب لمساحتك وذوقك.' },
      elegant: { en: 'Elegant', ar: 'تصاميم' },
      designs: { en: 'Designs', ar: 'أنيقة' },
      view_all: { en: 'View All →', ar: 'عرض الكل ←' },
      our_partners: { en: 'Our Partners', ar: 'شركاؤنا' },
      footer_copy: { en: '© 2025 AGAR Furniture Store. All rights reserved.', ar: '© 2025 متجر أجار للأثاث. جميع الحقوق محفوظة.' },
      cat_explore: { en: 'Explore Our', ar: 'استكشف' },
      cat_title: { en: 'Furniture<br>Categories.', ar: 'أقسام<br>الأثاث.' },
      cat_tagline: { en: 'Timeless pieces, thoughtfully<br>curated for every room.', ar: 'قطع خالدة، مختارة بعناية<br>لكل ركن في منزلك.' },
      cat_all: { en: 'All Categories', ar: 'كل الأقسام' },
      browse_space: { en: 'Browse by Space', ar: 'تصفح حسب المساحة' },
      explore_cats: { en: 'Explore Our<br><strong>Furniture Categories.</strong>', ar: 'استكشف<br><strong>أقسام الأثاث.</strong>' },
      back: { en: 'Back', ar: 'رجوع' },
      items_label: { en: 'Items', ar: 'قطعة' },
      location: { en: 'Location', ar: 'الموقع' },
      about_h1: { en: 'Crafting Spaces,<br><em>Inspiring Lives</em><br>Since 2010', ar: 'نصنع المساحات،<br><em>ونلهم الحياة</em><br>منذ ٢٠١٠' },
      about_p1: { en: "AGAR was founded on a simple belief: that great furniture doesn't just fill a room — it defines how you live in it.", ar: 'تأسس أجار على فكرة بسيطة: الأثاث الرائع لا يملأ الغرفة فقط، بل يحدد طريقة عيشك فيها.' },
      about_p2: { en: "From our flagship showroom in Cairo to homes across the region, we've helped over 15,000 customers transform their spaces.", ar: 'من معرضنا الرئيسي في القاهرة إلى المنازل في جميع أنحاء المنطقة، ساعدنا أكثر من ١٥,٠٠٠ عميل على تحويل مساحاتهم.' },
      stat1: { en: 'Happy Customers', ar: 'عميل سعيد' },
      stat2: { en: 'Products', ar: 'منتج' },
      stat3: { en: 'Years of Experience', ar: 'سنوات خبرة' },
      stat4: { en: 'Showrooms', ar: 'معرض' },
      team_title: { en: 'Meet Our Team', ar: 'تعرف على فريقنا' },
      team_sub: { en: "The people behind AGAR's vision and craftsmanship", ar: 'الأشخاص وراء رؤية وحرفية أجار' },
      values_title: { en: 'What We<br>Stand For', ar: 'ما نؤمن<br>به' },
      val1_title: { en: 'Uncompromising Quality', ar: 'جودة لا تقبل المساومة' },
      val1_desc: { en: 'We source from certified manufacturers and inspect every item before it reaches your home. No shortcuts — ever.', ar: 'نختار من مصنعين معتمدين ونفحص كل قطعة قبل وصولها لمنزلك. بدون اختصارات أبداً.' },
      val2_title: { en: 'Timeless Design', ar: 'تصميم خالد' },
      val2_desc: { en: 'Trends come and go. We curate pieces that remain beautiful, functional, and relevant for decades.', ar: 'الموضة تأتي وتذهب، ونحن نختار قطعًا تبقى جميلة وعملية لعقود.' },
      val3_title: { en: 'Customer First', ar: 'العميل أولاً' },
      val3_desc: { en: 'From first browse to after-sale support, your satisfaction drives every decision we make.', ar: 'من أول تصفح حتى خدمة ما بعد البيع، رضاك هو ما يقود كل قرار نتخذه.' },
      val4_title: { en: 'Sustainable Sourcing', ar: 'مصادر مستدامة' },
      val4_desc: { en: 'We partner with suppliers who respect the environment, prioritising responsibly harvested wood and eco-friendly finishes.', ar: 'نتعاون مع موردين يحترمون البيئة، مع الأولوية للخشب المستدام والتشطيبات الصديقة للبيئة.' },
    },
  };
}

module.exports = { getDefaultSiteData };