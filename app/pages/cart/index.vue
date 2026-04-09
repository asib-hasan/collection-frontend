<script setup lang="ts">
import { computed } from 'vue'
useHead({ title: 'My Cart | Loomino' })

const cartStore = useCartStore()
const toast = useToast()

const cartItems = computed(() => cartStore.getCartItems)
const cartTotal = computed(() => cartStore.cartTotal)
const cartCount = computed(() => cartStore.cartCount)

const SHIPPING_THRESHOLD = 2000
const SHIPPING_COST = 60

const freeShipping = computed(() => cartTotal.value >= SHIPPING_THRESHOLD)
const shipping = computed(() => (freeShipping.value ? 0 : SHIPPING_COST))
const orderTotal = computed(() => Math.max(0, cartTotal.value + shipping.value))

const remainingForFreeShipping = computed(() => Math.max(0, SHIPPING_THRESHOLD - cartTotal.value))
const shippingProgress = computed(() => Math.min(100, (cartTotal.value / SHIPPING_THRESHOLD) * 100))
</script>

<template>
  <div class="bg-white min-h-screen">

    <!-- Page Header -->
    <div class="relative py-16 md:py-20 border-b border-gray-100 overflow-hidden">
      <img src="/images/cart.png" alt="Cart Banner" class="absolute inset-0 w-full h-full object-cover z-0" />
      <div class="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent z-10" />
      <div class="container mx-auto px-4 relative z-20">
        <h1 class="text-4xl md:text-5xl font-black text-gray-900 tracking-tight uppercase mb-3 drop-shadow-sm">
          Shopping Cart
        </h1>
        <div class="w-20 h-1.5 bg-primary rounded-full mb-4 shadow-md" />
        <div class="flex items-center gap-2 text-gray-600 font-medium">
          <NuxtLink to="/" class="hover:text-primary transition-colors">Home</NuxtLink>
          <Icon name="mdi:chevron-right" class="text-gray-400" />
          <span class="text-gray-900">Cart</span>
          <span class="ml-2 bg-primary text-black text-xs font-black px-2.5 py-0.5 rounded-full">
            {{ cartCount }} item{{ cartCount !== 1 ? 's' : '' }}
          </span>
        </div>
      </div>
    </div>

    <!-- ── Empty Cart State ───────────────────────────────────────── -->
    <div v-if="cartItems.length == 0" class="container mx-auto px-4 py-24 text-center">
      <div class="max-w-md mx-auto">
        <div class="w-32 h-32 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-6 shadow-inner">
          <Icon name="mdi:cart-off" class="text-6xl text-gray-300" />
        </div>
        <h2 class="text-3xl font-black text-gray-900 mb-3">Your cart is empty</h2>
        <p class="text-gray-500 mb-8 leading-relaxed">
          Looks like you haven't added anything yet. Explore our collection and find something you'll love!
        </p>
        <NuxtLink
          to="/products"
          class="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-black font-bold px-8 py-4 rounded-full shadow-lg hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
        >
          <Icon name="mdi:shopping-outline" class="text-xl" />
          Start Shopping
        </NuxtLink>
      </div>
    </div>

    <!-- ── Cart Content ─────────────────────────────────────────── -->
    <div v-else class="container mx-auto px-4 py-6 md:py-12">
      <div class="flex flex-col lg:flex-row gap-6 md:gap-10 items-start">

        <!-- LEFT: Cart Items -->
        <div class="flex-1 min-w-0 space-y-4">

          <!-- Free Shipping Progress Bar -->
          <div class="bg-gray-50 border border-gray-100 rounded-2xl p-5">
            <div v-if="freeShipping" class="flex items-center gap-3 text-green-600 font-bold">
              <Icon name="mdi:truck-check-outline" class="text-2xl" />
              <span>🎉 You've unlocked <strong>FREE shipping!</strong></span>
            </div>
            <div v-else class="space-y-2">
              <div class="flex items-center justify-between text-sm font-semibold text-gray-700">
                <span class="flex items-center gap-2">
                  <Icon name="mdi:truck-fast-outline" class="text-lg text-primary" />
                  Add <span class="text-primary font-black mx-1">৳{{ remainingForFreeShipping }}</span> more for FREE shipping
                </span>
                <span class="text-gray-400">{{ Math.round(shippingProgress) }}%</span>
              </div>
              <div class="h-2.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  class="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-700"
                  :style="{ width: shippingProgress + '%' }"
                />
              </div>
            </div>
          </div>

          <!-- Column Headers -->
          <div class="hidden md:grid grid-cols-12 gap-4 px-5 py-3 bg-gray-50 rounded-xl border border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-wider">
            <div class="col-span-6">Product</div>
            <div class="col-span-2 text-center">Price</div>
            <div class="col-span-2 text-center">Qty</div>
            <div class="col-span-2 text-right">Total</div>
          </div>

          <!-- Cart Item Rows -->
          <TransitionGroup name="cart-item" tag="div" class="space-y-3">
            <div
              v-for="item in cartItems"
              :key="`${item.id}-${item.variant}`"
              class="group bg-white border border-gray-100 rounded-2xl p-4 md:p-5 shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-300"
            >
              <div class="grid grid-cols-12 gap-4 items-center">

                <!-- Product Info -->
                <div class="col-span-12 md:col-span-6 flex items-center gap-4">
                  <!-- Image -->
                  <div class="w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0 border border-gray-100">
                    <img
                      :src="item.image || item.image_url || '/images/placeholder.webp'"
                      :alt="item.name"
                      class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <!-- Details -->
                  <div class="min-w-0">
                    <h3 class="font-bold text-gray-900 text-base leading-snug line-clamp-2 mb-1">
                      {{ item.name }}
                    </h3>
                    <div v-if="item.variant" class="flex flex-wrap gap-2 mb-2">
                      <span
                        v-for="part in item.variant.split(' / ')"
                        :key="part"
                        class="inline-block text-[11px] font-semibold text-gray-500 bg-gray-100 px-2.5 py-0.5 rounded-full"
                      >
                        {{ part }}
                      </span>
                    </div>
                    <span v-if="item.category" class="text-xs text-gray-400">{{ item.category?.name }}</span>
                    <!-- Mobile Price -->
                    <div class="md:hidden mt-1 font-black text-gray-900">৳{{ item.price.toFixed(2) }}</div>
                  </div>
                </div>

                <!-- Price (desktop) -->
                <div class="col-span-2 text-center hidden md:block">
                  <span class="font-bold text-gray-900">৳{{ item.price.toFixed(2) }}</span>
                </div>

                <!-- Quantity Controls -->
                <div class="col-span-7 md:col-span-2 flex items-center justify-start md:justify-center">
                  <div class="flex items-center bg-gray-50 border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                    <button
                      @click="cartStore.updateQuantity(item, item.quantity - 1)"
                      class="w-9 h-9 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-black transition-all duration-200 font-bold"
                    >
                      <Icon name="mdi:minus" class="text-base" />
                    </button>
                    <span class="w-10 text-center font-black text-gray-900 text-sm select-none">
                      {{ item.quantity }}
                    </span>
                    <button
                      @click="cartStore.updateQuantity(item, item.quantity + 1)"
                      class="w-9 h-9 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-black transition-all duration-200 font-bold"
                    >
                      <Icon name="mdi:plus" class="text-base" />
                    </button>
                  </div>
                </div>

                <!-- Total & Remove -->
                <div class="col-span-5 md:col-span-2 flex items-center justify-end gap-3">
                  <span class="font-black text-gray-900 text-base">
                    ৳{{ (item.price * item.quantity).toFixed(2) }}
                  </span>
                  <button
                    @click="cartStore.removeFromCart(item)"
                    class="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all duration-200 flex-shrink-0"
                    title="Remove item"
                  >
                    <Icon name="mdi:trash-can-outline" class="text-lg" />
                  </button>
                </div>

              </div>
            </div>
          </TransitionGroup>

          <!-- Cart Footer Actions -->
          <div class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-100">
            <NuxtLink
              to="/products"
              class="flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-primary transition-colors group"
            >
              <Icon name="mdi:arrow-left" class="text-lg group-hover:-translate-x-1 transition-transform" />
              Continue Shopping
            </NuxtLink>
            <button
              @click="cartStore.clearCart()"
              class="flex items-center gap-2 text-sm font-bold text-red-500 hover:text-red-600 transition-colors"
            >
              <Icon name="mdi:trash-can-outline" class="text-lg" />
              Clear Cart
            </button>
          </div>
        </div>

        <!-- RIGHT: Order Summary -->
        <aside class="w-full lg:w-[380px] flex-shrink-0 space-y-4">

          <!-- Summary Card -->
          <div class="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <h3 class="font-black text-gray-900 text-lg mb-5 flex items-center gap-2">
              <Icon name="mdi:receipt-text-outline" class="text-primary text-xl" />
              Order Summary
            </h3>

            <div class="space-y-3 mb-6">
              <div class="flex justify-between text-sm">
                <span class="text-gray-500 font-medium">Subtotal ({{ cartCount }} item{{ cartCount !== 1 ? 's' : '' }})</span>
                <span class="font-bold text-gray-900">৳{{ cartTotal.toFixed(2) }}</span>
              </div>

              
              <div class="flex justify-between text-sm">
                <span class="text-gray-500 font-medium flex items-center gap-1">
                  <Icon name="mdi:truck-fast-outline" class="text-base" />
                  Shipping
                </span>
                <span v-if="freeShipping" class="font-bold text-green-600">FREE</span>
                <span v-else class="font-bold text-gray-900">৳{{ SHIPPING_COST.toFixed(2) }}</span>
              </div>

              <div class="border-t border-dashed border-gray-200 pt-3 flex justify-between">
                <span class="font-black text-gray-900 text-base">Order Total</span>
                <span class="font-black text-primary text-xl">৳{{ orderTotal.toFixed(2) }}</span>
              </div>
            </div>

            <!-- Checkout Button -->
            <NuxtLink
              to="/checkout"
              class="flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-r from-primary to-secondary text-black font-black rounded-xl shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300 text-sm uppercase tracking-wide"
            >
              <Icon name="mdi:lock-outline" class="text-lg" />
              Proceed to Checkout
            </NuxtLink>

            <!-- Trust Badges -->
            <div class="mt-5 flex items-center justify-center gap-4 pt-4 border-t border-gray-100">
              <div class="flex flex-col items-center gap-1 text-gray-400 text-xs font-semibold">
                <Icon name="mdi:shield-check-outline" class="text-lg" />
                Secure
              </div>
              <div class="flex flex-col items-center gap-1 text-gray-400 text-xs font-semibold">
                <Icon name="mdi:lock-outline" class="text-lg" />
                SSL Encrypted
              </div>
              <div class="flex flex-col items-center gap-1 text-gray-400 text-xs font-semibold">
                <Icon name="mdi:credit-card-outline" class="text-lg" />
                Safe Pay
              </div>
              <div class="flex flex-col items-center gap-1 text-gray-400 text-xs font-semibold">
                <Icon name="mdi:package-variant-closed" class="text-lg" />
                Easy Returns
              </div>
            </div>
          </div>

          <!-- You May Also Like -->
          <div class="bg-gray-50 border border-gray-100 rounded-2xl p-6">
            <p class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Icon name="mdi:shimmer" class="text-base text-primary" />
              You Might Also Like
            </p>
            <NuxtLink
              to="/products"
              class="group flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100 hover:border-primary hover:shadow-md transition-all duration-300"
            >
              <div class="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                <img src="/images/polo-shirt.webp" alt="Featured" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div class="min-w-0">
                <p class="font-bold text-gray-800 text-sm line-clamp-1 group-hover:text-primary transition-colors">Explore More Products</p>
                <p class="text-xs text-gray-400 mt-0.5">Browse our full collection</p>
              </div>
              <Icon name="mdi:arrow-right" class="text-gray-300 group-hover:text-primary group-hover:translate-x-1 transition-all ml-auto flex-shrink-0" />
            </NuxtLink>
          </div>

        </aside>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cart-item-enter-active,
.cart-item-leave-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.cart-item-enter-from {
  opacity: 0;
  transform: translateY(-12px) scale(0.98);
}
.cart-item-leave-to {
  opacity: 0;
  transform: translateX(20px) scale(0.97);
}
.cart-item-leave-active {
  position: absolute;
  width: 100%;
}
</style>
