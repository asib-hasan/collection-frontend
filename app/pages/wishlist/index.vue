<script setup lang="ts">
useHead({ title: 'My Wishlist | Loomino' })

const wishlistStore = useWishlistStore();
const cartStore = useCartStore();
const toast = useToast();

const wishlistItems = computed(() => wishlistStore.getWishlistItems);
const wishlistCount = computed(() => wishlistStore.wishlistCount);

const moveAllToCart = () => {
  const items = [...wishlistStore.getWishlistItems];
  const count = items.length;
  // Add all items to cart silently (bypass store to avoid N individual toasts)
  items.forEach(item => {
    const existing = cartStore.cart.find(
      (i: any) => cartStore.getProductIdentifier(i) === cartStore.getProductIdentifier(item as any)
    );
    if (existing) {
      existing.quantity += 1;
    } else {
      cartStore.cart.push({ ...item, quantity: 1 } as any);
    }
  });
  cartStore.saveCart();
  // Clear wishlist silently (skip store's clearWishlist to avoid extra toast)
  wishlistStore.wishlist.splice(0);
  wishlistStore.saveWishlist();
  // Fire one consolidated toast
  toast.add({
    title: 'Moved to Cart 🎉',
    description: `${count} item${count !== 1 ? 's' : ''} moved from your wishlist to cart`,
    color: 'primary',
    icon: 'i-heroicons-shopping-cart',
    actions: [
      {
        label: 'Go to Cart',
        color: 'primary',
        variant: 'outline',
        onClick: () => navigateTo('/cart'),
      },
    ],
  });
};
</script>

<template>
  <div class="bg-white min-h-screen">

    <!-- Page Header -->
    <div class="relative py-16 md:py-20 border-b border-gray-100 overflow-hidden">
      <img src="/images/banner.png" alt="Wishlist Banner" class="absolute inset-0 w-full h-full object-cover z-0" />
      <div class="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent z-10" />
      <div class="container mx-auto px-4 relative z-20">
        <h1 class="text-4xl md:text-5xl font-black text-gray-900 tracking-tight uppercase mb-3 drop-shadow-sm">
          My Wishlist
        </h1>
        <div class="w-20 h-1.5 bg-primary rounded-full mb-4 shadow-md" />
        <div class="flex items-center gap-2 text-gray-600 font-medium">
          <NuxtLink to="/" class="hover:text-primary transition-colors">Home</NuxtLink>
          <Icon name="mdi:chevron-right" class="text-gray-400" />
          <span class="text-gray-900">Wishlist</span>
          <span class="ml-2 bg-red-100 text-red-500 text-xs font-black px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <Icon name="mdi:heart" class="text-xs" />
            {{ wishlistCount }} item{{ wishlistCount !== 1 ? 's' : '' }}
          </span>
        </div>
      </div>
    </div>

    <!-- ── Empty State ─────────────────────────────────────────────────── -->
    <div v-if="wishlistItems.length == 0" class="container mx-auto px-4 py-24 text-center">
      <div class="max-w-md mx-auto">
        <div class="w-32 h-32 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-6 shadow-inner">
          <Icon name="mdi:heart-off-outline" class="text-6xl text-red-200" />
        </div>
        <h2 class="text-3xl font-black text-gray-900 mb-3">Your wishlist is empty</h2>
        <p class="text-gray-500 mb-8 leading-relaxed">
          Save your favourite items here so you never lose track of what you love!
        </p>
        <NuxtLink
          to="/products"
          class="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-black font-bold px-8 py-4 rounded-full shadow-lg hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
        >
          <Icon name="mdi:shopping-outline" class="text-xl" />
          Discover Products
        </NuxtLink>
      </div>
    </div>

    <!-- ── Wishlist Content ─────────────────────────────────────────── -->
    <div v-else class="container mx-auto px-4 py-6 md:py-12">

      <!-- Top Actions Bar -->
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 bg-gray-50 rounded-2xl px-6 py-4 border border-gray-100">
        <div>
          <p class="font-bold text-gray-900">
            <span class="text-primary">{{ wishlistCount }}</span> saved item{{ wishlistCount !== 1 ? 's' : '' }}
          </p>
          <p class="text-sm text-gray-500 mt-0.5">Items are saved to your local device</p>
        </div>
        <div class="flex items-center gap-3">
          <button
            @click="moveAllToCart"
            class="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary to-secondary text-black font-bold rounded-full text-sm shadow-md hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300"
          >
            <Icon name="mdi:cart-arrow-right" class="text-lg" />
            Move All to Cart
          </button>
          <button
            @click="wishlistStore.clearWishlist()"
            class="flex items-center gap-2 px-4 py-2.5 border-2 border-red-200 text-red-500 font-bold rounded-full text-sm hover:bg-red-50 hover:border-red-400 transition-all duration-200"
          >
            <Icon name="mdi:trash-can-outline" class="text-lg" />
            Clear All
          </button>
        </div>
      </div>

      <!-- Wishlist Grid -->
      <TransitionGroup
        name="wish-item"
        tag="div"
        class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-5"
      >
        <WishCard
          v-for="item in wishlistItems"
          :key="`${item.id}-${item.variant}`"
          :item="item"
        />
      </TransitionGroup>

      <!-- Continue Shopping -->
      <div class="mt-12 text-center">
        <NuxtLink
          to="/products"
          class="inline-flex items-center gap-2 text-gray-600 font-bold hover:text-primary transition-colors group"
        >
          <Icon name="mdi:arrow-left" class="text-lg group-hover:-translate-x-1 transition-transform" />
          Continue Shopping
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wish-item-enter-active,
.wish-item-leave-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.wish-item-enter-from {
  opacity: 0;
  transform: scale(0.92) translateY(10px);
}
.wish-item-leave-to {
  opacity: 0;
  transform: scale(0.9) translateX(20px);
}
.wish-item-leave-active {
  position: absolute;
}
.wish-item-move {
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
</style>
