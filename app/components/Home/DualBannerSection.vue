<script setup>
const banners = [
  {
    image: '/images/quinceanera-banner.webp',
    alt: 'Quinceanera',
    title: 'QUINCEAÑERA',
    link: '/products',
    linkText: 'EXPLORE THE COLLECTION'
  },
  {
    image: '/images/wedding-2026.webp',
    alt: 'Wedding',
    title: 'BRIDAL EXCLUSIVES',
    link: '/products?category=Bridal',
    linkText: 'SHOP NOW'
  }
]
</script>

<template>
   <section class="banner-split">
      <div v-for="(banner, index) in banners" :key="index" class="banner-box">
         <img :src="banner.image" :alt="banner.alt" class="banner-img" />
         <div class="banner-info">
            <h3>{{ banner.title }}</h3>
            <NuxtLink :to="banner.link" class="cc-link">{{ banner.linkText }}</NuxtLink>
         </div>
      </div>
   </section>
</template>
