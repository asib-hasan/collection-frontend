<script setup lang="ts">
useHead({ title: "Products | Loomino" });

// Filter States
const route = useRoute()
const selectedCategory = ref(route.query.category as string || 'All')
const selectedSizes = ref<string[]>([])
const selectedColors = ref<string[]>([])
const maxPrice = ref(5000)

const isMobileFilterOpen = ref(false)
const toggleMobileFilter = () => {
  isMobileFilterOpen.value = !isMobileFilterOpen.value
}

const searchQueryStr = computed(() => route.query.search as string || '')

watch(() => route.query.category, (newCat) => {
  selectedCategory.value = newCat as string || 'All'
})

const mockProducts = [
  {
    id: 1,
    slug: 'GL3674',
    title: 'Ruffled Tulle Ball Gown',
    price: 520,
    discount_price: 520,
    stock: 10,
    category: { name: 'Prom 2026' },
    cover_image_url: '/images/image6.webp',
    hover_image_url: '/images/image7.webp',
    base_variations: [
      {
        id: 1,
        color: { name: 'Champagne', hex_code: '#f5dbe0' },
        prices: [{ id: 1, size: { name: 'S' }, price: 520, unit_price: 520, stock: 5 }]
      }
    ]
  },
  {
    id: 2,
    slug: 'GL3675',
    title: 'Sequin Sweetheart Dress',
    price: 390,
    discount_price: 390,
    stock: 10,
    category: { name: 'Evening' },
    cover_image_url: '/images/image8.webp',
    hover_image_url: '/images/image9.webp',
    base_variations: [
      {
        id: 2,
        color: { name: 'Black', hex_code: '#111' },
        prices: [{ id: 2, size: { name: 'M' }, price: 390, unit_price: 390, stock: 5 }]
      }
    ]
  },
  {
    id: 3,
    slug: 'GL3676',
    title: 'Long Sleeve Velvet Elegance',
    price: 310,
    discount_price: 310,
    stock: 10,
    category: { name: 'Bridal' },
    cover_image_url: '/images/image16.webp',
    hover_image_url: '/images/image17.webp',
    base_variations: [
      {
        id: 3,
        color: { name: 'Burgundy', hex_code: '#521727' },
        prices: [{ id: 3, size: { name: 'L' }, price: 310, unit_price: 310, stock: 5 }]
      }
    ]
  },
  {
    id: 4,
    slug: 'GL3677',
    title: 'Floral Applique A-Line',
    price: 480,
    discount_price: 480,
    stock: 10,
    category: { name: 'Homecoming' },
    cover_image_url: '/images/image19.webp',
    hover_image_url: '/images/image20.webp',
    base_variations: [
      {
        id: 4,
        color: { name: 'Champagne', hex_code: '#f5dbe0' },
        prices: [{ id: 4, size: { name: 'S' }, price: 480, unit_price: 480, stock: 5 }]
      }
    ]
  }
];

const categoryList = computed(() => [
  { id: 'all', name: 'All', icon: 'mdi:view-grid-outline' },
  { id: 1, name: 'Prom 2026', icon: 'mdi:tag-outline' },
  { id: 2, name: 'Evening', icon: 'mdi:tag-outline' },
  { id: 3, name: 'Bridal', icon: 'mdi:tag-outline' },
  { id: 4, name: 'Homecoming', icon: 'mdi:tag-outline' }
]);

const productList = computed(() => mockProducts);

const colorList = computed(() => [
  { id: 1, name: 'Champagne', hex_code: '#f5dbe0' },
  { id: 2, name: 'Black', hex_code: '#111' },
  { id: 3, name: 'Burgundy', hex_code: '#521727' }
]);

