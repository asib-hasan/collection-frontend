<script setup>
import { ref, onMounted } from 'vue'

const heroVideo = ref(null)
const posterImg = '/images/wedding-2026.webp'
const videoSrc = '/images/video.mp4'

onMounted(() => {
  if (heroVideo.value) {
    heroVideo.value.play().catch(error => {
      console.warn('Video autoplay failed:', error)
    })
  }
})
</script>

<template>
   <section class="hero-section">
      <video 
         ref="heroVideo"
         autoplay 
         muted 
         loop 
         playsinline 
         preload="auto" 
         :poster="posterImg" 
         class="hero-video"
      >
         <source :src="videoSrc" type="video/mp4" />
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
</template>