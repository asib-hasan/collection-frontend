<script setup>
useHead({ title: "CCollection - Luxury Dresses for Prom, Wedding & More" });
</script>

<template>
   <div class="home-container">
      <!-- HERO SECTION -->
      <section class="hero-section">
         <video autoplay muted loop playsinline preload="auto" poster="/images/wedding-2026.webp" class="hero-video">
            <source src="/images/video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
         </video>
         <div class="hero-content">
            <h1 class="hero-title">THE 2026 COLLECTION</h1>
            <p class="hero-subtitle">Discover luxury styles engineered for your unforgettable moments.</p>
            <div class="hero-buttons">
               <NuxtLink to="/products?category=Prom+2026" class="cc-btn primary">SHOP PROM</NuxtLink>
               <NuxtLink to="/products?category=Bridal" class="cc-btn outline">SHOP WEDDING</NuxtLink>
            </div>
         </div>
         <div class="hero-overlay"></div>
      </section>

      <!-- CATEGORIES SECTION -->
      <section class="home-section cc-categories">
         <div class="section-heading">
            <h2>SHOP BY CATEGORY</h2>
            <div class="heading-line"></div>
         </div>
         <div class="category-grid">
            <NuxtLink to="/products?category=Prom+2026" class="cat-card">
               <div class="cat-img-wrapper">
                  <img src="/images/image2.webp" alt="Prom 2026" />
               </div>
               <div class="cat-label"><span>PROM 2026</span></div>
            </NuxtLink>
            <NuxtLink to="/products?category=Homecoming" class="cat-card">
               <div class="cat-img-wrapper">
                  <img src="/images/image5.webp" alt="Homecoming" />
               </div>
               <div class="cat-label"><span>HOMECOMING</span></div>
            </NuxtLink>
            <NuxtLink to="/products?category=Bridal" class="cat-card">
               <div class="cat-img-wrapper">
                  <img src="/images/image10.webp" alt="Bridal" />
               </div>
               <div class="cat-label"><span>BRIDAL</span></div>
            </NuxtLink>
            <NuxtLink to="/products?category=Evening" class="cat-card">
               <div class="cat-img-wrapper">
                  <img src="/images/image43.webp" alt="Evening Gowns" />
               </div>
               <div class="cat-label"><span>EVENING</span></div>
            </NuxtLink>
         </div>
      </section>

      <!-- NEW ARRIVALS -->
      <section class="home-section cc-new-arrivals">
         <div class="section-heading">
            <h2>NEW ARRIVALS</h2>
            <div class="heading-line"></div>
         </div>
         <div class="product-grid">
            <NuxtLink :to="'/products/GL3674'" class="product-card">
               <div class="product-img">
                  <img src="/images/image6.webp" alt="Gown" class="img-front" />
                  <img src="/images/image7.webp" alt="Gown Hover" class="img-hover" />
                  <div class="quick-view">VIEW DETAILS</div>
               </div>
               <div class="product-meta">
                  <h4 class="name">Ruffled Tulle Ball Gown</h4>
                  <span class="price">$520.00</span>
               </div>
            </NuxtLink>
            <NuxtLink :to="'/products/GL3675'" class="product-card">
               <div class="product-img">
                  <img src="/images/image8.webp" alt="Gown" class="img-front" />
                  <img src="/images/image9.webp" alt="Gown Hover" class="img-hover" />
                  <div class="quick-view">VIEW DETAILS</div>
               </div>
               <div class="product-meta">
                  <h4 class="name">Sequin Sweetheart Dress</h4>
                  <span class="price">$390.00</span>
               </div>
            </NuxtLink>
            <NuxtLink :to="'/products/GL3676'" class="product-card">
               <div class="product-img">
                  <img src="/images/image16.webp" alt="Gown" class="img-front" />
                  <img src="/images/image17.webp" alt="Gown Hover" class="img-hover" />
                  <div class="quick-view">VIEW DETAILS</div>
               </div>
               <div class="product-meta">
                  <h4 class="name">Long Sleeve Velvet Elegance</h4>
                  <span class="price">$310.00</span>
               </div>
            </NuxtLink>
            <NuxtLink :to="'/products/GL3677'" class="product-card hidden-mobile">
               <div class="product-img">
                  <img src="/images/image19.webp" alt="Gown" class="img-front" />
                  <img src="/images/image20.webp" alt="Gown Hover" class="img-hover" />
                  <div class="quick-view">VIEW DETAILS</div>
               </div>
               <div class="product-meta">
                  <h4 class="name">Floral Applique A-Line</h4>
                  <span class="price">$480.00</span>
               </div>
            </NuxtLink>
         </div>
      </section>

      <!-- BRAND PHILOSOPHY / QUOTE -->
      <section class="brand-philosophy">
         <div class="philosophy-content">
            <h2 class="script-font">Elegance in Every Stitch</h2>
            <p>For the modern woman who commands the room. Our meticulously curated dresses elevate your presence with
               uncompromised quality and timeless design.</p>
         </div>
      </section>

      <!-- DUAL BANNER SECTION -->
      <section class="banner-split">
         <div class="banner-box">
            <img src="/images/quinceanera-banner.webp" alt="Quinceanera" class="banner-img" />
            <div class="banner-info">
               <h3>QUINCEAÑERA</h3>
               <NuxtLink to="/products" class="cc-link">EXPLORE THE COLLECTION</NuxtLink>
            </div>
         </div>
         <div class="banner-box">
            <img src="/images/wedding-2026.webp" alt="Wedding" class="banner-img" />
            <div class="banner-info">
               <h3>BRIDAL EXCLUSIVES</h3>
               <NuxtLink to="/products?category=Bridal" class="cc-link">SHOP NOW</NuxtLink>
            </div>
         </div>
      </section>

      <!-- SHOP BY BRAND -->
      <section class="home-section cc-styles">
         <div class="section-heading">
            <h2>SHOP BY BRAND</h2>
            <div class="heading-line"></div>
         </div>
         <div class="style-circle-grid">
            <NuxtLink to="/products" class="style-circle">
               <div class="circle-img">
                  <img src="/images/image22.webp" alt="Mermaid" />
               </div>
               <span>MERMAID</span>
            </NuxtLink>
            <NuxtLink to="/products" class="style-circle">
               <div class="circle-img">
                  <img src="/images/image29.webp" alt="A-Line" />
               </div>
               <span>A-LINE</span>
            </NuxtLink>
            <NuxtLink to="/products" class="style-circle">
               <div class="circle-img">
                  <img src="/images/image48.webp" alt="Ball Gown" />
               </div>
               <span>BALL GOWN</span>
            </NuxtLink>
            <NuxtLink to="/products" class="style-circle">
               <div class="circle-img">
                  <img src="/images/image52.webp" alt="Fitted" />
               </div>
               <span>FITTED</span>
            </NuxtLink>
            <NuxtLink to="/products" class="style-circle">
               <div class="circle-img">
                  <img src="/images/image36.webp" alt="Two-Piece" />
               </div>
               <span>TWO-PIECE</span>
            </NuxtLink>
         </div>
      </section>

      <!-- FULL WIDTH CAMPAIGN BANNER -->
      <section class="campaign-banner">
         <div class="campaign-bg">
            <img src="/images/image53.webp" alt="Evening Campaign" />
         </div>
         <div class="campaign-overlay"></div>
         <div class="campaign-text text-left">
            <h2>The Evening Gala</h2>
            <p>Draped in sophistication. Step out in our exclusive gala-ready collection designed to make endless
               impressions.</p>
            <div class="mt-4">
               <NuxtLink to="/products" class="cc-btn primary">DISCOVER MORE</NuxtLink>
            </div>
         </div>
      </section>

      <!-- TRENDING ARRIVALS -->
      <section class="home-section cc-trending">
         <div class="section-heading">
            <h2>TRENDING NOW</h2>
            <div class="heading-line"></div>
         </div>
         <div class="product-grid">
            <NuxtLink :to="'/products/GL3670'" class="product-card">
               <div class="product-img">
                  <img src="/images/image12.webp" alt="Gown" class="img-front" />
                  <img src="/images/image15.webp" alt="Gown Hover" class="img-hover" />
                  <div class="quick-view">VIEW DETAILS</div>
               </div>
               <div class="product-meta">
                  <h4 class="name">Embellished Lace Corset Gown</h4>
                  <span class="price">$350.00</span>
               </div>
            </NuxtLink>
            <NuxtLink :to="'/products/GL3671'" class="product-card">
               <div class="product-img">
                  <img src="/images/image21.webp" alt="Gown" class="img-front" />
                  <img src="/images/image25.webp" alt="Gown Hover" class="img-hover" />
                  <div class="quick-view">VIEW DETAILS</div>
               </div>
               <div class="product-meta">
                  <h4 class="name">Dangling Bead Strap A-Line Dress</h4>
                  <span class="price">$420.00</span>
               </div>
            </NuxtLink>
            <NuxtLink :to="'/products/GL3672'" class="product-card">
               <div class="product-img">
                  <img src="/images/image30.webp" alt="Gown" class="img-front" />
                  <img src="/images/image32.webp" alt="Gown Hover" class="img-hover" />
                  <div class="quick-view">VIEW DETAILS</div>
               </div>
               <div class="product-meta">
                  <h4 class="name">Off-Shoulder Cascading Ruffle Gown</h4>
                  <span class="price">$280.00</span>
               </div>
            </NuxtLink>
            <NuxtLink :to="'/products/GL3673'" class="product-card hidden-mobile">
               <div class="product-img">
                  <img src="/images/image40.webp" alt="Gown" class="img-front" />
                  <img src="/images/image45.webp" alt="Gown Hover" class="img-hover" />
                  <div class="quick-view">VIEW DETAILS</div>
               </div>
               <div class="product-meta">
                  <h4 class="name">Velvet Deep-V Evening Dress</h4>
                  <span class="price">$310.00</span>
               </div>
            </NuxtLink>
         </div>
         <div class="center-btn">
            <NuxtLink to="/products" class="cc-btn outline dark">VIEW ALL ARRIVALS</NuxtLink>
         </div>
      </section>
   </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600&family=Jost:wght@300;400;500&family=Playfair+Display:ital,wght@1,500;1,600&display=swap');

