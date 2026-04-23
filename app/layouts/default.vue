<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useCartStore } from '~/stores/cart';

const cartStore = useCartStore();
const cartCount = computed(() => cartStore.cartCount);

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

const announcements = [
  "FREE STANDARD SHIPPING ON U.S. ORDERS OVER $200",
  "NEW ARRIVALS JUST DROPPED - SHOP NOW",
  "GET 10% OFF YOUR FIRST ORDER WITH CODE: WELCOME10"
];

const currentAnnouncementIndex = ref(0);
let intervalId = null;

onMounted(() => {
  intervalId = setInterval(() => {
    currentAnnouncementIndex.value = (currentAnnouncementIndex.value + 1) % announcements.length;
  }, 4000);
});

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId);
});
</script>

<template>
  <div class="cc-layout">
    <MobileHeader class="mobile-header-root" />
    <header class="cc-header">
      <div class="cc-topbar">
        <div class="topbar-left">
          <span>📍 123 Fashion Blvd, NY 10001</span>
        </div>
        <div class="topbar-center announcement-wrapper">
          <transition name="slide-fade" mode="out-in">
            <span :key="currentAnnouncementIndex" class="announcement-text">{{ announcements[currentAnnouncementIndex]
            }}</span>
          </transition>
        </div>
        <div class="topbar-right">
          <a href="#" aria-label="Facebook">
            <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.31h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z" />
            </svg>
          </a>
          <a href="#" aria-label="Instagram">
            <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>
        </div>
      </div>
      <nav class="cc-nav">
        <div class="cc-logo">
          <NuxtLink to="/" class="no-border">
            <img src="/images/logo-transparent.png" alt="CCollection" />
          </NuxtLink>
        </div>
        <div class="cc-nav-left">
          <div class="nav-item has-dropdown">
            <NuxtLink to="/products">ALL COLLECTION</NuxtLink>
            <div class="dropdown-mega">
              <div class="mega-row">
                <div class="mega-col" v-for="col in collections" :key="col.name">
                  <h4>{{ col.name }}</h4>
                  <NuxtLink v-for="sub in col.subcategories" :key="sub" to="/products">{{ sub }}</NuxtLink>
                </div>
              </div>
            </div>
          </div>
          <NuxtLink to="/products?category=Prom+2026">PROM</NuxtLink>
          <NuxtLink to="/products?category=Homecoming">HOMECOMING</NuxtLink>
          <NuxtLink to="/products?category=Bridal">WEDDING</NuxtLink>
        </div>
        <div class="cc-nav-right">
          <div class="nav-search-bar">
            <input type="text" placeholder="Search dresses..." />
            <button aria-label="Search">
              <svg width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
                <path
                  d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </button>
          </div>
          <NuxtLink to="/auth/login">LOGIN</NuxtLink>
          <NuxtLink to="/cart">BAG ({{ cartCount }})</NuxtLink>
        </div>
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
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600&family=Jost:wght@300;400;500&display=swap');

.cc-layout {
  font-family: 'Jost', sans-serif;
  color: #1a1a1a;
  background-color: #fff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Header Styles */
.cc-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: #fff;
  border-bottom: 1px solid #eee;
  transition: all 0.3s ease;
}

.cc-topbar {
  background-color: #111;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 40px;
  font-size: 11px;
  letter-spacing: 2px;
  text-transform: uppercase;
  font-weight: 400;
}

.topbar-left,
.topbar-right {
  display: flex;
  align-items: center;
  gap: 15px;
  flex: 1;
}

.topbar-right {
  justify-content: flex-end;
}

.topbar-center {
  flex: 2;
  text-align: center;
}

.announcement-wrapper {
  position: relative;
  overflow: hidden;
}

.announcement-text {
  display: inline-block;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.5s ease;
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.topbar-right a {
  color: #fff;
  opacity: 0.8;
  transition: opacity 0.3s;
}

.topbar-right a:hover {
  opacity: 1;
}

.nav-search-bar {
  display: flex;
  align-items: center;
  border-bottom: 2px solid #ccc;
  padding-bottom: 8px;
  margin-right: 25px;
  width: 320px;
}

.nav-search-bar input {
  border: none;
  background: transparent;
  outline: none;
  width: 100%;
  font-size: 16px;
  font-family: 'Jost', sans-serif;
}

.nav-search-bar button {
  background: none;
  border: none;
  cursor: pointer;
  color: #111;
  padding: 0 5px;
}

.nav-search-bar button:hover {
  color: #d4929f;
}

.cc-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 40px;
  max-width: 1600px;
  margin: 0 auto;
}

.cc-nav-left {
  display: flex;
  gap: 30px;
  flex: 1;
  align-items: center;
}

.cc-nav-right {
  display: flex;
  gap: 30px;
  align-items: center;
  justify-content: flex-end;
}

.nav-item.has-dropdown {
  position: relative;
  padding: 10px 0;
}

.dropdown-mega {
  position: absolute;
  top: 100%;
  left: 0;
  width: 700px;
  background: #fff;
  border: 1px solid #efefef;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.05);
  padding: 30px;
  display: none;
  z-index: 100;
  cursor: default;
}

.nav-item.has-dropdown:hover .dropdown-mega {
  display: block;
  animation: fadeIn 0.3s ease;
}

.mega-row {
  display: flex;
  justify-content: space-between;
  gap: 30px;
}

.mega-col h4 {
  font-family: 'Cinzel', serif;
  font-size: 14px;
  margin-bottom: 15px;
  color: #111;
  letter-spacing: 1px;
}

.mega-col a {
  display: block;
  font-family: 'Jost', sans-serif;
  font-size: 13px !important;
  color: #666 !important;
  margin-bottom: 10px;
  text-decoration: none;
  text-transform: none !important;
  letter-spacing: 0.5px !important;
  font-weight: 400 !important;
  transition: color 0.3s !important;
}

.mega-col a:hover {
  color: #d4929f !important;
}

.mega-col a::after {
  display: none !important;
}

.cc-nav a {
  text-decoration: none;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 1.5px;
  color: #333;
  text-transform: uppercase;
  position: relative;
  transition: color 0.3s ease;
}

.cc-nav a:hover {
  color: #d4929f;
  /* Blush pink accent */
}

.cc-nav a::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0%;
  height: 1px;
  background-color: #d4929f;
  transition: width 0.3s ease;
}

.cc-nav a:hover::after {
  width: 100%;
}

.no-border::after {
  display: none !important;
}

.cc-logo {
  margin-right: 40px;
  display: flex;
  align-items: center;
}

.cc-logo img {
  height: 65px;
  object-fit: contain;
  transition: transform 0.3s ease;
  mix-blend-mode: multiply;
  /* Fixes any solid white/pale pink logo background */
}

.cc-logo img:hover {
  transform: scale(1.02);
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
