<script setup>
import { ref } from 'vue';
import { useCartStore } from '~/stores/cart';
const route = useRoute();
useHead({ title: `Product ${route.params.slug} | CCollection` });

const cartStore = useCartStore();

const images = [
  '/images/image12.webp',
  '/images/image13.webp',
  '/images/image14.webp',
  '/images/image15.webp',
];

const mainImage = ref(images[0]);

function setMainImage(img) {
  mainImage.value = img;
}

const colors = [
  { name: 'Champagne', hex: '#f5dbe0' },
  { name: 'Black', hex: '#111' },
  { name: 'Burgundy', hex: '#521727' }
];
const selectedColor = ref(colors[0].name);

const sizes = [
  { name: 'XXS', disabled: false },
  { name: 'XS', disabled: false },
  { name: 'S', disabled: false },
  { name: 'M', disabled: false },
  { name: 'L', disabled: true },
  { name: 'XL', disabled: false },
];
const selectedSize = ref('S');

function addToBag() {
  const product = {
    id: route.params.slug,
    name: 'Off-Shoulder Dangling Bead Strap Cascading Ruffle Gown',
    price: 450.00,
    quantity: 1,
    stock: 10,
    sku: `EW2026-${route.params.slug}`,
    color: selectedColor.value,
    size: selectedSize.value,
    image: mainImage.value
  };
  cartStore.addToCart(product);
}
</script>

<template>
<div class="product-page">
   <div class="breadcrumb">
      <NuxtLink to="/">Home</NuxtLink> 
      <span class="sep">/</span> 
      <NuxtLink to="/products?category=Prom+2026">Prom Dresses</NuxtLink> 
      <span class="sep">/</span> 
      <span class="current">{{ route.params.slug }}</span>
   </div>

   <div class="product-split">
      <!-- LEFT: IMAGE GALLERY (SLIDER STYLE) -->
      <div class="product-gallery">
         <div class="thumbnails">
            <div 
               v-for="(img, idx) in images" 
               :key="idx" 
               class="thumb-item" 
               :class="{ active: mainImage === img }"
               @click="setMainImage(img)"
               @mouseover="setMainImage(img)"
            >
               <img :src="img" alt="Thumbnail" />
            </div>
         </div>
         <div class="main-image-viewer">
            <img :src="mainImage" alt="Main Gown View" class="fade-img" :key="mainImage" />
         </div>
      </div>

      <!-- RIGHT: STICKY INFO -->
      <div class="product-info-wrapper">
         <div class="product-info-sticky">
            <span class="brand">Elizabeth K</span>
            <h1 class="product-title">Off-Shoulder Dangling Bead Strap Cascading Ruffle Gown</h1>
            <div class="product-price">$450.00</div>
            
            <div class="product-meta-extra">
               <p><span>SKU:</span> EW2026-{{ route.params.slug }}</p>
               <p><span>Availability:</span> <strong style="color: #27ae60;">In Stock</strong> - Ships in 24 hrs</p>
            </div>
            
            <div class="divider"></div>

            <div class="attr-group">
               <div class="attr-header">
                  <strong>Color:</strong>
                  <span>{{ selectedColor }}</span>
               </div>
               <div class="colors">
                  <button 
                     v-for="color in colors" 
                     :key="color.name"
                     class="color-btn" 
                     :class="{ active: selectedColor === color.name }"
                     :style="{ background: color.hex }" 
                     :aria-label="color.name"
                     @click="selectedColor = color.name"
                  ></button>
               </div>
            </div>
            
            <div class="attr-group">
               <div class="attr-header">
                  <strong>Size:</strong>
                  <button class="size-guide">Size Guide</button>
               </div>
               <div class="size-grid">
                  <button 
                     v-for="size in sizes" 
                     :key="size.name"
                     class="size-btn" 
                     :class="{ active: selectedSize === size.name, disabled: size.disabled }"
                     :disabled="size.disabled"
                     @click="selectedSize = size.name"
                  >{{ size.name }}</button>
               </div>
            </div>

            <button class="btn-add" @click="addToBag">ADD TO BAG - $450.00</button>

            <div class="delivery-info">
               <p>Free standard shipping on orders over $200</p>
               <p>Estimated Delivery: <strong>3-5 Business Days</strong></p>
            </div>

            <div class="product-accordion">
               <div class="accordion-item">
                  <div class="accordion-head">
                     <h3>DESCRIPTION</h3>
                  </div>
                  <div class="accordion-body">
                     <p>Elevate your evening with this stunning off-shoulder gown. Featuring intricate dangling bead straps, a structured corset-style bodice, and cascading waist ruffles that blend into an elegant sweep train.</p>
                     <ul class="product-stats">
                        <li><strong>Style:</strong> {{ route.params.slug }}</li>
                        <li><strong>Material:</strong> Premium Satin, Beaded Mesh</li>
                        <li><strong>Neckline:</strong> Sweetheart, Off-Shoulder</li>
                        <li><strong>Care:</strong> Dry Clean Only</li>
                     </ul>
                  </div>
               </div>
            </div>

         </div>
      </div>
   </div>

   <!-- YOU MIGHT ALSO LIKE -->
   <section class="related-products">
      <div class="section-heading">
          <h2>YOU MIGHT ALSO LIKE</h2>
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
</div>
</template>

