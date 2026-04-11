<script setup lang="ts">
const authStore = useAuthStore();
const cartStore = useCartStore();
const wishlistStore = useWishlistStore();
const settings = useState('config');
const isLoggedIn = computed(() => authStore.getStatus);
const cartCount = computed(() => cartStore.cartCount);
const wishlistCount = computed(() => wishlistStore.wishlistCount);

const isSearchOpen = ref(false);
const searchQuery = ref('');

const toggleSearch = () => {
  isSearchOpen.value = !isSearchOpen.value
  if (!isSearchOpen.value) searchQuery.value = ''
}
const { data: productsData, pending: searchPending } = await useAPI(() => `/frontend/v1/product${searchQuery.value ? '?search=' + encodeURIComponent(searchQuery.value) : ''}`, { lazy: true });
const { data: categoriesData } = await useAPI("/frontend/v1/category");
const { data: menuBanners } = await useAPI("/frontend/v1/get-menu-Banner");
// get only first item
const banner = computed(() => menuBanners.value?.[0] || null);
const searchResultsList = computed(() => {
  if (!productsData.value) return [];
  return Array.isArray(productsData.value) ? productsData.value : (productsData.value?.data || []);
});

const navCategories = computed(() => {
  if (!categoriesData.value) return [];
  return Array.isArray(categoriesData.value) ? categoriesData.value : (categoriesData.value?.data || []);
});

const recentSearches = ref<string[]>([])

onMounted(() => {
  const saved = localStorage.getItem('recentSearches')
  if (saved) {
    try {
      recentSearches.value = JSON.parse(saved)
    } catch (e) { }
  }
})

const handleSearch = () => {
  const query = searchQuery.value.trim()
  if (query) {
    const current = recentSearches.value.filter(s => s.toLowerCase() !== query.toLowerCase())
    current.unshift(query)
    recentSearches.value = current.slice(0, 5)
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches.value))

    navigateTo(`/products?search=${encodeURIComponent(query)}`)
    isSearchOpen.value = false
    searchQuery.value = ''
  }
}

const clearRecentSearches = () => {
  recentSearches.value = []
  localStorage.removeItem('recentSearches')
}

const navLinks = [
  { to: '/', label: 'Home', icon: 'mdi:home-outline' },
  { to: '/products', label: 'Products', icon: 'mdi:shopping-outline', hasMegaMenu: true },
  { to: '/blog', label: 'Blog', icon: 'mdi:newspaper-variant-outline' },
  { to: '/about', label: 'About', icon: 'mdi:information-outline' },
  { to: '/contact', label: 'Contact', icon: 'mdi:headset' },
]
</script>

