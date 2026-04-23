<script setup>
import { ref, computed } from 'vue';

const isDrawerOpen = ref(false);
const isSearchOpen = ref(false);
const searchQuery = ref('');

const cartStore = useCartStore();
const cartCount = computed(() => cartStore.cartCount);

const toggleDrawer = () => {
  isDrawerOpen.value = !isDrawerOpen.value;
};

const toggleSearch = () => {
  isSearchOpen.value = !isSearchOpen.value;
  if (!isSearchOpen.value) {
    searchQuery.value = '';
  }
};

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    navigateTo(`/products?search=${encodeURIComponent(searchQuery.value.trim())}`);
    isSearchOpen.value = false;
    searchQuery.value = '';
  }
};

const collections = [
  {
    name: "Prom Dresses",
    subcategories: ["Mermaid", "Ball Gown", "A-Line", "Two-Piece"]
  },
  {
    name: "Wedding",
    subcategories: ["Bridal Gowns", "Bridesmaids", "Mother of the Bride"]
  },
  {
    name: "Evening & Gala",
    subcategories: ["Long Sleeve", "Off-Shoulder", "Sequins", "Velvet"]
  },
  {
    name: "Quinceañera",
    subcategories: ["Sweet 16", "Ruffled", "Corset Back"]
  }
];

const mainLinks = [
  { name: 'HOME', to: '/' },
  { name: 'NEW ARRIVALS', to: '/products' },
  { name: 'HOMECOMING', to: '/products?category=Homecoming' },
  { name: 'WEDDING', to: '/products?category=Bridal' },
  { name: 'LOGIN / REGISTER', to: '/auth/login' }
];
</script>

<template>
  <div class="cc-mobile-header relative z-[60]">
    <div class="mobile-topbar text-center py-2 px-1 text-[11px] text-white tracking-widest font-normal uppercase"
      style="background: #111; font-family: 'Jost', sans-serif;">
      FREE STANDARD SHIPPING ON U.S. ORDERS OVER $200
    </div>
    <div
      class="header-main flex items-center justify-between px-4 py-2 bg-white border-b border-gray-100 shadow-sm relative z-30">
      <!-- Burger -->
      <button @click="toggleDrawer" class="burger-btn">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
          stroke-linecap="round" stroke-linejoin="round">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>

      <!-- Logo -->
      <NuxtLink to="/" class="mobile-logo">
        <img src="/images/logo-transparent.png" alt="CCollection"
          style="height: 55px; mix-blend-mode: multiply; object-fit: contain;" />
      </NuxtLink>

      <!-- Right actions -->
      <div class="flex gap-4 items-center right-actions">
        <button @click="toggleSearch">
          <svg v-if="!isSearchOpen" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <NuxtLink to="/cart" class="relative">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
          <span
            v-if="cartCount > 0"
            class="absolute -top-1 -right-2 bg-[#d4929f] text-white text-[9px] font-bold h-4 min-w-[16px] px-[2px] rounded-full flex items-center justify-center">{{ cartCount }}</span>
        </NuxtLink>
      </div>
    </div>

    <!-- Mobile Search Dropdown -->
    <Transition name="slide-down">
      <div v-if="isSearchOpen" class="absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-xl z-50 p-4">
        <div class="relative">
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Search products..." 
            class="w-full bg-gray-50 border border-gray-200 rounded-full py-2.5 pl-4 pr-10 text-sm outline-none focus:border-[#d4929f] transition-colors"
            @keyup.enter="handleSearch"
          />
          <button @click="handleSearch" class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#d4929f]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </div>
      </div>
    </Transition>

    <!-- Sidebar Drawer -->
    <transition name="fade">
      <div v-if="isDrawerOpen" class="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm" @click="toggleDrawer"></div>
    </transition>

    <div
      class="mobile-drawer fixed top-0 left-0 h-full bg-white z-50 w-[85%] max-w-sm flex flex-col transition-transform duration-300 transform"
      :class="isDrawerOpen ? 'translate-x-0' : '-translate-x-full'">
      <div class="drawer-header flex items-center justify-between p-4 border-b border-gray-100 bg-[#fbfaf8]">
        <img src="/images/logo-transparent.png" alt="CCollection" style="height: 45px; mix-blend-mode: multiply;" />
        <button @click="toggleDrawer" class="text-gray-500 hover:text-black">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      <div class="drawer-body flex-1 overflow-y-auto p-6 font-jost" style="font-family: 'Jost', sans-serif;">
        <!-- All Collections Accordion approach -->
        <div class="mb-4">
          <h3 class="text-xs font-semibold text-gray-400 mb-4 tracking-widest uppercase"
            style="font-family: 'Cinzel', serif;">All Collections</h3>
          <div v-for="col in collections" :key="col.name" class="mb-6">
            <NuxtLink to="/products" class="block font-medium text-[15px] mb-3 text-[#d4929f] uppercase tracking-wide">{{
              col.name }}</NuxtLink>
            <div class="pl-4 flex flex-col gap-3 border-l-2 border-pink-50">
              <NuxtLink v-for="sub in col.subcategories" :key="sub" to="/products"
                class="text-[14px] text-gray-600 block hover:text-[#d4929f]">{{ sub }}</NuxtLink>
            </div>
          </div>
        </div>
        <div class="divider h-px bg-gray-100 my-6"></div>
        <div>
          <h3 class="text-xs font-semibold text-gray-400 mb-4 tracking-widest uppercase"
            style="font-family: 'Cinzel', serif;">Navigate</h3>
          <NuxtLink v-for="link in mainLinks" :key="link.name" :to="link.to"
            class="block font-medium text-[14px] mb-4 uppercase text-[#111] hover:text-[#d4929f] tracking-wide">{{
              link.name }}</NuxtLink>
        </div>
      </div>
      <div class="drawer-footer p-4 border-t border-gray-100 bg-gray-50 flex justify-center gap-6">
        <a href="#" class="text-gray-500 hover:text-[#d4929f]"><svg width="20" height="20" fill="currentColor"
            viewBox="0 0 24 24">
            <path
              d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.31h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z" />
          </svg></a>
        <a href="#" class="text-gray-500 hover:text-[#d4929f]"><svg width="20" height="20" fill="currentColor"
            viewBox="0 0 24 24">
            <path
              d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg></a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.burger-btn {
  color: #111;
}

.right-actions {
  color: #111;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* ── Transitions ── */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
