<script setup>
import { useCartStore } from '~/stores/cart';
import { computed } from 'vue';

useHead({ title: "Shopping Bag - CCollection" });

const cartStore = useCartStore();
const cartItems = computed(() => cartStore.cart);
const cartTotal = computed(() => cartStore.cartTotal);
const cartCount = computed(() => cartStore.cartCount);

const updateQuantity = (item, newQuantity) => {
  if (newQuantity < 1) return;
  cartStore.updateQuantity(item, newQuantity);
};

const removeItem = (item) => {
  cartStore.removeFromCart(item);
};

const shippingCost = computed(() => {
  return 0; // standard checkout calculation would go here
});

const finalTotal = computed(() => {
  return cartTotal.value;
});
</script>

<template>
  <div class="cart-page min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-[#fbfaf8]">
    <div class="max-w-7xl mx-auto">
      
      <div class="mb-12 text-center">
        <h1 class="font-cinzel text-3xl md:text-4xl font-semibold tracking-widest text-[#111] mb-2 uppercase">Shopping Bag</h1>
        <p class="font-jost text-gray-500 text-sm tracking-widest uppercase">
          {{ cartCount }} {{ cartCount === 1 ? 'Item' : 'Items' }}
        </p>
        <div class="w-16 h-px bg-[#d4929f] mx-auto mt-6"></div>
      </div>

      <!-- Empty Cart State -->
      <div v-if="cartItems.length === 0" class="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
        <div class="inline-flex items-center justify-center w-20 h-20 bg-gray-50 rounded-full mb-6 text-gray-300">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
        </div>
        <h2 class="font-cinzel text-2xl mb-4 text-[#111]">Your bag is currently empty</h2>
        <p class="font-jost text-gray-500 mb-8 max-w-md mx-auto">Discover our latest collection of premium gowns and find the perfect dress for your unforgettable moment.</p>
        <NuxtLink to="/products" class="cc-btn primary inline-block">CONTINUE SHOPPING</NuxtLink>
      </div>

      <!-- Cart Content -->
      <div v-else class="flex flex-col lg:flex-row gap-12">
        
        <!-- Cart Items List -->
        <div class="flex-1">
          <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <!-- Desktop Header -->
            <div class="hidden md:grid grid-cols-12 gap-4 p-6 border-b border-gray-100 bg-gray-50/50">
              <div class="col-span-6 font-jost text-xs tracking-widest uppercase text-gray-500 font-medium">Product</div>
              <div class="col-span-2 font-jost text-xs tracking-widest uppercase text-gray-500 font-medium text-center">Price</div>
              <div class="col-span-2 font-jost text-xs tracking-widest uppercase text-gray-500 font-medium text-center">Quantity</div>
              <div class="col-span-2 font-jost text-xs tracking-widest uppercase text-gray-500 font-medium text-right">Total</div>
            </div>

            <!-- Items -->
            <div class="divide-y divide-gray-100">
              <div v-for="item in cartItems" :key="item.id" class="p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center transition-colors hover:bg-gray-50/30">
                
                <!-- Product Info -->
                <div class="col-span-1 md:col-span-6 flex gap-4">
                  <div class="w-24 h-32 bg-gray-100 rounded-md overflow-hidden flex-shrink-0 relative">
                    <img v-if="item.image || item.image_url" :src="item.image || item.image_url" :alt="item.name" class="w-full h-full object-cover" />
                    <div v-else class="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">No Image</div>
                  </div>
                  <div class="flex flex-col justify-center">
                    <h3 class="font-jost text-[15px] font-medium text-[#111] mb-1 leading-snug">{{ item.name }}</h3>
                    <p class="font-jost text-xs text-gray-500 mb-2 uppercase tracking-wide">
                      <span v-if="item.color">Color: {{ item.color }}</span>
                      <span v-if="item.color && item.size" class="mx-1">|</span>
                      <span v-if="item.size">Size: {{ item.size }}</span>
                    </p>
                    <button @click="removeItem(item)" class="text-left font-jost text-xs tracking-widest text-red-400 hover:text-red-600 uppercase transition-colors flex items-center gap-1 mt-auto w-max">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                      Remove
                    </button>
                  </div>
                </div>

                <!-- Price (Desktop) -->
                <div class="hidden md:block col-span-2 text-center font-jost text-[15px] text-[#111]">
                  ${{ item.price.toFixed(2) }}
                </div>

                <!-- Mobile Price & Quantity Group -->
                <div class="md:hidden flex items-center justify-between mt-2">
                  <div class="font-jost text-[15px] text-[#111] font-medium">
                    ${{ item.price.toFixed(2) }}
                  </div>
                  
                  <div class="flex items-center border border-gray-200 rounded">
                    <button @click="updateQuantity(item, item.quantity - 1)" class="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-[#d4929f] transition-colors">-</button>
                    <span class="w-8 text-center font-jost text-sm">{{ item.quantity }}</span>
                    <button @click="updateQuantity(item, item.quantity + 1)" class="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-[#d4929f] transition-colors">+</button>
                  </div>
                </div>

                <!-- Quantity (Desktop) -->
                <div class="hidden md:flex col-span-2 justify-center">
                  <div class="flex items-center border border-gray-200 rounded-md">
                    <button @click="updateQuantity(item, item.quantity - 1)" class="w-9 h-9 flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-[#d4929f] transition-colors">-</button>
                    <span class="w-8 text-center font-jost text-sm">{{ item.quantity }}</span>
                    <button @click="updateQuantity(item, item.quantity + 1)" class="w-9 h-9 flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-[#d4929f] transition-colors">+</button>
                  </div>
                </div>

                <!-- Total -->
                <div class="hidden md:block col-span-2 text-right font-jost text-[15px] text-[#111] font-medium">
                  ${{ (item.price * item.quantity).toFixed(2) }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="w-full lg:w-[380px] shrink-0">
          <div class="bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8 sticky top-24">
            <h2 class="font-cinzel text-xl text-[#111] mb-6 border-b border-gray-100 pb-4">Order Summary</h2>
            
            <div class="space-y-4 font-jost text-[15px] mb-6">
              <div class="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${{ cartTotal.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
            </div>

            <div class="border-t border-gray-100 pt-6 mb-8">
              <div class="flex justify-between items-end">
                <span class="font-jost text-sm uppercase tracking-widest text-[#111] font-medium">Estimated Total</span>
                <span class="font-cinzel text-2xl font-semibold text-[#111]">${{ finalTotal.toFixed(2) }}</span>
              </div>
              <p class="font-jost text-xs text-gray-400 mt-2 text-right">Taxes calculated at checkout</p>
            </div>

            <NuxtLink to="/checkout" class="cc-btn primary w-full text-center block mb-4">
              PROCEED TO CHECKOUT
            </NuxtLink>
            
            <div class="flex items-center justify-center gap-2 text-gray-400">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              <span class="font-jost text-xs uppercase tracking-wider">Secure Checkout</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>

/* Primary Button Matching Global Style */
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
  box-shadow: 0 4px 14px 0 rgba(212, 146, 159, 0.39);
}

.cc-btn.primary:hover {
  background-color: transparent;
  color: #d4929f;
  box-shadow: none;
}
</style>
