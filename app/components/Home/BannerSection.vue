<template>
  <section v-for="banner in offerBanners" :key="banner.id" class="relative">
    <div class="flex flex-wrap">
      <div
        class="relative w-full h-[300px] sm:h-[400px] lg:h-[500px] bg-cover bg-center"
        :style="{
          backgroundImage: banner?.banner_image_url
            ? `url(${banner?.banner_image_url})`
            : '',
        }"
      >
        <div class="absolute inset-0"></div>
        <div class="absolute inset-0 flex items-center justify-center text-center">
          <div class="w-full px-4 sm:px-6 lg:w-5/6 relative z-10">
            <div class="flex flex-col text-white">
              <div class="flex justify-center w-full pb-2">
                <div class="flex items-center gap-3 sm:gap-4 w-full max-w-md sm:max-w-lg">
                  <span class="flex-1 h-px bg-black"></span>
                  <p class="text-xs sm:text-sm md:text-base text-black uppercase whitespace-nowrap">
                    {{ banner?.subtitle }}
                  </p>
                  <span class="flex-1 h-px bg-black"></span>
                </div>
              </div>
              <h2 class="text-3xl sm:text-3xl text-black md:text-3xl lg:text-5xl font-extrabold font-marcellus uppercase leading-[1.1]">
                {{ banner?.title }}
              </h2>

              <!-- Coupon Countdown Section -->
              <ul v-if="hasValidCoupons" class="flex justify-center gap-2 sm:gap-4 items-center mt-6 sm:mt-10">
                <li class="flex flex-col items-center">
                  <span class="text-secondary font-semibold text-4xl sm:text-6xl">{{ countdown.days }}</span>
                  <p class="text-xs sm:text-sm text-black uppercase font-medium">Days</p>
                </li>
                <li class="text-black font-semibold text-4xl sm:text-6xl mb-4">:</li>
                <li class="flex flex-col items-center">
                  <span class="text-secondary font-semibold text-4xl sm:text-6xl">{{ countdown.hours }}</span>
                  <p class="text-xs sm:text-sm text-black uppercase font-medium">Hours</p>
                </li>
                <li class="text-black font-semibold text-4xl sm:text-6xl mb-4">:</li>
                <li class="flex flex-col items-center">
                  <span class="text-secondary font-semibold text-4xl sm:text-6xl">{{ countdown.minutes }}</span>
                  <p class="text-xs sm:text-sm text-black uppercase font-medium">Minutes</p>
                </li>
                <li class="text-black font-semibold text-4xl sm:text-6xl mb-4">:</li>
                <li class="flex flex-col items-center">
                  <span class="text-secondary font-semibold text-4xl sm:text-6xl">{{ countdown.seconds }}</span>
                  <p class="text-xs sm:text-sm text-black uppercase font-medium">Seconds</p>
                </li>
              </ul>

              <!-- Expired Message -->
              <div v-if="expired && hasValidCoupons" class="mt-6 text-center">
                <p class="text-red-600 bg-white/80 inline-block px-4 py-2 rounded-lg font-semibold">
                  ⚠️ Offer Expired! ⚠️
                </p>
              </div>

              <!-- Coupon Codes Section -->
              <div v-if="hasValidCoupons" class="flex flex-wrap justify-center gap-4 mt-8">
                <div
                  v-for="coupon in activeCoupons"
                  :key="coupon.id"
                  class="group relative rounded-lg p-3 bg-white/10 backdrop-blur-md border border-white/20 shadow-lg transition-all duration-300 cursor-pointer hover:bg-white/20 hover:scale-105"
                  @click="copyToClipboard(coupon.code)"
                >
                  <span class="text-black text-sm lg:text-lg font-semibold">COUPON: </span>
                  <b class="text-sm lg:text-lg text-secondary">{{ coupon?.code }}</b>
                  
                  <!-- Coupon Details Tooltip -->
                  <span class="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-20">
                    {{ getCouponDetails(coupon) }}
                  </span>
                  
                  <!-- Tooltip on hover -->
                  <span class="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    Click to copy
                  </span>
                </div>
              </div>

              <!-- Fallback when no coupons available -->
              <div v-else class="mt-6 text-center">
                <p class="text-gray-600 bg-white/80 inline-block px-4 py-2 rounded-lg">
                  No active coupons available at the moment.
                </p>
              </div>

              <div class="flex justify-center mt-3 sm:mt-6 lg:mt-8">
                <NuxtLink
                  to="/products"
                  class="flex uppercase items-center space-x-2 text-black bg-primary px-4 sm:px-6 py-2 text-base sm:text-lg font-medium tracking-wider hover:bg-secondary transition-all ease-in-out duration-300 shadow-md"
                >
                  Order Now
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Toast Notification -->
    <div 
      v-if="toastMessage" 
      class="fixed bottom-5 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg z-50 transition-all duration-300"
      :class="toastType == 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'"
    >
      {{ toastMessage }}
    </div>
  </section>
