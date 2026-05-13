<script setup>
const brands = [
  {
    name: 'MERMAID',
    image: '/images/image22.webp',
    alt: 'Mermaid',
    link: '/products'
  },
  {
    name: 'A-LINE',
    image: '/images/image29.webp',
    alt: 'A-Line',
    link: '/products'
  },
  {
    name: 'BALL GOWN',
    image: '/images/image48.webp',
    alt: 'Ball Gown',
    link: '/products'
  },
  {
    name: 'FITTED',
    image: '/images/image52.webp',
    alt: 'Fitted',
    link: '/products'
  },
  {
    name: 'TWO-PIECE',
    image: '/images/image36.webp',
    alt: 'Two-Piece',
    link: '/products'
  }
]
</script>

<template>
   <section class="home-section cc-styles">
      <div class="section-heading">
         <h2>SHOP BY BRAND</h2>
         <div class="heading-line"></div>
      </div>
      <div class="style-circle-grid">
         <NuxtLink 
            v-for="(brand, index) in brands" 
            :key="index" 
            :to="brand.link" 
            class="style-circle"
         >
            <div class="circle-img">
               <img :src="brand.image" :alt="brand.alt" />
            </div>
            <span>{{ brand.name }}</span>
         </NuxtLink>
      </div>
   </section>
</template>