.home-container {
   width: 100%;
   background: #fff;
}

h1,
h2,
h3,
.brand {
   font-family: 'Cinzel', serif;
}

.script-font {
   font-family: 'Playfair Display', serif;
   font-style: italic;
   font-weight: 500;
   text-transform: none;
}

/* HERO SECTION */
.hero-section {
   position: relative;
   width: 100%;
   height: 85vh;
   overflow: hidden;
   display: flex;
   align-items: center;
   justify-content: center;
   z-index: 1;
}

.hero-video {
   position: absolute;
   top: 50%;
   left: 50%;
   min-width: 100%;
   min-height: 100%;
   width: auto;
   height: auto;
   transform: translate(-50%, -50%);
   object-fit: cover;
   z-index: 1;
}

.hero-overlay {
   position: absolute;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   background: rgba(0, 0, 0, 0.4);
   z-index: 2;
}

.hero-content {
   position: relative;
   text-align: center;
   color: #fff;
   z-index: 3;
   padding: 0 20px;
   animation: fadeIn 1.5s ease;
}

.hero-title {
   font-size: 56px;
   font-weight: 500;
   letter-spacing: 4px;
   margin-bottom: 15px;
   text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.4);
}

.hero-subtitle {
   font-size: 18px;
   font-weight: 300;
   letter-spacing: 1.5px;
   margin-bottom: 40px;
   text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.5);
   font-family: 'Jost', sans-serif;
}