const sizeList = computed(() => [
  { id: 1, name: 'XXS' },
  { id: 2, name: 'XS' },
  { id: 3, name: 'S' },
  { id: 4, name: 'M' },
  { id: 5, name: 'L' },
  { id: 6, name: 'XL' }
]);

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
  <div class="products-page min-h-screen bg-[#fbfaf8] py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-[1500px] mx-auto">
      
      <!-- Page Header -->
      <div class="text-center mb-16 animate-fade-in-up">
        <h1 class="font-cinzel text-3xl md:text-5xl font-semibold tracking-widest text-[#111] mb-4 uppercase">Our Collection</h1>
        <div class="w-16 h-px bg-[#d4929f] mx-auto mb-6"></div>
        <p class="font-jost text-gray-500 text-sm md:text-base tracking-widest uppercase max-w-2xl mx-auto leading-relaxed">
          Discover our full collection of premium gowns and accessories filtered to your exact preferences.
        </p>
      </div>

      <div class="flex flex-col lg:flex-row gap-12">
        <!-- Filter Drawer Overlay (Mobile) -->
        <transition name="fade">
          <div v-if="isMobileFilterOpen" class="fixed inset-0 bg-black/60 z-[60] lg:hidden backdrop-blur-sm" @click="toggleMobileFilter"></div>
        </transition>

        <!-- Sidebar Filters -->
        <aside 
          class="fixed lg:static top-0 right-0 h-full lg:h-auto w-[85%] max-w-sm lg:w-[280px] bg-white lg:bg-transparent z-[70] lg:z-auto transition-transform duration-300 transform lg:transform-none flex-shrink-0 flex flex-col shadow-2xl lg:shadow-none"
          :class="isMobileFilterOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'"
        >
          <!-- Mobile Drawer Header -->
          <div class="lg:hidden flex items-center justify-between p-4 border-b border-gray-100 bg-[#fbfaf8] flex-shrink-0">
            <h2 class="font-cinzel text-lg font-semibold tracking-wider text-[#111] uppercase flex items-center gap-2">
              <Icon name="mdi:tune-variant" class="text-xl" /> Filters
            </h2>
            <button @click="toggleMobileFilter" class="text-gray-500 hover:text-black p-2">
              <Icon name="mdi:close" class="text-2xl" />
            </button>
          </div>

          <div class="p-6 lg:p-0 lg:sticky top-24 space-y-10 flex-1 overflow-y-auto lg:overflow-visible">
            
            <div class="hidden lg:flex items-center justify-between pb-4 border-b border-gray-200">
              <h2 class="font-cinzel text-lg font-semibold tracking-wider text-[#111] uppercase flex items-center gap-2">
                <Icon name="mdi:tune-variant" class="text-xl" /> Filters
              </h2>
              <button @click="clearFilters" class="font-jost text-xs font-medium tracking-widest uppercase text-gray-400 hover:text-[#d4929f] transition-colors">
                Clear All
              </button>
            </div>

            <!-- Category -->
            <div>
              <h3 class="font-jost text-xs font-medium tracking-widest uppercase text-gray-500 mb-4">Category</h3>
              <ul class="space-y-3 font-jost text-[15px]">
                <li v-for="cat in categoryList" :key="cat.id">
                  <button 
                    @click="selectedCategory = cat.name"
                    class="w-full text-left transition-colors duration-200 flex justify-between items-center group"
                    :class="selectedCategory == cat.name ? 'text-[#d4929f] font-medium' : 'text-gray-600 hover:text-[#111]'"
                  >
                    <span class="flex items-center gap-2">
                      <Icon v-if="cat.icon" :name="cat.icon" class="text-sm opacity-50" />
                      {{ cat.name }}
                    </span>
                    <Icon v-if="selectedCategory == cat.name" name="mdi:check" class="text-sm" />
                  </button>
                </li>
              </ul>
            </div>

            <!-- Price -->
            <div>
              <h3 class="font-jost text-xs font-medium tracking-widest uppercase text-gray-500 mb-4">Price: up to ৳{{ maxPrice }}</h3>
              <div>
                <input 
                  type="range" 
                  v-model="maxPrice" 
                  min="0" 
                  max="5000" 
                  step="50"
                  class="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#d4929f]"
                />
                <div class="flex justify-between font-jost text-xs text-gray-400 mt-3">
                  <span>৳0</span>
                  <span>৳5000</span>
                </div>
              </div>
            </div>

            <!-- Size -->
            <div>
              <h3 class="font-jost text-xs font-medium tracking-widest uppercase text-gray-500 mb-4">Size</h3>
              <div class="flex flex-wrap gap-2">
                <button 
                  v-for="size in sizeList" 
                  :key="size.id"
                  @click="toggleSize(size.name)"
                  class="min-w-[40px] h-10 px-3 border text-xs font-medium uppercase font-jost transition-all duration-200"
                  :class="selectedSizes.includes(size.name) ? 'border-[#d4929f] bg-[#d4929f] text-white' : 'border-gray-200 text-gray-600 hover:border-[#111] hover:text-[#111] bg-white'"
                >
                  {{ size.name }}
                </button>
              </div>
            </div>

            <!-- Color -->
            <div>
              <h3 class="font-jost text-xs font-medium tracking-widest uppercase text-gray-500 mb-4">Color</h3>
              <div class="flex flex-wrap gap-3">
                <button
                  v-for="color in colorList"
                  :key="color.id"
                  @click="toggleColor(color.name)"
                  class="w-8 h-8 rounded-full border border-gray-200 transition-all duration-200 relative flex items-center justify-center"
                  :class="selectedColors.includes(color.name) ? 'ring-1 ring-offset-2 ring-[#111]' : 'hover:scale-110'"
                  :style="{ backgroundColor: color.hex_code }"
                  :title="color.name"
                >
                  <Icon 
                    v-if="selectedColors.includes(color.name)" 
                    name="mdi:check" 
                    class="text-sm absolute"
                    :class="['White', 'Yellow', 'Beige'].includes(color.name) ? 'text-black' : 'text-white'"
                  />
                </button>
              </div>
            </div>

            <!-- Mobile Drawer Footer Actions -->
            <div class="lg:hidden mt-8 pt-6 border-t border-gray-100 pb-10">
              <button @click="clearFilters" class="w-full py-3 mb-3 border border-gray-200 font-jost text-xs font-medium tracking-widest uppercase text-gray-600 hover:text-[#d4929f] hover:border-[#d4929f] transition-colors rounded">
                Clear All Filters
              </button>
              <button @click="toggleMobileFilter" class="w-full py-3 bg-[#111] text-white font-jost text-xs font-medium tracking-widest uppercase hover:bg-[#d4929f] transition-colors rounded">
                Apply Filters
              </button>
            </div>

          </div>
        </aside>

        <!-- Product Grid Area -->
        <main class="flex-1">
          
          <!-- Top Bar -->
          <div class="flex flex-col sm:flex-row justify-between items-center mb-10 pb-4 border-b border-gray-100 gap-4">
            <p class="font-jost text-[15px] text-gray-600">
              Showing <span class="text-[#d4929f] font-medium">{{ paginatedProducts.length }}</span> of <span class="text-[#111] font-medium">{{ filteredProducts.length }}</span> Results
            </p>
            
            <div class="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
              <!-- Mobile Filter Button -->
              <button @click="toggleMobileFilter" class="lg:hidden flex items-center gap-2 font-jost text-xs font-medium tracking-widest uppercase text-gray-800 hover:text-[#d4929f] transition-colors py-2 px-3 border border-gray-200 rounded">
                <Icon name="mdi:tune-variant" class="text-lg" /> Filter
              </button>

              <div class="flex items-center gap-2">
                <span class="font-jost text-xs font-medium tracking-widest uppercase text-gray-500 hidden sm:block">Sort by:</span>
              <div class="relative">
                <select 
                  v-model="sortOption" 
                  class="appearance-none bg-transparent border-none text-[#111] font-jost text-[15px] pr-8 py-1 outline-none cursor-pointer"
                >
                  <option value="featured">Featured / Recommended</option>
                  <option value="newest">Newest Arrivals</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
                <Icon name="mdi:chevron-down" class="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          <!-- Grid -->
          <div v-if="paginatedProducts.length > 0" class="flex flex-col gap-16">
            <div class="product-grid">
              <TransitionGroup name="fade">
                <NuxtLink v-for="product in paginatedProducts" :key="product.id" :to="'/products/' + product.slug" class="product-card">
                   <div class="product-img">
                      <img :src="product.cover_image_url" :alt="product.title" class="img-front" />
                      <img :src="product.hover_image_url || product.cover_image_url" :alt="product.title" class="img-hover" />
                      <div class="quick-view">VIEW DETAILS</div>
                   </div>
                   <div class="product-meta">
                      <h4 class="name">{{ product.title }}</h4>
                      <span class="price">৳{{ product.discount_price.toFixed(2) }}</span>
                   </div>
                </NuxtLink>
              </TransitionGroup>
            </div>
            
            <!-- Pagination Controls -->
            <div v-if="totalPages > 1" class="flex items-center justify-center gap-2 border-t border-gray-100 pt-10">
              <button 
                @click="setPage(currentPage - 1)" 
                :disabled="currentPage == 1"
                class="w-10 h-10 flex items-center justify-center border border-gray-200 text-gray-400 transition-colors hover:border-[#d4929f] hover:text-[#d4929f] disabled:opacity-50 disabled:pointer-events-none"
              >
                <Icon name="mdi:chevron-left" class="text-xl" />
              </button>
              
              <button 
                v-for="page in totalPages" 
                :key="page"
                @click="setPage(page)"
                class="w-10 h-10 flex items-center justify-center font-jost text-[15px] transition-colors duration-200"
                :class="currentPage == page ? 'bg-[#d4929f] text-white border border-[#d4929f]' : 'border border-transparent text-gray-600 hover:text-[#d4929f]'"
              >
                {{ page }}
              </button>

              <button 
                @click="setPage(currentPage + 1)" 
                :disabled="currentPage == totalPages"
                class="w-10 h-10 flex items-center justify-center border border-gray-200 text-gray-400 transition-colors hover:border-[#d4929f] hover:text-[#d4929f] disabled:opacity-50 disabled:pointer-events-none"
              >
                <Icon name="mdi:chevron-right" class="text-xl" />
              </button>
            </div>
          </div>

          <!-- Empty State -->
          <div v-else class="text-center py-32 bg-white rounded-xl border border-gray-100 shadow-sm animate-fade-in-up">
             <Icon name="mdi:emoticon-sad-outline" class="text-6xl text-gray-300 mb-6 mx-auto block" />
             <h3 class="font-cinzel text-2xl font-semibold text-[#111] mb-3">No products found</h3>
             <p class="font-jost text-gray-500 max-w-md mx-auto mb-8">We couldn't find any products matching your current filters. Try removing some filters or adjusting your price range.</p>
             <button @click="clearFilters" class="cc-btn primary inline-block">
               CLEAR FILTERS
             </button>
          </div>
          
        </main>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cc-btn {
  display: inline-block;
  padding: 16px 24px;
  font-size: 13px;
  letter-spacing: 2px;
  font-weight: 500;
  text-transform: uppercase;
  text-decoration: none;
  transition: all 0.3s ease;
  font-family: 'Jost', sans-serif;
  cursor: pointer;
  border-radius: 4px;
}

