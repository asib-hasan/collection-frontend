<script setup lang="ts">
const cartStore = useCartStore();

onMounted(() => {
  cartStore.clearCart();
});

useHead({
  title: 'Order Confirmed | Loomino',
});

// Mock order data for visual purposes
const orderDate = new Date().toLocaleDateString('en-US', { 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric' 
});

const steps = [
  { title: 'Confirmed', desc: 'Processing shortly', icon: 'mdi:check-circle', active: true },
  { title: 'Processing', desc: 'Quality checking', icon: 'mdi:package-variant-closed', active: false },
  { title: 'Shipping', desc: 'Wait for dispatch', icon: 'mdi:truck-delivery', active: false },
  { title: 'Delivery', desc: 'Arriving soon', icon: 'mdi:home-variant', active: false },
]
</script>

<template>
  <div class="min-h-screen bg-[#fafafa] flex items-center justify-center p-4 md:p-8 font-sans selection:bg-primary/30">
    <!-- Main Card Container -->
    <div class="max-w-3xl w-full bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden relative">
      
      <!-- Top Decorative Bar -->
      <div class="h-2 w-full bg-gradient-to-r from-primary via-secondary to-primary" />

      <div class="p-8 md:p-12">
        <!-- Success Header -->
        <div class="text-center mb-12">
          <div class="relative inline-block mb-6">
            <!-- Animated outer ring -->
            <div class="absolute inset-0 rounded-full bg-green-100 animate-ping opacity-20" />
            <!-- Icon pulse -->
            <div class="absolute -inset-4 rounded-full bg-green-50 animate-pulse opacity-40" />
            
            <div class="relative w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-xl shadow-green-100 ring-8 ring-white">
              <Icon name="mdi:check" class="text-4xl text-white drop-shadow-md" />
            </div>
            
            <!-- Confetti icons -->
            <Icon name="mdi:party-popper" class="absolute -top-2 -right-2 text-2xl text-yellow-500 animate-bounce" />
            <Icon name="mdi:sparkles" class="absolute -bottom-2 -left-2 text-2xl text-primary animate-pulse" />
          </div>

          <h1 class="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight mb-4">
            Thank you for <br class="sm:hidden" /> <span class="text-primary italic">Your Order!</span>
          </h1>
          <p class="text-gray-500 text-lg max-w-md mx-auto leading-relaxed">
            Your payment was successful and your order is being prepared with care.
          </p>
        </div>

        <!-- Order Basic Info Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          <div class="bg-gray-50/50 border border-gray-100 rounded-3xl p-6 flex items-center gap-4 group hover:bg-white hover:shadow-md transition-all duration-300">
            <div class="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-primary">
              <Icon name="mdi:calendar-check" class="text-2xl" />
            </div>
            <div>
              <p class="text-xs font-bold text-gray-400 uppercase tracking-widest">Order Date</p>
              <p class="font-black text-gray-900">{{ orderDate }}</p>
            </div>
          </div>
          <div class="bg-gray-50/50 border border-gray-100 rounded-3xl p-6 flex items-center gap-4 group hover:bg-white hover:shadow-md transition-all duration-300">
            <div class="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-primary">
              <Icon name="mdi:shield-check" class="text-2xl" />
            </div>
            <div>
              <p class="text-xs font-bold text-gray-400 uppercase tracking-widest">Payment Status</p>
              <p class="font-black text-green-600 flex items-center gap-1.5">
                Verified
                <Icon name="mdi:check-decagram" class="text-lg" />
              </p>
            </div>
          </div>
        </div>

        <!-- Progress Stepper -->
        <div class="mb-12">
          <h3 class="text-sm font-black text-gray-900 uppercase tracking-widest mb-8 flex items-center gap-2">
            <span class="w-1.5 h-6 bg-primary rounded-full" />
            What's Next
          </h3>
          
          <div class="relative">
            <!-- Connecting line -->
            <div class="absolute top-5 left-5 right-5 h-0.5 bg-gray-100 z-0 hidden md:block" />
            
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div v-for="(step, i) in steps" :key="i" class="relative z-10 flex md:flex-col items-center gap-4 md:text-center group">
                <div 
                  class="w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-sm"
                  :class="step.active 
                    ? 'bg-primary text-black ring-4 ring-primary/20 scale-110 shadow-primary/20' 
                    : 'bg-white border-2 border-gray-100 text-gray-300 group-hover:border-gray-300'
                  "
                >
                  <Icon :name="step.icon" class="text-xl" />
                </div>
                <div>
                  <p class="font-black text-sm" :class="step.active ? 'text-gray-900' : 'text-gray-400'">{{ step.title }}</p>
                  <p class="text-[10px] font-bold uppercase tracking-tighter text-gray-400 whitespace-nowrap">{{ step.desc }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer Actions -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <NuxtLink 
            to="/dashboard"
            class="w-full sm:w-auto bg-black text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl hover:shadow-black/20 hover:-translate-y-1 active:translate-y-0 transition-all duration-300 flex items-center justify-center gap-3"
          >
            <Icon name="mdi:view-dashboard-outline" class="text-xl" />
            View Orders
          </NuxtLink>
          
          <NuxtLink 
            to="/"
            class="w-full sm:w-auto bg-white text-gray-900 border-2 border-gray-100 px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:border-primary hover:text-primary transition-all duration-300 flex items-center justify-center gap-3"
          >
            <Icon name="mdi:shopping-outline" class="text-xl" />
            Continue Shopping
          </NuxtLink>
        </div>

        <!-- Support Info -->
        <p class="text-center text-xs text-gray-400 mt-12 font-medium">
          Need help with your order? Our support team is available 24/7. <br class="hidden sm:block" />
          Reach us at <a href="mailto:support@loomino.com" class="text-primary font-bold hover:underline">support@loomino.com</a>
        </p>
      </div>

      <!-- Subtle background elements -->
      <div class="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div class="absolute -bottom-24 -left-24 w-64 h-64 bg-secondary/5 rounded-full blur-3xl" />
    </div>
  </div>
</template>

<style scoped>
@keyframes blob {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(15px, -20px) scale(1.1); }
  66% { transform: translate(-10px, 15px) scale(0.9); }
}

.animate-blob {
  animation: blob 7s linear infinite;
}
</style>