.hero-buttons {
   display: flex;
   justify-content: center;
   gap: 20px;
}

/* BUTTONS */
.cc-btn {
   display: inline-block;
   padding: 14px 34px;
   font-size: 13px;
   letter-spacing: 1.5px;
   font-weight: 500;
   text-transform: uppercase;
   text-decoration: none;
   transition: all 0.3s ease;
   font-family: 'Jost', sans-serif;
   cursor: pointer;
}

.cc-btn.primary {
   background-color: #d4929f;
   color: #fff;
   border: 1px solid #d4929f;
}

.cc-btn.primary:hover {
   background-color: transparent;
   color: #d4929f;
   border-color: #d4929f;
}

.cc-btn.outline {
   background-color: transparent;
   color: #fff;
   border: 1px solid #fff;
}

.cc-btn.outline:hover {
   background-color: #d4929f;
   color: #fff;
   border-color: #d4929f;
}

.cc-btn.outline.dark {
   color: #d4929f;
   border-color: #d4929f;
}

.cc-btn.outline.dark:hover {
   background-color: #d4929f;
   color: #fff;
}

/* SECTIONS STRUCTURE */
.home-section {
   padding: 80px 40px;
   max-width: 1500px;
   margin: 0 auto;
}

.section-heading {
   text-align: center;
   margin-bottom: 50px;
}

