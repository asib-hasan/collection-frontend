<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const wishlistStore = useWishlistStore();
const cartStore = useCartStore();

// ── Computed Data ───────────────────────────────────────────────────
const discountedPrice = computed(() => {
  return parseFloat(props.item.discount_price || props.item.price || 0);
});

const oldPrice = computed(() => {
  return parseFloat(props.item.price || 0);
});

const discountPercentage = computed(() => {
  const p = discountedPrice.value;
  const op = oldPrice.value;
  if (op > p) return Math.round(((op - p) / op) * 100);
  return 0;
});

// Cart item built from base product data (no variations)
const cartItem = computed(() => ({
  id: props.item.id,
  name: props.item.title || props.item.name,
  price: discountedPrice.value,
  quantity: 1,
  stock: props.item.stock ?? 99,
  sku: props.item.sku,
  category: props.item.category?.name || props.item.category,
  image: props.item.cover_image_url || props.item.image_url,
  image_url: props.item.cover_image_url || props.item.image_url,
}));

const isInCart = computed(() => cartStore.isInCart(cartItem.value));

// ── Handlers ──────────────────────────────────────────────────────
const handleAddToCartAction = () => {
  confirmMoveToCart();
};

const confirmMoveToCart = () => {
  // Add to cart
  cartStore.addToCart(cartItem.value);
  
  // Remove from wishlist
  wishlistStore.removeFromWishlist(props.item as any);
};

const handleRemove = () => {
  wishlistStore.removeFromWishlist(props.item as any);
};
</script>

<template>
  <div class="group bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-gray-200 transition-all duration-300 flex flex-col h-full">

    <!-- Image -->
    <div class="relative w-full aspect-[3/4] overflow-hidden bg-gray-50">
      <img
        :src="item.cover_image_url || item.image_url || '/images/placeholder.webp'"
        :alt="item.title || item.name"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />

      <!-- Badges -->
      <div class="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
        <span v-if="item.status" class="bg-primary text-black text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">New</span>
        <span v-if="discountPercentage > 0" class="bg-red-500 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">-{{ discountPercentage }}%</span>
      </div>

      <!-- Remove (heart) -->
      <button
        @click="handleRemove"
        class="absolute top-3 right-3 z-10 w-9 h-9 bg-white rounded-full flex items-center justify-center text-red-500 hover:bg-red-50 shadow-md transition-all duration-200 hover:scale-110"
        title="Remove from Wishlist"
      >
        <Icon name="mdi:heart" class="text-lg" />
      </button>

      <!-- Move to Cart overlay -->
      <div class="absolute bottom-0 inset-x-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/60 to-transparent">
        <button
          @click="handleAddToCartAction"
          class="w-full bg-white/90 backdrop-blur-sm text-black font-bold py-2.5 rounded-xl hover:bg-primary transition-colors shadow-lg flex items-center justify-center gap-2 text-sm"
        >
          <Icon :name="isInCart ? 'mdi:check-circle' : 'mdi:cart-arrow-right'" class="text-lg" />
          {{ isInCart ? 'In Cart ✓' : 'Move to Cart' }}
        </button>
      </div>
    </div>

    <!-- Info -->
    <div class="p-3 sm:p-4 flex flex-col flex-grow">
      <span class="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">{{ item.category?.name || item.category || 'Product' }}</span>
      <h3 class="font-bold text-gray-900 text-sm sm:text-base leading-tight line-clamp-2 mb-2 flex-grow">{{ item.title || item.name }}</h3>

      <!-- Price -->
      <div class="flex items-center gap-2 mb-4">
        <span class="text-base sm:text-lg font-black text-gray-900">৳{{ discountedPrice.toFixed(2) }}</span>
        <span v-if="discountPercentage > 0" class="text-sm text-gray-400 line-through">৳{{ oldPrice.toFixed(2) }}</span>
      </div>
    </div>
  </div>
</template>
