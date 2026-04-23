<script setup lang="ts">
import { ref } from "vue";

// Mock Returns Data
const returns = ref([
  {
    id: 1,
    return_code: "RET-2025-X001",
    order_code: "ORD-2025-X891",
    status: "processing", // pending, processing, approved, refunded, rejected
    requested_at: "2025-03-24T10:00:00Z",
    refund_amount: 1500,
    reason:
      "Damaged upon arrival. The front glass panel had a visible scratch.",
    product: {
      id: 4,
      title: "Kids Hoodies",
      slug: "kids-hoodies",
      image_url: "/images/kids-hoodies.webp",
    },
  },
  {
    id: 2,
    return_code: "RET-2025-A054",
    order_code: "ORD-2024-C991",
    status: "refunded",
    requested_at: "2024-11-12T14:30:00Z",
    refund_amount: 5000,
    reason: "Wrong color sent. Ordered matte black but received glossy white.",
    product: {
      id: 5,
      title: "Summer Outfit",
      slug: "summer-outfit",
      image_url: "/images/category-5.webp",
    },
  },
]);

const handleImageError = (e: any) => {
  e.target.src = "https://via.placeholder.com/300?text=Product+Image";
};

const getStatusTheme = (status: string) => {
  switch (status) {
    case "refunded":
      return "bg-green-50 text-green-600 border-green-200";
    case "approved":
      return "bg-blue-50 text-blue-600 border-blue-200";
    case "processing":
      return "bg-orange-50 text-orange-600 border-orange-200";
    case "pending":
      return "bg-purple-50 text-purple-600 border-purple-200";
    case "rejected":
      return "bg-red-50 text-red-600 border-red-200";
    default:
      return "bg-gray-50 text-gray-600 border-gray-200";
  }
};
</script>

<template>
  <div class="h-full flex flex-col">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 pb-4 border-b border-gray-100">
      <div class="flex items-center gap-4">
        <div class="w-10 h-10 flex items-center justify-center border border-gray-200 text-[#111]">
          <Icon name="mdi:keyboard-return" class="text-xl" />
        </div>
        <div>
          <h2 class="font-cinzel text-2xl tracking-widest text-[#111] uppercase">My Returns</h2>
          <p class="font-jost text-[13px] text-gray-500 tracking-wide mt-1">Track your product returns and refunds.</p>
        </div>
      </div>

      <button class="font-jost text-[11px] font-medium tracking-[2px] uppercase text-[#111] border-b border-[#111] pb-0.5 hover:text-[#d4929f] hover:border-[#d4929f] transition-colors flex items-center gap-2">
        Return Policy <Icon name="mdi:arrow-right" class="text-sm" />
      </button>
    </div>

    <!-- Returns Feed -->
    <div class="space-y-6 flex-1">
      <div v-if="returns.length > 0" class="space-y-8 pb-4">
        <!-- Return Card -->
        <div
          v-for="ret in returns"
          :key="ret.id"
          class="bg-white border border-gray-200 group"
        >
          <!-- Return Header -->
          <div class="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#fbfaf8]">
            <div class="w-full sm:w-auto">
              <div class="flex flex-wrap items-center gap-3 mb-2">
                <h3 class="font-cinzel text-lg tracking-widest text-[#111] uppercase flex items-center gap-2">
                  <Icon name="mdi:keyboard-return" class="text-[#d4929f]" />
                  {{ ret.return_code }}
                </h3>
                <span
                  class="px-3 py-1 text-[10px] font-jost font-medium uppercase tracking-[2px] border bg-white"
                  :class="{
                    'border-green-200 text-green-700': ret.status == 'refunded',
                    'border-[#d4929f] text-[#d4929f]': ret.status == 'approved',
                    'border-orange-200 text-orange-600': ret.status == 'processing',
                    'border-gray-300 text-gray-600': ret.status == 'pending',
                    'border-red-200 text-red-600': ret.status == 'rejected'
                  }"
                >
                  <span class="flex items-center gap-1.5">
                    <span v-if="ret.status == 'processing' || ret.status == 'pending'" class="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>
                    {{ ret.status }}
                  </span>
                </span>
              </div>
              <p class="text-xs text-gray-500 font-jost tracking-wide flex items-center gap-2 uppercase">
                Requested on
                {{ new Date(ret.requested_at).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) }}
              </p>
            </div>

            <div class="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
              <div class="text-left sm:text-right shrink-0">
                <p class="font-jost text-[10px] text-gray-400 font-medium uppercase tracking-[2px] mb-1">Original Order</p>
                <span class="text-sm font-jost font-medium text-[#111] border-b border-transparent hover:border-[#111] cursor-pointer transition-colors pb-0.5">
                  {{ ret.order_code }}
                </span>
              </div>
            </div>
          </div>

          <!-- Product Returned -->
          <div class="p-6 bg-white border-b border-gray-100">
            <div class="flex flex-col sm:flex-row gap-6 items-start">
              <div class="relative w-24 aspect-[2/3] bg-[#f9f9f9] flex-shrink-0">
                <img
                  :src="ret.product.image_url"
                  :alt="ret.product.title"
                  @error="handleImageError"
                  class="w-full h-full object-cover mix-blend-multiply"
                />
              </div>

              <div class="flex-1 min-w-0">
                <h4 class="font-jost text-[15px] text-[#111] mb-4 hover:text-[#d4929f] transition-colors cursor-pointer tracking-wide">
                  {{ ret.product.title }}
                </h4>
                <div class="p-4 bg-[#fbfaf8] border-l-2 border-[#d4929f]">
                  <p class="font-jost text-[13px] text-gray-600 italic leading-relaxed">
                    "{{ ret.reason }}"
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Return Financials -->
          <div class="p-6 flex items-center justify-between gap-4 bg-white">
            <div class="flex items-center gap-3">
              <div>
                <p class="font-jost text-[10px] text-gray-400 font-medium uppercase tracking-[2px] mb-1">Expected Refund</p>
                <span class="text-xl font-jost font-medium text-[#111]">৳{{ ret.refund_amount.toLocaleString() }}</span>
              </div>
            </div>

            <button class="px-6 py-3 border border-gray-200 text-[#111] hover:bg-[#111] hover:text-white transition-colors duration-300 font-jost text-[11px] font-medium tracking-[2px] uppercase shrink-0">
              View Details
            </button>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="flex-1 flex flex-col items-center justify-center text-center py-20 bg-white border border-gray-100 animate-fade-in-up">
        <div class="w-16 h-16 flex items-center justify-center border border-gray-200 mb-6 bg-[#fbfaf8]">
          <Icon name="mdi:keyboard-return" class="text-2xl text-gray-400" />
        </div>
        <h3 class="font-cinzel text-xl tracking-widest text-[#111] uppercase mb-3">No Returns Requested</h3>
        <p class="font-jost text-[14px] text-gray-500 tracking-wide max-w-sm mb-8">
          Any items you request to return for a refund or replacement will appear here.
        </p>
      </div>
    </div>
  </div>
</template>
