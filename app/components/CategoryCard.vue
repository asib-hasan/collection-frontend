<template>
  <div class="relative group cursor-pointer overflow-hidden w-full h-full">
    <!-- Background Image -->
    <img 
      :src="category.banner_url" 
      :alt="category.name" 
      class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
    />
   
    <!-- Top Right Item Count -->
    <div class="absolute top-4 right-4 text-xs md:text-sm text-gray-800 font-medium z-10 bg-white/40 md:bg-transparent px-2 py-1 rounded md:px-0 md:py-0">
      {{ category.products?.length ?? 0 }} Item{{ (category.products?.length ?? 0) !== 1 ? 's' : '' }}
    </div>

    <!-- Hover Center Arrow Circle -->
    <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none">
      <div class="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.15)] transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 pointer-events-auto">
        <Icon :name="category.icon" class="text-black text-xl" />
      </div>
    </div>

    <!-- Gradient Overlay at bottom for text readability -->
    <div class="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-0 opacity-90 group-hover:opacity-100 transition-opacity duration-300"></div>

    <!-- Title at bottom center -->
    <div class="absolute bottom-6 left-0 right-0 text-center z-10 px-2 flex flex-col items-center justify-end">
      <h3 class="text-white text-lg lg:text-xl font-bold uppercase tracking-wider group-hover:-translate-y-1 transition-transform duration-300 drop-shadow-md">
        {{ category.name }}
      </h3>
    </div>
  </div>
</template>

<script setup>
defineProps({
  category: {
    type: Object,
    required: true
  }
})
</script>