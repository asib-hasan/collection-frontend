<script setup lang="ts">
const settings = useState('config');
const carouselRef = ref<any>(null)
let autoplayInterval: any = null

const startAutoplay = () => {
  stopAutoplay()
  autoplayInterval = setInterval(() => {
    if (carouselRef.value?.emblaApi) {
      // scrollPrev() forces it to move backwards (Left-to-Right instead of Right-to-Left)
      carouselRef.value.emblaApi.scrollPrev()
    }
  }, 3000)
}

const pauseAutoplay = () => {
  stopAutoplay()
}

const stopAutoplay = () => {
  if (autoplayInterval) {
    clearInterval(autoplayInterval)
    autoplayInterval = null
  }
}

onMounted(() => {
  startAutoplay()
})

onUnmounted(() => {
  stopAutoplay()
})
</script>

<template>
  <section class="py-12 sm:py-16 md:py-20 bg-gray-50/50">
    <div class="container mx-auto px-4">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 sm:mb-12 gap-4">
        <div>
          <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 tracking-wide uppercase mb-2">
            New Arrivals
          </h2>
          <p class="text-sm sm:text-base text-gray-500 max-w-xl">
            Check out the latest additions to our collection. Premium quality products designed to elevate your everyday life.
          </p>
        </div>
        <NuxtLink to="/products" class="group flex items-center gap-2 text-primary font-bold hover:text-black transition-colors whitespace-nowrap text-sm sm:text-base">
          View All Products
          <Icon name="mdi:arrow-right" class="text-lg sm:text-xl transition-transform duration-300 group-hover:translate-x-1" />
        </NuxtLink>
      </div>

      <!-- New Arrivals Carousel Layout -->
      <UCarousel 
        ref="carouselRef"
        :items="settings?.home_products" 
        :loop="true" 
        arrows 
        indicators 
        :ui="{
          item: 'basis-1/2 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 ps-2 pe-2 sm:ps-3 sm:pe-3 pb-8',
          container: 'flex gap-0 -mx-2 sm:-mx-3'
        }" 
        class="w-full"
        @mouseenter="pauseAutoplay"
        @mouseleave="startAutoplay"
      >
        <template #default="{ item: product }">
          <ProductCard :product="product" class="h-full" />
        </template>
      </UCarousel>
    </div>
  </section>
</template>