<style scoped>

h1, h2, h3, .brand {
   font-family: 'Cinzel', serif;
}

.product-page {
   max-width: 1500px;
   margin: 0 auto;
   padding: 20px 40px 80px;
}

/* BREADCRUMB */
.breadcrumb {
   font-size: 11px;
   letter-spacing: 1.5px;
   text-transform: uppercase;
   margin-bottom: 30px;
   color: #666;
   font-family: 'Jost', sans-serif;
}
.breadcrumb a {
   color: #111;
   text-decoration: none;
   transition: color 0.3s;
}
.breadcrumb a:hover {
   color: #d4929f;
}
.breadcrumb .sep {
   margin: 0 10px;
}
.breadcrumb .current {
   color: #888;
}

/* SPLIT LAYOUT */
.product-split {
   display: flex;
   gap: 60px;
   align-items: flex-start;
}

/* GALLERY SLIDER */
.product-gallery {
   flex: 6.5;
   display: flex;
   gap: 20px;
   height: auto;
}
.thumbnails {
   display: flex;
   flex-direction: column;
   gap: 15px;
   width: 100px;
}
.thumb-item {
   cursor: pointer;
   opacity: 0.6;
   transition: all 0.3s ease;
   border: 1px solid transparent;
}
.thumb-item img {
   width: 100%;
   height: auto;
   object-fit: cover;
   aspect-ratio: 3/4;
}
.thumb-item:hover, .thumb-item.active {
   opacity: 1;
   border-color: #111;
}

.main-image-viewer {
   flex: 1;
   background: #fafafa;
   position: relative;
   overflow: hidden;
}
.main-image-viewer img {
   width: 100%;
   height: auto;
   max-height: 75vh;
   max-width: 100%;
   object-fit: contain;
   display: block;
   margin: 0 auto;
}
.fade-img {
   animation: imgFadeIn 0.3s ease-in-out;
}
@keyframes imgFadeIn {
   from { opacity: 0.8; }
   to { opacity: 1; }
}


/* STICKY INFO */
.product-info-wrapper {
   flex: 3.5;
   position: relative;
   min-height: 100%;
}
.product-info-sticky {
   position: sticky;
   top: 100px;
}

.brand {
   font-size: 14px;
   color: #888;
   letter-spacing: 2px;
   text-transform: uppercase;
   margin-bottom: 10px;
   display: block;
}

.product-title {
   font-size: 30px;
   line-height: 1.25;
   color: #111;
   margin-bottom: 15px;
}

.product-price {
   font-family: 'Jost', sans-serif;
   font-size: 20px;
   font-weight: 500;
   color: #111;
   margin-bottom: 15px;
}

.product-meta-extra {
   font-family: 'Jost', sans-serif;
   font-size: 13px;
   color: #666;
   margin-bottom: 10px;
}
.product-meta-extra p {
   margin-bottom: 5px;
}
.product-meta-extra span {
   font-weight: 500;
   color: #111;
   margin-right: 5px;
}

.divider {
   height: 1px;
   background: #eee;
   margin: 30px 0;
}