.cc-btn.primary {
  background-color: #d4929f;
  color: #fff;
  border: 1px solid #d4929f;
}

.cc-btn.primary:hover {
  background-color: transparent;
  color: #d4929f;
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(15px);
}

.fade-leave-active {
  position: absolute;
  display: none;
}

/* Custom Range Input Styling for Webkit */
input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #d4929f;
  cursor: pointer;
  border: 2px solid #fff;
  box-shadow: 0 1px 3px rgba(0,0,0,0.3);
}

/* CCollection Product Card Styles */
.product-grid {
   display: grid;
   grid-template-columns: repeat(4, 1fr);
   gap: 30px;
   position: relative;
}

@media (max-width: 1280px) {
  .product-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 1024px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.product-card {
   text-decoration: none;
   color: #111;
   display: block;
}

.product-img {
   position: relative;
   aspect-ratio: 2/3;
   overflow: hidden;
   background: #f9f9f9;
   margin-bottom: 20px;
}

.product-img img {
   position: absolute;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   object-fit: cover;
   transition: opacity 0.4s ease;
}

.product-img .img-hover {
   opacity: 0;
}

.product-card:hover .img-hover {
   opacity: 1;
}

/* QUICK VIEW HOVER TEXT */
.quick-view {
   position: absolute;
   bottom: -50px;
   left: 0;
   width: 100%;
   background: rgba(255, 255, 255, 0.95);
   color: #111;
   text-align: center;
   padding: 14px 0;
   font-size: 11px;
   font-family: 'Jost', sans-serif;
   letter-spacing: 2px;
   text-transform: uppercase;
   font-weight: 500;
   transition: bottom 0.3s ease;
   z-index: 10;
   border-top: 1px solid #eee;
}

.product-card:hover .quick-view {
   bottom: 0;
}

/* PRODUCT META */
.product-meta {
   text-align: center;
}

.product-meta .name {
   font-size: 15px;
   font-weight: 400;
   margin-bottom: 8px;
   font-family: 'Jost', sans-serif;
   letter-spacing: 0.5px;
   color: #111;
}

.product-meta .price {
   font-size: 14px;
   color: #555;
   font-family: 'Jost', sans-serif;
   letter-spacing: 1px;
}
</style>