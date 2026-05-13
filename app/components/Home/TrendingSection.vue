<script setup>
const trendingProducts = [
  {
    id: 'GL3670',
    name: 'Embellished Lace Corset Gown',
    price: '$350.00',
    imageFront: '/images/image12.webp',
    imageHover: '/images/image15.webp',
    link: '/products/GL3670'
  },
  {
    id: 'GL3671',
    name: 'Dangling Bead Strap A-Line Dress',
    price: '$420.00',
    imageFront: '/images/image21.webp',
    imageHover: '/images/image25.webp',
    link: '/products/GL3671'
  },
  {
    id: 'GL3672',
    name: 'Off-Shoulder Cascading Ruffle Gown',
    price: '$280.00',
    imageFront: '/images/image30.webp',
    imageHover: '/images/image32.webp',
    link: '/products/GL3672'
  },
  {
    id: 'GL3673',
    name: 'Velvet Deep-V Evening Dress',
    price: '$310.00',
    imageFront: '/images/image40.webp',
    imageHover: '/images/image45.webp',
    link: '/products/GL3673',
    hiddenMobile: true
  }
];
</script>

<template>
   <section class="home-section cc-trending">
      <div class="section-heading">
         <h2>TRENDING NOW</h2>
         <div class="heading-line"></div>
      </div>
      <div class="product-grid">
         <NuxtLink 
            v-for="product in trendingProducts" 
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
      <div class="center-btn">
         <NuxtLink to="/products" class="cc-btn outline dark">VIEW ALL ARRIVALS</NuxtLink>
      </div>
   </section>
</template>