<template>
  <header class="navbar-wrapper hidden lg:block relative">
    <!-- Main Navbar -->
    <div class="bg-white shadow-[0_2px_12px_rgba(19,161,253,0.08)] relative z-[60]">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between h-20 gap-8">

          <!-- Logo -->
          <NuxtLink to="/" class="flex-shrink-0 flex items-center transition-transform duration-200 hover:scale-105">
            <img :src="settings?.logo_dark" alt="Loomino" class="h-14 w-auto object-contain rounded-lg" />
          </NuxtLink>

          <!-- Nav Links (Moved here from bottom bar) -->
          <nav class="flex-1 flex items-center justify-center gap-1">
            <div v-for="link in navLinks" :key="link.to" class="relative group">
              <NuxtLink :to="link.to"
                class="flex items-center px-4 py-2 text-sm font-semibold text-gray-700 transition-all duration-200 rounded-full relative hover:bg-primary/5 hover:text-secondary [&.nav-link-active]:bg-primary/10 [&.nav-link-active]:text-primary group/link"
                :class="{ 'nav-link-active': $route.path == link.to || ($route.path.startsWith(link.to) && link.to !== '/') }">
                <Icon :name="link.icon" class="text-lg mr-1.5" />
                {{ link.label }}
                <!-- Dropdown Icon -->
                <Icon v-if="link.hasMegaMenu" name="mdi:chevron-down"
                  class="text-lg ml-0.5 transition-transform duration-300 group-hover:rotate-180" />
                <span
                  class="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary transition-all duration-250 rounded-full group-hover/link:w-[40%] group-[.nav-link-active]/link:w-[40%]"></span>
              </NuxtLink>

              <!-- Mega Menu Dropdown -->
              <div v-if="link.hasMegaMenu"
                class="absolute top-full left-1/2 -translate-x-1/3 pt-5 w-[950px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 pointer-events-none group-hover:pointer-events-auto">
                <!-- Mega Menu Container -->
                <div
                  class="bg-white/95 backdrop-blur-xl rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-gray-100 p-8 grid grid-cols-12 gap-8 relative overflow-hidden transform origin-top translate-y-4 group-hover:translate-y-0 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]">

                  <!-- Column 1: Categories -->
                  <div class="col-span-5">
                    <h3 class="flex items-center gap-2 text-sm font-bold text-gray-900 mb-6">
                      <Icon name="mdi:shape-outline" class="text-primary text-xl" />
                      Categories
                    </h3>
                    <ul class="grid grid-cols-2 gap-x-4 gap-y-2">
                      <li v-for="cat in navCategories.slice(0, 10)" :key="cat.id || cat.name">
                        <NuxtLink :to="`/products?category=${encodeURIComponent(cat.name)}`"
                          class="group/link flex items-center justify-between px-3 py-1 rounded-xl text-gray-600 hover:text-primary hover:bg-primary/5 transition-all duration-300">
                          <div class="flex items-center gap-3">
                            <div
                              class="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-50 text-gray-400 group-hover/link:bg-white group-hover/link:text-primary group-hover/link:shadow-sm transition-all duration-300 transform group-hover/link:scale-105">
                              <Icon :name="cat.icon || 'mdi:tag-outline'" class="text-[17px]" />
                            </div>
                            <span class="text-sm font-semibold">{{ cat.name }}</span>
                          </div>
                          <Icon name="mdi:arrow-right"
                            class="text-sm opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-300" />
                        </NuxtLink>
                      </li>
                    </ul>
                  </div>

                  <!-- Column 2: Featured Promo -->
                  <div v-if="banner"
                    class="col-span-7 relative rounded-2xl overflow-hidden group/promo shadow-lg h-[320px]">
                    <img :src="banner.banner_image_url || '/images/hero2.png'" alt="Promo"
                      class="absolute inset-0 w-full h-full object-cover transition-transform duration-[2000ms] group-hover/promo:scale-110" />

                    <!-- Overlay -->
                    <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>

                    <div class="absolute inset-0 p-8 flex flex-col justify-center">
                      <div
                        class="transform translate-y-4 group-hover/promo:translate-y-0 transition-transform duration-500 ease-out">
                        <!-- Badge -->
                        <div
                          class="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full mb-4 w-max">
                          <span class="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                          New Season
                        </div>

                        <!-- Title -->
                        <h4 class="text-white font-extrabold text-3xl mb-2 drop-shadow-md leading-tight">
                          {{ banner.title }}
                        </h4>

                        <!-- Description -->
                        <p class="text-white/80 text-sm mb-6 max-w-[90%] leading-relaxed font-medium">
                          {{ banner.subtitle }}
                        </p>

                        <!-- Button -->
                        <NuxtLink to="/products"
                          class="inline-flex items-center gap-1.5 bg-primary text-black text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-full hover:bg-white hover:text-black transition-colors duration-300 w-max shadow-lg">
                          Shop Now
                          <Icon name="mdi:arrow-right" class="text-lg" />
                        </NuxtLink>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>

          <!-- Right Actions -->
          <div class="flex items-center gap-3">
            <!-- Search Toggle -->
            <button
              class="flex items-center justify-center w-11 h-11 rounded-full bg-white text-gray-700 border border-gray-200 cursor-pointer transition-all duration-200 hover:text-primary hover:border-primary hover:bg-primary/5 hover:-translate-y-[1px] hover:shadow-lg relative"
              @click="toggleSearch" title="Search">
              <Icon :name="isSearchOpen ? 'mdi:close' : 'mdi:magnify'" class="text-2xl" />
            </button>

            <!-- Wishlist -->
            <NuxtLink to="/wishlist"
              class="flex items-center justify-center w-11 h-11 rounded-full bg-white text-gray-700 border border-gray-200 cursor-pointer transition-all duration-200 hover:text-primary hover:border-primary hover:bg-primary/5 hover:-translate-y-[1px] hover:shadow-lg relative"
              title="Wishlist">
              <Icon name="mdi:heart-outline" class="text-2xl" />
              <span v-if="wishlistCount > 0"
                class="absolute -top-1 -right-1 bg-red-500 text-white text-[0.65rem] font-bold min-w-[20px] h-[20px] rounded-full flex items-center justify-center px-1 border-2 border-white leading-none shadow-sm">{{
                  wishlistCount > 9 ? '9+' : wishlistCount }}</span>
            </NuxtLink>

            <!-- Cart -->
            <NuxtLink to="/cart"
              class="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary to-secondary text-black rounded-full font-bold transition-all duration-300 relative shadow-md hover:-translate-y-[2px] hover:shadow-xl hover:opacity-95"
              title="Cart">
              <Icon name="mdi:cart-outline" class="text-2xl" />
              <span
                class="absolute -top-1 -right-1 bg-red-500 text-white text-[0.65rem] font-bold min-w-[20px] h-[20px] rounded-full flex items-center justify-center px-1 border-2 border-white leading-none shadow-sm"
                v-if="cartCount > 0">{{ cartCount > 9 ? '9+' : cartCount }}</span>
            </NuxtLink>

            <!-- Auth -->
            <template v-if="isLoggedIn">
              <NuxtLink to="/dashboard"
                class="flex items-center gap-2 px-5 py-2.5 border-2 border-gray-100 rounded-full text-gray-700 font-bold transition-all duration-200 hover:border-primary hover:text-primary hover:bg-primary/5"
                title="My Account">
                <Icon name="mdi:account-circle-outline" class="text-2xl" />
                <span class="text-sm">
                  {{ authStore?.user?.name?.split(' ').slice(0, 2).join(' ') }}
                </span>
              </NuxtLink>
            </template>
            <template v-else>
              <NuxtLink to="/auth/login"
                class="flex items-center gap-2 px-5 py-2.5 border-2 border-primary/20 rounded-full text-gray-800 font-bold transition-all duration-200 hover:bg-primary hover:border-primary hover:shadow-lg">
                <Icon name="mdi:login" class="text-xl" />
                <span class="text-sm">Login</span>
              </NuxtLink>
            </template>
          </div>
        </div>
      </div>
    </div>

    <!-- Search Dropdown (Appears bellow header) -->
    <Transition name="slide-down">
      <div v-if="isSearchOpen"
        class="absolute top-full left-0 w-full bg-white/95 backdrop-blur-md border-b border-black/10 shadow-xl z-50">
        <div class="container mx-auto px-4 py-6">
          <div class="container mx-auto">
            <div class="relative group">
              <Icon name="mdi:magnify"
                class="absolute left-6 top-1/2 -translate-y-1/2 text-4xl text-gray-400 group-focus-within:text-primary transition-colors" />
              <input v-model="searchQuery" type="text" placeholder="What are you looking for today?"
                class="w-full bg-gray-50 border-2 border-transparent focus:border-primary focus:bg-white rounded-3xl py-6 pl-20 pr-40 text-2xl text-gray-800 outline-none transition-all shadow-inner"
                @keyup.enter="handleSearch" ref="searchInput" />
              <button
                class="absolute right-4 top-1/2 -translate-y-1/2 bg-primary px-8 py-4 rounded-xl font-bold text-black text-lg hover:opacity-90 transition-opacity"
                @click="handleSearch">
                Search
              </button>
            </div>
            <!-- Instant Search Results -->
            <div v-if="searchQuery && !searchPending && searchResultsList.length"
              class="mt-8 border-t border-gray-100 pt-6">
              <div class="flex items-center justify-between mb-6">
                <h3 class="text-sm font-bold text-gray-900 flex items-center gap-2">
                  <Icon name="mdi:lightning-bolt" class="text-primary text-lg" />
                  Instant Results
                </h3>
                <button @click="handleSearch"
                  class="text-xs font-bold text-gray-500 hover:text-primary transition-colors flex items-center gap-1">
                  View All
                  <Icon name="mdi:arrow-right" />
                </button>
              </div>
              <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
                <NuxtLink v-for="product in searchResultsList.slice(0, 5)" :key="product.id"
                  :to="`/product/${product.slug}`"
                  class="group flex flex-col gap-3 p-3 rounded-2xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all duration-300"
                  @click="toggleSearch">
                  <div class="aspect-[4/5] rounded-xl overflow-hidden bg-gray-100 relative">
                    <img :src="product?.cover_image_url || '/images/hero1.webp'" alt="Product"
                      class="w-[400px] h-auto object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                  </div>
                  <div class="flex flex-col flex-1">
                    <h4
                      class="text-xs font-bold text-gray-800 line-clamp-2 leading-relaxed group-hover:text-primary transition-colors">
                      {{ product.title }}</h4>
                    <div class="flex items-center gap-2 mt-auto pt-2">
                      <span class="text-sm font-black text-black">৳{{ product.discount_price || product.price }}</span>
                      <span v-if="product.discount_price && product.discount_price !== product.price"
                        class="text-[10px] text-gray-400 line-through font-semibold">৳{{ product.price }}</span>
                    </div>
                  </div>
                </NuxtLink>
              </div>
            </div>

            <div v-else-if="searchQuery && !searchPending && searchResultsList.length == 0"
              class="mt-8 border-t border-gray-100 pt-10 pb-4 text-center">
              <Icon name="mdi:text-box-search-outline" class="text-4xl text-gray-300 mb-3" />
              <p class="text-sm font-medium text-gray-500">No products found for "<span class="text-black font-bold">{{
                searchQuery }}</span>"</p>
            </div>

            <div v-else-if="searchPending && searchQuery" class="mt-8 border-t border-gray-100 pt-10 pb-4 text-center">
              <Icon name="mdi:loading" class="text-3xl text-primary animate-spin mb-3" />
              <p class="text-sm font-medium text-gray-500">Searching...</p>
            </div>

            <div v-else class="mt-4">
              <ClientOnly>
                <div v-if="recentSearches.length > 0" class="flex justify-between gap-3 px-4">
                  <div class="flex gap-3">
                    <div class="flex items-center justify-between">
                      <span class="text-xs font-bold text-gray-400 uppercase tracking-widest">Recent Searches:</span>
                    </div>
                    <div class="flex flex-wrap gap-2 items-center">
                      <button v-for="tag in recentSearches" :key="tag" @click="searchQuery = tag; handleSearch()"
                        class="px-4 py-1.5 bg-gray-50 border border-gray-100 rounded-full text-xs font-semibold text-gray-600 hover:bg-primary hover:text-black hover:border-primary transition-colors flex items-center gap-1.5 shadow-sm">
                        <Icon name="mdi:history" class="text-[14px] opacity-70" />
                        {{ tag }}
                      </button>
                    </div>
                  </div>
                  <button @click="clearRecentSearches"
                    class="text-xs text-red-500 hover:text-red-700 font-bold transition-colors">Clear</button>
                </div>
                <div v-else class="py-4 text-center">
                  <p class="text-xs font-semibold text-gray-400 uppercase tracking-widest">No recent searches</p>
                </div>
              </ClientOnly>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
/* ── Transitions ── */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.nav-link-active {
  color: #000 !important;
}
</style>
