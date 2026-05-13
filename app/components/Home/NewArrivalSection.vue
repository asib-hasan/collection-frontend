<script setup>
const newArrivals = [
  {
    id: 'GL3674',
    name: 'Ruffled Tulle Ball Gown',
    price: '$520.00',
    imageFront: '/images/image6.webp',
    imageHover: '/images/image7.webp',
    link: '/products/GL3674'
  },
  {
    id: 'GL3675',
    name: 'Sequin Sweetheart Dress',
    price: '$390.00',
    imageFront: '/images/image8.webp',
    imageHover: '/images/image9.webp',
    link: '/products/GL3675'
  },
  {
    id: 'GL3676',
    name: 'Long Sleeve Velvet Elegance',
    price: '$310.00',
    imageFront: '/images/image16.webp',
    imageHover: '/images/image17.webp',
    link: '/products/GL3676'
  },
  {
    id: 'GL3677',
    name: 'Floral Applique A-Line',
    price: '$480.00',
    imageFront: '/images/image19.webp',
    imageHover: '/images/image20.webp',
    link: '/products/GL3677',
    hiddenMobile: true
  }
];
</script>

<template>
   <section class="home-section cc-new-arrivals">
      <div class="section-heading">
         <h2>NEW ARRIVALS</h2>
         <div class="heading-line"></div>
      </div>
      <div class="product-grid">
         <NuxtLink 
            v-for="product in newArrivals" 
            :key="product.id"
            :to="product.link" 
            class="product-card"
            :class="{ 'hidden-mobile': product.hiddenMobile }"
         >
            <div class="product-img">
               <img :src="product.imageFront" :alt="product.name" class="img-front" />
               <img :src="product.imageHover" :alt="product.name + ' Hover'" class="img-hover" />
               <div class="quick-view">VIEW DETAILS</div>
            </div>
            <div class="product-meta">
               <h4 class="name">{{ product.name }}</h4>
               <span class="price">{{ product.price }}</span>
            </div>
         </NuxtLink>
      </div>
   </section>
</template>
