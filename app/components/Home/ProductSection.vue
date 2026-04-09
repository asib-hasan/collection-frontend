<script setup>
const activeCategory = ref('All')
const { data: products } = await useAPI("/frontend/v1/product");
const { data: categories } = await useAPI("/frontend/v1/category");
const itemsToShow = ref(8)
const categoryList = computed(() => {
  const list = Array.isArray(categories.value) ? categories.value : (categories.value?.data || []);
  return [{ id: 'all', name: 'All' }, ...list];
})

const filteredProducts = computed(() => {
  const pList = Array.isArray(products.value) ? products.value : (products.value?.data || []);
  if (activeCategory.value === 'All') return pList;
  return pList.filter(p => {
    const pCat = p.category?.name || p.category;
    return pCat === activeCategory.value;
  });
})

const visibleProducts = computed(() => {
  return (filteredProducts.value || []).slice(0, itemsToShow.value)
})

const hasMoreProducts = computed(() => {
  return itemsToShow.value < (filteredProducts.value || []).length
})

const loadMore = () => {
  itemsToShow.value += 4
}

watch(activeCategory, () => {
  itemsToShow.value = 8
})
</script>

<template>
  <section class="py-12 sm:py-16 md:py-20 bg-white">
    <div class="container mx-auto px-4">
      <div class="flex flex-col md:flex-row justify-between items-center mb-8 sm:mb-10 gap-4 sm:gap-6">
        <div class="text-center md:text-left">
          <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 tracking-wide uppercase mb-2">
            Trending Products
          </h2>
          
          <p class="text-sm sm:text-base text-gray-500 max-w-xl">
            Explore our most popular and highly rated items handpicked for you. Fresh styles waiting to be yours.
          </p>
        </div>
        
        <!-- Category Filter Tabs -->
        <div class="flex flex-wrap justify-center gap-1.5 sm:gap-2 w-full md:w-auto">
          <button 
            v-for="category in categoryList" 
            :key="category.id || category"
            @click="activeCategory = category.name || category"
            class="px-3 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300"
            :class="activeCategory == (category.name || category) ? 'bg-primary text-black shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-black'"
          >
            {{ category.name || category }}
          </button>
        </div>
      </div>

      
      <!-- Products Grid Layout -->
      <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 xl:gap-8 transition-all duration-500">
        <ProductCard
          v-for="product in visibleProducts"
          :key="product.id"
          :product="product"
          class="h-full animate-fade-in"
        />
      </div>

      <div class="mt-10 sm:mt-14 text-center pb-5">
        <button 
          v-if="hasMoreProducts"
          @click="loadMore"
          class="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 border-2 border-black text-black font-bold uppercase tracking-wider hover:bg-black hover:text-white transition-all duration-300 group rounded-xl text-sm sm:text-base">
          Load More Products
          <Icon name="mdi:arrow-down" class="text-lg sm:text-xl transition-transform duration-300 group-hover:translate-y-1" />
        </button>
        <NuxtLink 
          v-else
          to="/products" class="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 border-2 border-black text-black font-bold uppercase tracking-wider hover:bg-black hover:text-white transition-all duration-300 group rounded-xl text-sm sm:text-base">
          View All Products
          <Icon name="mdi:arrow-right" class="text-lg sm:text-xl transition-transform duration-300 group-hover:translate-x-1" />
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
