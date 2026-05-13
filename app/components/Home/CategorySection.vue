<script setup>
const categories = [
  {
    name: 'PROM 2026',
    link: '/products?category=Prom+2026',
    image: '/images/image2.webp',
    alt: 'Prom 2026'
  },
  {
    name: 'HOMECOMING',
    link: '/products?category=Homecoming',
    image: '/images/image5.webp',
    alt: 'Homecoming'
  },
  {
    name: 'BRIDAL',
    link: '/products?category=Bridal',
    image: '/images/image10.webp',
    alt: 'Bridal'
  },
  {
    name: 'EVENING',
    link: '/products?category=Evening',
    image: '/images/image43.webp',
    alt: 'Evening Gowns'
  }
]
</script>

<template>
   <section class="home-section cc-categories">
      <div class="section-heading">
         <h2>SHOP BY CATEGORY</h2>
         <div class="heading-line"></div>
      </div>
      <div class="category-grid">
         <NuxtLink 
            v-for="(cat, index) in categories" 
            :key="index" 
            :to="cat.link" 
            class="cat-card"
         >
            <div class="cat-img-wrapper">
               <img :src="cat.image" :alt="cat.alt" />
            </div>
            <div class="cat-label"><span>{{ cat.name }}</span></div>
         </NuxtLink>
      </div>
   </section>
</template>