</template>

<script setup>
const settings = useState('config');
const { data: offerBanners } = await useAPI("/frontend/v1/get-Offer-Banner");
const { data: coupons } = await useAPI("/frontend/v1/get-coupon");

// Countdown state
const countdown = ref({ days: 0, hours: 0, minutes: 0, seconds: 0 });
const expired = ref(false);
let timer = null;

// Toast notification state
const toastMessage = ref('');
const toastType = ref('success');
let toastTimeout = null;

// Filter only active coupons
const activeCoupons = computed(() => {
  if (!coupons.value || !Array.isArray(coupons.value)) return [];
  return coupons.value.filter(coupon => coupon.status === 'active');
});

// Check if we have valid active coupons
const hasValidCoupons = computed(() => {
  return activeCoupons.value.length > 0;
});

// Get the earliest expiry date from active coupons for countdown
const getEarliestExpiryDate = () => {
  if (!hasValidCoupons.value) return null;
  
  const dates = activeCoupons.value
    .map(coupon => coupon.expiry_date)
    .filter(date => date)
    .map(date => new Date(date).getTime());
  
  if (dates.length === 0) return null;
  
  // Return the earliest expiry date
  const earliestDate = Math.min(...dates);
  return earliestDate;
};

// Format coupon details for tooltip
const getCouponDetails = (coupon) => {
  const details = [];
  if (coupon.type === 'fixed') {
    details.push(`${coupon.value} OFF`);
  } else if (coupon.type === 'percentage') {
    details.push(`${coupon.value}% OFF`);
  }
  
  if (coupon.cart_value) {
    details.push(`Min order: ${coupon.cart_value}`);
  }
  
  return details.join(' • ');
};

// Start countdown timer based on the earliest coupon expiry date
const startCountdown = () => {
  // Clear any existing timer
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
  
  // Reset expired flag
  expired.value = false;
  
  // Check if we have active coupons
  if (!hasValidCoupons.value) {
    console.log("No active coupons available");
    return;
  }
  
  const endTime = getEarliestExpiryDate();
  
  if (!endTime || isNaN(endTime)) {
    console.error("Invalid expiry date for coupons");
    return;
  }

  if (typeof window !== 'undefined') {
    // Initial evaluation to not wait 1s
    const calculateTime = () => {
      const now = new Date().getTime();
      const distance = endTime - now;

      if (distance <= 0) {
        if (timer) clearInterval(timer);
        timer = null;
        expired.value = true;
        countdown.value = { days: 0, hours: 0, minutes: 0, seconds: 0 };
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      countdown.value = { days, hours, minutes, seconds };
    };

    calculateTime();
    timer = setInterval(calculateTime, 1000);
  }
};

// Show toast notification
const showToast = (message, type = 'success') => {
  // Clear existing timeout
  if (toastTimeout) {
    clearTimeout(toastTimeout);
  }
  
  toastMessage.value = message;
  toastType.value = type;
  
  // Auto hide after 3 seconds
  toastTimeout = setTimeout(() => {
    toastMessage.value = '';
    toastTimeout = null;
  }, 3000);
};

// Copy coupon code to clipboard with enhanced feedback
const copyToClipboard = async (code) => {
  if (!code) {
    showToast("No coupon code to copy!", "error");
    return;
  }
  
  try {
    // Modern clipboard API with fallback
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(code);
      showToast(`✨ Coupon "${code}" copied to clipboard!`, "success");
    } else {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = code;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.select();
      const successful = document.execCommand("copy");
      document.body.removeChild(textArea);
      
      if (successful) {
        showToast(`✨ Coupon "${code}" copied to clipboard!`, "success");
      } else {
        throw new Error("Copy failed");
      }
    }
  } catch (err) {
    console.error("Copy failed:", err);
    showToast("Failed to copy coupon code. Please try again!", "error");
  }
};

// Watch for coupons changes and restart countdown if needed
watch(() => coupons.value, (newCoupons) => {
  if (newCoupons && Array.isArray(newCoupons) && newCoupons.length > 0) {
    // Reset expired flag and restart countdown
    expired.value = false;
    startCountdown();
  } else {
    // Clear timer if no coupons
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }
}, { immediate: true, deep: true });

// Cleanup timer on component unmount
onUnmounted(() => {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
  if (toastTimeout) {
    clearTimeout(toastTimeout);
  }
});

// Start countdown on mount
onMounted(() => {
  startCountdown();
});
</script>

<style scoped>
/* Optional: Add smooth transitions for hover effects */
.group {
  transition: all 0.2s ease-in-out;
}

/* Ensure tooltip has proper z-index */
.group span {
  z-index: 20;
}

/* Responsive adjustments for coupon cards */
@media (max-width: 640px) {
  .group {
    padding: 0.5rem;
  }
  .group span.text-sm {
    font-size: 0.75rem;
  }
}
</style>