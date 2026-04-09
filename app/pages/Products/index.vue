<script setup lang="ts">
useHead({ title: "Products | Loomino" });

// Filter States
const route = useRoute()
const selectedCategory = ref(route.query.category as string || 'All')
const selectedSizes = ref<string[]>([])
const selectedColors = ref<string[]>([])
const maxPrice = ref(5000)

const searchQueryStr = computed(() => route.query.search as string || '')

watch(() => route.query.category, (newCat) => {
  selectedCategory.value = newCat as string || 'All'
})

const { data: categoriesData } = await useAPI("/frontend/v1/category");
const { data: productsData } = await useAPI(() => `/frontend/v1/product${searchQueryStr.value ? '?search=' + encodeURIComponent(searchQueryStr.value) : ''}`);
const { data: colorsData } = await useAPI("/frontend/v1/get-colors");
const { data: sizesData } = await useAPI("/frontend/v1/get-sizes");

const categoryList = computed(() => {
  const list = Array.isArray(categoriesData.value) ? categoriesData.value : (categoriesData.value?.data || []);
  return [{ id: 'all', name: 'All', icon: 'mdi:view-grid-outline' }, ...list];
})

const productList = computed(() => Array.isArray(productsData.value) ? productsData.value : (productsData.value?.data || []));
const colorList = computed(() => Array.isArray(colorsData.value) ? colorsData.value : (colorsData.value?.data || []));
const sizeList = computed(() => Array.isArray(sizesData.value) ? sizesData.value : (sizesData.value?.data || []));

const toggleSize = (sizeName: string) => {
  const index = selectedSizes.value.indexOf(sizeName)
  if (index > -1) {
    selectedSizes.value.splice(index, 1)
  } else {
    selectedSizes.value.push(sizeName)
  }
}

const toggleColor = (colorName: string) => {
  const index = selectedColors.value.indexOf(colorName)
  if (index > -1) {
    selectedColors.value.splice(index, 1)
  } else {
    selectedColors.value.push(colorName)
  }
}

const clearFilters = () => {
  selectedCategory.value = 'All'
  selectedSizes.value = []
  selectedColors.value = []
  maxPrice.value = 5000
  currentPage.value = 1
}

const sortOption = ref('featured')

// Pagination Stats
const currentPage = ref(1)
const itemsPerPage = 12

// Reset Pagination on Filter Change
watch([selectedCategory, selectedSizes, selectedColors, maxPrice, sortOption], () => {
  currentPage.value = 1
}, { deep: true })

// Filter Logic
const filteredProducts = computed(() => {
  let result = [...productList.value]

  // Category Filter
  if (selectedCategory.value !== 'All') {
    result = result.filter(p => (p.category?.name || p.category) === selectedCategory.value)
  }

  // Price Filter
  result = result.filter(p => parseFloat(p.discount_price || p.price) <= maxPrice.value)

  // Size Filter
  if (selectedSizes.value.length > 0) {
    result = result.filter(p => {
      return p.base_variations?.some((v: any) => 
        v.prices?.some((pr: any) => selectedSizes.value.includes(pr.size?.name || pr.size))
      )
    })
  }

  // Color Filter
  if (selectedColors.value.length > 0) {
    result = result.filter(p => {
      return p.base_variations?.some((v: any) => selectedColors.value.includes(v.color?.name || v.color))
    })
  }

  // Sorting
  if (sortOption.value === 'price-low') {
    result.sort((a, b) => parseFloat(a.discount_price || a.price) - parseFloat(b.discount_price || b.price))
  } else if (sortOption.value === 'price-high') {
    result.sort((a, b) => parseFloat(b.discount_price || b.price) - parseFloat(a.discount_price || a.price))
  } else if (sortOption.value === 'newest') {
    result.sort((a, b) => (a.status === b.status) ? 0 : a.status === 1 ? -1 : 1)
  }

  return result
})

const totalPages = computed(() => Math.ceil(filteredProducts.value.length / itemsPerPage))

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredProducts.value.slice(start, end)
})

const setPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    window.scrollTo({ top: 400, behavior: 'smooth' })
  }
}
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Breadcrumb / Header with Background Image -->
    <div class="relative py-12 md:py-20 lg:py-28 border-b border-gray-100 overflow-hidden">
      <!-- Background Image -->
      <img src="/images/banner2.webp" alt="Collections Banner" class="absolute inset-0 w-full h-full object-cover z-0" />
      
      <!-- Gradient Overlay for Readability -->
      <div class="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent z-10"></div>
      
      <div class="container mx-auto px-4 relative z-20 text-center md:text-left">
        <h1 class="text-3xl md:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight uppercase mb-4 drop-shadow-sm">
          Collections
        </h1>
        <div class="w-24 h-1.5 bg-primary rounded-full mb-6 relative overflow-hidden md:mx-0 mx-auto shadow-md">
          <div class="absolute inset-0 bg-white/50 animate-pulse"></div>
        </div>
        <p class="text-gray-700 max-w-xl text-sm md:text-base lg:text-lg font-medium drop-shadow-sm bg-white/30 backdrop-blur-sm p-3 md:p-4 rounded-xl border border-white/40">
          Discover our full collection of premium clothing and accessories filtered to your exact preferences.
        </p>
      </div>
    </div>

    <div class="container mx-auto px-4 py-6 md:py-12">
      <div class="flex flex-col lg:flex-row gap-6 md:gap-10">
        
        <!-- Sidebar Filters (Reduced width) -->
        <aside class="w-full lg:w-1/5 flex-shrink-0 space-y-8">
          
          <div class="flex items-center justify-between pb-4 border-b border-gray-200">
            <h2 class="text-lg font-bold text-gray-900 uppercase tracking-widest flex items-center gap-2">
              <Icon name="mdi:filter-variant" class="text-xl" />
              Filters
            </h2>
            <button @click="clearFilters" class="text-sm font-semibold text-gray-500 hover:text-primary transition-colors">
              Clear All
            </button>
          </div>

          <!-- Category Filter -->
          <div>
            <h3 class="font-bold text-gray-900 mb-4 px-1">Category</h3>
            <ul class="space-y-2">
              <li v-for="cat in categoryList" :key="cat.id">
                <button 
                  @click="selectedCategory = cat.name"
                  class="w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex justify-between items-center group"
                  :class="selectedCategory == cat.name ? 'bg-primary/10 text-primary' : 'text-gray-600 hover:bg-gray-50 hover:text-black'"
                >
                  <span class="flex items-center gap-3">
                    <Icon :name="cat.icon || 'mdi:tag-outline'" class="text-lg opacity-80" />
                    {{ cat.name }}
                  </span>
                  <Icon v-if="selectedCategory == cat.name" name="mdi:check" class="text-primary" />
                </button>
              </li>
            </ul>
          </div>

          <!-- Price Filter -->
          <div>
             <h3 class="font-bold text-gray-900 mb-4 px-1">Price Range: up to ৳{{ maxPrice }}</h3>
             <div class="px-2">
               <input 
                 type="range" 
                 v-model="maxPrice" 
                 min="0" 
                 max="5000" 
                 step="50"
                 class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
               />
               <div class="flex justify-between text-xs text-gray-500 mt-2 font-medium">
                 <span>৳0</span>
                 <span>৳5000</span>
               </div>
             </div>
          </div>

          <!-- Size Filter -->
          <div>
            <h3 class="font-bold text-gray-900 mb-4 px-1">Size</h3>
            <div class="flex flex-wrap gap-2 px-1">
              <button 
                v-for="size in sizeList" 
                :key="size.id"
                @click="toggleSize(size.name)"
                class="min-w-[40px] h-10 px-3 rounded-lg border text-sm font-bold uppercase transition-all duration-200"
                :class="selectedSizes.includes(size.name) ? 'border-primary bg-primary text-black shadow-md' : 'border-gray-200 text-gray-600 hover:border-black hover:text-black hover:bg-gray-50'"
              >
                {{ size.name }}
              </button>
            </div>
          </div>

          <!-- Color Filter -->
          <div>
            <h3 class="font-bold text-gray-900 mb-4 px-1">Color</h3>
            <div class="flex flex-wrap gap-3 px-1">
              <button
                v-for="color in colorList"
                :key="color.id"
                @click="toggleColor(color.name)"
                class="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
                :class="[
                  ['White', 'Beige'].includes(color.name) ? 'border border-gray-300' : 'border border-transparent',
                  selectedColors.includes(color.name) ? 'ring-2 ring-primary ring-offset-2 scale-110 shadow-md' : 'hover:scale-110 shadow-sm'
                ]"
                :style="{ backgroundColor: color.hex_code }"
                :title="color.name"
              >
                <Icon 
                   v-if="selectedColors.includes(color.name)" 
                   name="mdi:check" 
                   class="text-sm shadow-sm"
                   :class="['White', 'Yellow', 'Beige'].includes(color.name) ? 'text-black' : 'text-white'"
                />
              </button>
            </div>
          </div>

        </aside>

        <!-- Product Grid -->
        <main class="w-full lg:w-4/5">
          
          <!-- Top Bar -->
          <div class="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4 bg-gray-50 py-3 px-5 rounded-2xl border border-gray-100">
            <p class="text-sm font-bold text-gray-700">
              Showing <span class="text-primary">{{ paginatedProducts.length }}</span> of <span class="text-black">{{ filteredProducts.length }}</span> Results
            </p>
            
            <div class="flex items-center gap-3">
              <span class="text-sm font-semibold text-gray-500">Sort by:</span>
              <div class="relative">
                <select 
                  v-model="sortOption" 
                  class="appearance-none bg-white border border-gray-200 text-gray-800 text-sm font-semibold rounded-lg pl-4 pr-10 py-2.5 outline-none focus:border-primary focus:ring-1 focus:ring-primary cursor-pointer shadow-sm transition-all"
                >
                  <option value="featured">Featured / Recommended</option>
                  <option value="newest">Newest Arrivals</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
                <Icon name="mdi:chevron-down" class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>
            </div>
          </div>

          <!-- Grid -->
          <div v-if="paginatedProducts.length > 0" class="flex flex-col gap-12">
            <div class="grid grid-cols-2 xl:grid-cols-3 gap-6 relative">
              <TransitionGroup name="grid-fade">
                <div v-for="product in paginatedProducts" :key="product.id" class="h-full group">
                  <ProductCard :product="product" />
                </div>
              </TransitionGroup>
            </div>
            
            <!-- Pagination Controls -->
            <div v-if="totalPages > 1" class="flex items-center justify-center gap-2 mt-4 pb-12 block w-full z-10">
              <button 
                @click="setPage(currentPage - 1)" 
                :disabled="currentPage == 1"
                class="w-10 h-10 rounded-full flex items-center justify-center border-2 border-gray-200 text-gray-600 transition-all hover:border-black hover:text-black hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Icon name="mdi:chevron-left" class="text-xl" />
              </button>
              
              <button 
                v-for="page in totalPages" 
                :key="page"
                @click="setPage(page)"
                class="w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300"
                :class="currentPage == page ? 'bg-primary text-black shadow-md border-2 border-primary' : 'border-2 border-transparent text-gray-600 hover:bg-gray-100'"
              >
                {{ page }}
              </button>

              <button 
                @click="setPage(currentPage + 1)" 
                :disabled="currentPage == totalPages"
                class="w-10 h-10 rounded-full flex items-center justify-center border-2 border-gray-200 text-gray-600 transition-all hover:border-black hover:text-black hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Icon name="mdi:chevron-right" class="text-xl" />
              </button>
            </div>
          </div>

          <!-- Empty State -->
          <div v-else class="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-300">
             <Icon name="mdi:emoticon-sad-outline" class="text-6xl text-gray-300 mb-4" />
             <h3 class="text-2xl font-bold text-gray-800 mb-2">No products found</h3>
             <p class="text-gray-500 max-w-md mx-auto mb-6">We couldn't find any products matching your current filters. Try removing some filters or adjusting your price range.</p>
             <button @click="clearFilters" class="px-8 py-3 bg-primary text-black font-bold uppercase tracking-wider rounded-xl hover:bg-black hover:text-white transition-all shadow-md">
               Clear All Filters
             </button>
          </div>
          
        </main>
      </div>
    </div>
  </div>
</template>

<style scoped>
.grid-fade-move,
.grid-fade-enter-active,
.grid-fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.grid-fade-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}

.grid-fade-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.grid-fade-leave-active {
  position: absolute;
  display: none;
}
</style>