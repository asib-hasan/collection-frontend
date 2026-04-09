const fs = require('fs');

const indexFile = 'c:\\Users\\IT BD\\OneDrive\\Desktop\\loomino\\frontend\\app\\pages\\blog\\index.vue';
let txt = fs.readFileSync(indexFile, 'utf8');

txt = txt.replace(/First Blog Post Title/g, 'Summer Fashion Trends 2025');
txt = txt.replace(/Discover the essentials of writing an impactful blog post that drives traffic and keeps your readers engaged from start to finish./g, 'Discover the essential pieces you need for your summer wardrobe. From lightweight fabrics to vibrant colors, here’s what’s trending.');
txt = txt.replace(/Second Blog Post Title/g, 'The Ultimate Guide to Sustainable Clothing');
txt = txt.replace(/Learn how to craft compelling narratives that resonate with your target audience and build a loyal community around your brand./g, 'Learn how to build an eco-friendly wardrobe that looks amazing while minimizing your environmental footprint.');
txt = txt.replace(/Third Blog Post Title/g, '5 Ways to Style a Classic Denim Jacket');
txt = txt.replace(/A deep dive into modern content strategy and how top-performing brands are winning in the digital landscape today./g, 'The denim jacket is a timeless staple. Here are five creative ways to wear it all year round for any casual occasion.');
txt = txt.replace(/Fourth Blog Post About Technology Trends/g, 'The Evolution of Modern Sneaker Culture');
txt = txt.replace(/Explore the technology trends shaping the future, from AI and automation to immersive experiences and beyond./g, 'Explore how sneakers transitioned from athletic wear to high-fashion staples dominating the streetwear scene today.');
txt = txt.replace(/Fifth Blog Post: Design Inspiration for Developers/g, 'Mastering the Art of Winter Layering');
txt = txt.replace(/Design and development finally united. Here are the top design resources and inspiration hubs every modern developer should bookmark./g, 'Stay warm without sacrificing style. Our experts share the secrets of layering different textures and weights.');
txt = txt.replace(/Sixth Blog Post About Web Development Best Practices/g, 'High Fashion: 2025 Runway Recap');
txt = txt.replace(/Best practices for writing clean, maintainable code that scales with your team and stands the test of time./g, 'A comprehensive breakdown of the most breathtaking collections from recent global fashion weeks.');
txt = txt.replace(/Latest Blog Post/g, 'Building the Perfect Capsule Wardrobe');
txt = txt.replace(/Another Latest Blog Post from this Month/g, 'A Beginner\'s Guide to Color Matching Outfits');
txt = txt.replace(/Top Article Sample/g, 'How to Care for Vintage Clothing');
txt = txt.replace(/Second Top Article Everyone Should Read/g, 'How Accessories Can Transform Any Basic Look');

const imgReplacements = [
  '/images/category-1.webp',
  '/images/category-4.webp',
  '/images/category-5.webp',
  '/images/category-8.png',
  '/images/v-neck-camisole.webp',
  '/images/white-blouse.webp',
  '/images/womens-v-neck-t-shirt.webp',
  '/images/polo-shirt.webp',
  '/images/kids-hoodies.webp'
];
let imgIndex = 0;
txt = txt.replace(/https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9\-]+\?[\w=&\.\-]+/g, () => {
    return imgReplacements[imgIndex++ % imgReplacements.length];
});
fs.writeFileSync(indexFile, txt);

const slugFile = 'c:\\Users\\IT BD\\OneDrive\\Desktop\\loomino\\frontend\\app\\pages\\blog\\[slug].vue';
let slugTxt = fs.readFileSync(slugFile, 'utf8');

slugTxt = slugTxt.replace(/Modern UI Blog Design Trends 2025/g, 'Summer Fashion Trends 2025');
slugTxt = slugTxt.replace(/Explore the latest trends in modern UI design and learn how to create visually stunning websites./g, 'Discover the essential pieces you need for your summer wardrobe. From lightweight fabrics to vibrant colors, here’s what’s trending.');
slugTxt = slugTxt.replace(/UI design is evolving rapidly in 2025\. Designers are focusing on minimalism, vibrant colors, and interactive animations to keep users engaged\./g, 'Fashion is evolving rapidly in 2025. Designers are focusing on comfortable fabrics, vibrant colors, and sustainable clothing to keep users engaged.');
slugTxt = slugTxt.replace(/UI\/UX Tips for Beginners/g, 'Wardrobe Tips for Beginners');
slugTxt = slugTxt.replace(/Responsive Design Best Practices/g, 'Sustainable Clothing Best Practices');
slugTxt = slugTxt.replace(/Web Design Trends 2025/g, 'Fashion Trends 2025');
slugTxt = slugTxt.replace(/Color Theory for Web Designers/g, 'Color Theory for Fashion Lovers');
slugTxt = slugTxt.replace(/Technology &amp; Design/g, 'Fashion &amp; Style');

slugTxt = slugTxt.replace(/https:\/\/images\.unsplash\.com\/photo-(1507003211169-0a1dd7228f2d|1544005313-94ddf0286df2)\?[\w=&\.\-]+/g, '/images/user-avatar.png');

slugTxt = slugTxt.replace(/https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9\-]+\?[\w=&\.\-]+/g, () => {
    return imgReplacements[imgIndex++ % imgReplacements.length];
});

fs.writeFileSync(slugFile, slugTxt);
console.log('Blogs updated successfully!');