/* ATTRIBUTES */
.attr-group {
   margin-bottom: 30px;
   font-family: 'Jost', sans-serif;
}
.attr-header {
   display: flex;
   justify-content: space-between;
   font-size: 13px;
   text-transform: uppercase;
   letter-spacing: 1px;
   margin-bottom: 15px;
}
.size-guide {
   background: none;
   border: none;
   color: #d4929f;
   text-decoration: underline;
   cursor: pointer;
   padding: 0;
}

.colors {
   display: flex;
   gap: 12px;
}
.color-btn {
   width: 32px;
   height: 32px;
   border-radius: 50%;
   border: 1px solid #ddd;
   cursor: pointer;
   position: relative;
}
.color-btn.active::after {
   content: '';
   position: absolute;
   top: -5px; left: -5px; right: -5px; bottom: -5px;
   border: 1px solid #111;
   border-radius: 50%;
}

.size-grid {
   display: grid;
   grid-template-columns: repeat(4, 1fr);
   gap: 10px;
}
.size-btn {
   padding: 12px 0;
   background: #fff;
   border: 1px solid #ddd;
   font-size: 13px;
   letter-spacing: 1px;
   cursor: pointer;
   transition: all 0.3s;
}
.size-btn:hover {
   border-color: #111;
}
.size-btn.active {
   background: #d4929f;
   color: #fff;
   border-color: #d4929f;
}
.size-btn.disabled {
   opacity: 0.3;
   cursor: not-allowed;
   text-decoration: line-through;
}

/* ADD TO BAG */
.btn-add {
   width: 100%;
   padding: 20px;
   background: #d4929f;
   color: #fff;
   font-size: 14px;
   font-weight: 500;
   letter-spacing: 2px;
   text-transform: uppercase;
   border: 1px solid #d4929f;
   cursor: pointer;
   transition: all 0.3s;
   margin-bottom: 20px;
   font-family: 'Jost', sans-serif;
}
.btn-add:hover {
   background: transparent;
   color: #d4929f;
}

/* EXTRA INFO */
.delivery-info {
   background: #fcfcfc;
   border: 1px solid #f0f0f0;
   padding: 15px;
   font-size: 13px;
   color: #555;
   line-height: 1.6;
   margin-bottom: 30px;
   font-family: 'Jost', sans-serif;
}

/* ACCORDIONS */
.product-accordion {
   border-top: 1px solid #eee;
   font-family: 'Jost', sans-serif;
}
.accordion-item {
   border-bottom: 1px solid #eee;
   padding: 20px 0;
}
.accordion-head h3 {
   font-size: 14px;
   letter-spacing: 1.5px;
   margin-bottom: 15px;
}
.accordion-body p {
   font-size: 14px;
   line-height: 1.6;
   color: #555;
   margin-bottom: 15px;
}
.product-stats {
   list-style: none;
   padding: 0;
   margin: 0;
   font-size: 13px;
   color: #444;
}
.product-stats li {
   margin-bottom: 8px;
}

/* RELATED PRODUCTS */
.related-products {
   margin-top: 100px;
   padding-top: 50px;
   border-top: 1px solid #eee;
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
   margin: 0 auto;
}
.product-grid {
   display: grid;
   grid-template-columns: repeat(4, 1fr);
   gap: 30px;
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
   top: 0; left: 0; width: 100%; height: 100%;
   object-fit: cover;
   transition: opacity 0.4s ease;
}
.product-img .img-hover {
   opacity: 0;
}
.product-card:hover .img-hover {
   opacity: 1;
}
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

/* RESPONSIVE */
@media (max-width: 1024px) {
   .product-split {
      flex-direction: column;
   }
   .product-gallery {
      width: 100%;
   }
   .product-info-sticky {
      position: static;
   }
   .product-grid {
      grid-template-columns: repeat(2, 1fr);
   }
   .hidden-mobile { display: none; }
}

@media (max-width: 600px) {
   .product-page { padding: 15px; }
   .product-gallery { 
       flex-direction: column-reverse; 
   }
   .thumbnails { 
       flex-direction: row; 
       width: 100%; 
       overflow-x: auto;
   }
   .thumb-item { width: 80px; flex-shrink: 0; }
   .product-title { font-size: 26px; }
   .size-grid { grid-template-columns: repeat(3, 1fr); }
   .product-grid { grid-template-columns: 1fr; gap: 15px; }
}
</style>