.section-heading h2 {
   font-size: 28px;
   letter-spacing: 3px;
   color: #111;
   margin-bottom: 15px;
}

.heading-line {
   width: 60px;
   height: 1px;
   background: #d4929f;
   /* Pink accent matching logo */
   margin: 0 auto;
}

/* BRAND PHILOSOPHY */
.brand-philosophy {
   background: #fbfaf8;
   padding: 100px 20px;
   text-align: center;
   border-top: 1px solid #f0f0f0;
   border-bottom: 1px solid #f0f0f0;
}

.philosophy-content {
   max-width: 700px;
   margin: 0 auto;
}

.philosophy-content h2 {
   font-size: 42px;
   color: #111;
   margin-bottom: 25px;
}

.philosophy-content p {
   font-family: 'Jost', sans-serif;
   font-size: 16px;
   color: #555;
   line-height: 1.8;
   letter-spacing: 0.5px;
}

/* CATEGORY GRID */
.category-grid {
   display: grid;
   grid-template-columns: repeat(4, 1fr);
   gap: 20px;
}

.cat-card {
   position: relative;
   display: block;
   overflow: hidden;
   text-decoration: none;
}

.cat-img-wrapper {
   aspect-ratio: 3/4;
   overflow: hidden;
}

.cat-card img {
   width: 100%;
   height: 100%;
   object-fit: cover;
   transition: transform 0.7s ease;
}

.cat-card:hover img {
   transform: scale(1.06);
}

.cat-label {
   position: absolute;
   bottom: 30px;
   left: 0;
   width: 100%;
   text-align: center;
}

.cat-label span {
   background: #fff;
   color: #111;
   padding: 10px 25px;
   font-size: 13px;
   letter-spacing: 1.5px;
   font-weight: 500;
   text-transform: uppercase;
   transition: all 0.3s;
   font-family: 'Jost', sans-serif;
}

.cat-card:hover .cat-label span {
   background: #111;
   color: #fff;
}

/* STYLE CIRCLES (SILHOUETTE) */
.style-circle-grid {
   display: flex;
   justify-content: center;
   gap: 40px;
   flex-wrap: wrap;
}

.style-circle {
   text-align: center;
   text-decoration: none;
   color: #111;
   transition: transform 0.3s ease;
}

.style-circle:hover {
   transform: translateY(-5px);
}

