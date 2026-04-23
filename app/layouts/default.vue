<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useCartStore } from '~/stores/cart';
import { useAuthStore } from '~/stores/auth';

const cartStore = useCartStore();
const cartCount = computed(() => cartStore.cartCount);

const authStore = useAuthStore();
const isLoggedIn = computed(() => authStore.loggedIn);

const mainNavLinks = [
  { name: '2026 COLLECTION', to: '/products?category=2026+Collection' },
  { name: 'JUST ARRIVED', to: '/products?category=Just+Arrived' },
  { name: 'PROMOTION', to: '/products?promotion=true' },
  { name: 'BRANDS', to: '/brands' },
  { name: 'PROM', to: '/products?category=Prom' },
  { name: 'BRIDAL', to: '/products?category=Bridal' },
  { name: 'QUINCEANERA', to: '/products?category=Quinceanera' },
  { name: 'HOMECOMING', to: '/products?category=Homecoming' },
  { name: 'KIDS', to: '/products?category=Kids' },
  { name: 'COLLECTIONS', to: '/collections' },
  { name: 'BLOG', to: '/blog' },
  { name: 'CONTACT US', to: '/contact' },
  { name: 'STORES', to: '/stores' }
];
</script>

<template>
  <div class="cc-layout">
    <MobileHeader class="mobile-header-root" />
    <header class="cc-header">
      <!-- Top Section -->
      <div class="header-top container mx-auto px-4 lg:px-8">
        <!-- Left: Social & Contact Icons -->
        <div class="header-left">
          <a href="#" aria-label="X (Twitter)"><Icon name="ri:twitter-x-line" /></a>
          <a href="#" aria-label="Facebook"><Icon name="mdi:facebook" /></a>
          <a href="#" aria-label="YouTube"><Icon name="mdi:youtube" /></a>
          <a href="#" aria-label="Instagram"><Icon name="mdi:instagram" /></a>
          <a href="#" aria-label="TikTok"><Icon name="ic:baseline-tiktok" /></a>
          <a href="#" aria-label="Phone"><Icon name="mdi:phone-outline" /></a>
          <a href="#" aria-label="Email"><Icon name="mdi:email-outline" /></a>
        </div>

        <!-- Center: Brand / Logo -->
        <div class="header-center">
          <NuxtLink to="/" class="font-weight">CCOLLECTION</NuxtLink>
        </div>

        <!-- Right: Actions -->
        <div class="header-right">
          <div class="actions-main">
            <button aria-label="Search">
              <Icon name="mdi:magnify" />
            </button>
            <NuxtLink v-if="!isLoggedIn" to="/auth/login">LOGIN</NuxtLink>
            <NuxtLink v-else to="/dashboard">MY ACCOUNT</NuxtLink>
          </div>
        </div>
      </div>

      <!-- Bottom Section: Navigation -->
      <nav class="header-bottom">
        <ul class="nav-links">
          <li v-for="link in mainNavLinks" :key="link.name">
            <NuxtLink :to="link.to">{{ link.name }}</NuxtLink>
          </li>
        </ul>
      </nav>
    </header>
    <main class="cc-main">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<style scoped>
/* Reset & Fonts setup for premium look */
@import url('https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600&display=swap');

.cc-layout {
  font-family: 'Jost', sans-serif;
  color: #1a1a1a;
  background-color: #fff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.cc-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: #fff;
  border-bottom: 1px solid #eaeaea;
  padding-top: 15px;
}

.header-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 15px;
}

.header-left {
  display: flex;
  gap: 15px;
  align-items: center;
  flex: 1;
}

.header-left a {
  color: #000;
  font-size: 16px;
  transition: color 0.3s ease;
  display: flex;
  align-items: center;
}

.header-left a:hover {
  color: #666;
}

.header-center {
  flex: 2;
  text-align: center;
  font-weight: bold;
}

.header-center a {
  font-family: 'Jost', sans-serif;
  font-size: 46px;
  font-weight: 300;
  letter-spacing: 0.08em;
  color: #000;
  text-decoration: none;
  text-transform: uppercase;
  line-height: 1;
}

.header-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
}

.actions-main {
  display: flex;
  align-items: center;
  gap: 15px;
}

.actions-main button {
  background: none;
  border: none;
  cursor: pointer;
  color: #000;
  font-size: 20px;
  display: flex;
  align-items: center;
  padding: 0;
}

.actions-main button:hover {
  color: #666;
}

.actions-main a {
  font-size: 13px;
  font-weight: 400;
  letter-spacing: 0.05em;
  color: #000;
  text-decoration: none;
  text-transform: uppercase;
  transition: color 0.3s ease;
}

.actions-main a:hover {
  color: #666;
}

.header-bottom {
  border-top: 1px solid #f2f2f2;
}

.nav-links {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 28px;
  list-style: none;
  padding: 16px 0;
  margin: 0;
  flex-wrap: wrap;
}

.nav-links li a {
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0.08em;
  color: #111;
  text-decoration: none;
  text-transform: uppercase;
  transition: color 0.3s ease;
  position: relative;
}

.nav-links li a:hover {
  color: #666;
}

.nav-links li a::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0%;
  height: 1px;
  background-color: #111;
  transition: width 0.3s ease;
}

.nav-links li a:hover::after {
  width: 100%;
}

.cc-main {
  flex: 1;
}

@media (max-width: 1024px) {
  .cc-header {
    display: none !important;
  }
}

@media (min-width: 1025px) {
  .mobile-header-root {
    display: none !important;
  }
}
</style>