.circle-img {
   width: 180px;
   height: 180px;
   border-radius: 50%;
   overflow: hidden;
   margin-bottom: 20px;
   box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.circle-img img {
   width: 100%;
   height: 100%;
   object-fit: cover;
   transition: transform 0.5s ease;
}

.style-circle:hover .circle-img img {
   transform: scale(1.1);
}

.style-circle span {
   font-family: 'Jost', sans-serif;
   font-size: 13px;
   letter-spacing: 1.5px;
   text-transform: uppercase;
   font-weight: 500;
}

/* DUAL BANNERS */
.banner-split {
   display: flex;
   width: 100%;
}

.banner-box {
   flex: 1;
   position: relative;
   aspect-ratio: 16/9;
   overflow: hidden;
   display: flex;
   align-items: center;
   justify-content: center;
}

.banner-img {
   position: absolute;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   object-fit: cover;
   z-index: 1;
   transition: transform 1s ease;
}

.banner-box:hover .banner-img {
   transform: scale(1.05);
}

.banner-box::after {
   content: '';
   position: absolute;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   background: rgba(0, 0, 0, 0.25);
   z-index: 2;
}

.banner-info {
   position: relative;
   z-index: 3;
   text-align: center;
   color: #fff;
}

.banner-info h3 {
   font-size: 34px;
   letter-spacing: 3px;
   margin-bottom: 20px;
   text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.cc-link {
   color: #fff;
   text-decoration: none;
   font-size: 12px;
   letter-spacing: 2px;
   padding-bottom: 5px;
   border-bottom: 1px solid #fff;
   transition: color 0.3s, border-color 0.3s;
   font-family: 'Jost', sans-serif;
   text-transform: uppercase;
}

.cc-link:hover {
   color: #f5dbe0;
   /* Light pink accent */
   border-color: #f5dbe0;
}

/* FULL WIDTH CAMPAIGN BANNER */
.campaign-banner {
   position: relative;
   width: 100%;
   height: 70vh;
   min-height: 500px;
   display: flex;
   align-items: center;
}

.campaign-bg {
   position: absolute;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
}

.campaign-bg img {
   width: 100%;
   height: 100%;
   object-fit: cover;
   object-position: center 20%;
}

.campaign-overlay {
   position: absolute;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   background: linear-gradient(to right, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 100%);
}

.campaign-text {
   position: relative;
   z-index: 2;
   max-width: 500px;
   margin-left: 10%;
   color: #fff;
}

.campaign-text h2 {
   font-size: 48px;
   font-family: 'Playfair Display', serif;
   font-style: italic;
   font-weight: 500;
   margin-bottom: 20px;
   letter-spacing: 1px;
}

.campaign-text p {
   font-family: 'Jost', sans-serif;
   font-size: 16px;
   line-height: 1.6;
   margin-bottom: 30px;
}

.mt-4 {
   margin-top: 20px;
}


/* TRENDING PRODUCTS */
.product-grid {
   display: grid;
   grid-template-columns: repeat(4, 1fr);
   gap: 30px;
   margin-bottom: 40px;
}

.product-card {
   text-decoration: none;
   color: #111;
   display: block;
}

.product-img {
   position: relative;
   aspect-ratio: 2/3;
   overflow: hidden;
   background: #f9f9f9;
   margin-bottom: 20px;
}

.product-img img {
   position: absolute;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   object-fit: cover;
   transition: opacity 0.4s ease;
}

.product-img .img-hover {
   opacity: 0;
}

.product-card:hover .img-hover {
   opacity: 1;
}

/* QUICK VIEW HOVER TEXT */
.quick-view {
   position: absolute;
   bottom: -50px;
   left: 0;
   width: 100%;
   background: rgba(255, 255, 255, 0.95);
   color: #111;
   text-align: center;
   padding: 14px 0;
   font-size: 11px;
   font-family: 'Jost', sans-serif;
   letter-spacing: 2px;
   text-transform: uppercase;
   font-weight: 500;
   transition: bottom 0.3s ease;
   z-index: 10;
   border-top: 1px solid #eee;
}

.product-card:hover .quick-view {
   bottom: 0;
}

.quick-view:hover {
   background: #d4929f;
   color: #fff;
   border-color: #d4929f;
}

.product-meta {
   text-align: center;
}

.product-meta .name {
   font-family: 'Jost', sans-serif;
   font-size: 14px;
   font-weight: 400;
   margin-bottom: 8px;
   color: #333;
}

.product-meta .price {
   font-family: 'Jost', sans-serif;
   font-size: 14px;
   font-weight: 500;
   color: #111;
}

.center-btn {
   text-align: center;
   margin-top: 30px;
}

/* RESPONSIVENESS */
@media (max-width: 1024px) {

   .category-grid,
   .product-grid {
      grid-template-columns: repeat(2, 1fr);
   }

   .hidden-mobile {
      display: none;
   }

   .banner-split {
      flex-direction: column;
   }

   .hero-title {
      font-size: 40px;
   }

   .campaign-text {
      margin-left: 5%;
      text-align: center;
      margin: 0 auto;
      padding: 0 20px;
   }

   .campaign-overlay {
      background: rgba(0, 0, 0, 0.4);
   }
}

@media (max-width: 600px) {
   .hero-title {
      font-size: 32px;
   }

   .hero-subtitle {
      font-size: 14px;
   }

   .hero-buttons {
      flex-direction: column;
      gap: 15px;
   }

   .category-grid {
      grid-template-columns: 1fr;
   }

   .product-grid {
      grid-template-columns: 1fr;
      gap: 15px;
   }

   .style-circle-grid {
      gap: 20px;
   }

   .circle-img {
      width: 140px;
      height: 140px;
   }

   .philosophy-content h2 {
      font-size: 32px;
   }

   .campaign-text h2 {
      font-size: 36px;
   }
}

@keyframes fadeIn {
   from {
      opacity: 0;
      transform: translateY(20px);
   }

   to {
      opacity: 1;
      transform: translateY(0);
   }
}
</style>
