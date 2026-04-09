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
    <div
      class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8"
    >
      <div class="flex items-center gap-3">
        <div
          class="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0"
        >
          <Icon
            name="ph:arrow-u-down-left-duotone"
            class="text-primary text-2xl"
          />
        </div>
        <div>
          <h2 class="text-2xl font-black text-gray-900">My Returns</h2>
          <p class="text-sm text-gray-500 font-medium mt-0.5">
            Track your product returns and refunds.
          </p>
        </div>
      </div>

      <button
        class="px-5 py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-black uppercase tracking-widest text-xs hover:border-primary hover:text-primary hover:bg-primary/5 transition-all text-center flex items-center gap-2 active:scale-95 w-full sm:w-auto justify-center"
      >
        <Icon name="ph:question-bold" class="text-sm" /> Return Policy
      </button>
    </div>

    <!-- Returns Feed -->
    <div class="space-y-6 flex-1">
      <div v-if="returns.length > 0" class="space-y-6 pb-4">
        <!-- Return Card -->
        <div
          v-for="ret in returns"
          :key="ret.id"
          class="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group"
        >
          <!-- Return Header -->
          <div
            class="p-5 md:p-6 border-b border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
          >
            <div class="w-full sm:w-auto">
              <div class="flex flex-wrap items-center gap-2 sm:gap-3 mb-1">
                <h3
                  class="text-lg font-black text-gray-900 flex items-center gap-2"
                >
                  <Icon name="ph:arrow-u-down-left-bold" class="text-primary" />
                  {{ ret.return_code }}
                </h3>
                <span
                  class="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border"
                  :class="getStatusTheme(ret.status)"
                >
                  <span class="flex items-center gap-1.5">
                    <span
                      v-if="
                        ret.status == 'processing' || ret.status == 'pending'
                      "
                      class="w-1.5 h-1.5 rounded-full bg-current animate-pulse"
                    ></span>
                    {{ ret.status }}
                  </span>
                </span>
              </div>
              <p
                class="text-xs text-gray-500 font-medium flex items-center gap-1.5"
              >
                <Icon name="ph:calendar-blank" class="text-primary/70" />
                Requested on
                {{
                  new Date(ret.requested_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })
                }}
              </p>
            </div>

            <div
              class="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end"
            >
              <div class="text-left sm:text-right shrink-0">
                <p
                  class="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-0.5"
                >
                  Original Order
                </p>
                <span
                  class="text-sm font-black text-primary leading-none cursor-pointer hover:underline"
                >
                  {{ ret.order_code }}
                </span>
              </div>
            </div>
          </div>

          <!-- Product Returned -->
          <div class="p-5 md:p-6 bg-white border-b border-gray-50">
            <div
              class="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center"
            >
              <div
                class="relative w-20 h-20 sm:w-24 sm:h-24 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0 border border-gray-100 p-2"
              >
                <img
                  :src="ret.product.image_url"
                  :alt="ret.product.title"
                  @error="handleImageError"
                  class="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div class="flex-1 min-w-0">
                <h4
                  class="font-bold text-gray-900 text-base sm:text-lg mb-1 leading-tight line-clamp-2"
                >
                  {{ ret.product.title }}
                </h4>
                <div
                  class="p-4 bg-orange-50/50 rounded-xl border border-orange-100/50 mt-3 relative"
                >
                  <Icon
                    name="ph:quotes-fill"
                    class="absolute -top-3 left-4 text-3xl text-orange-200 opacity-50 bg-white"
                  />
                  <p
                    class="text-sm font-medium text-orange-800 italic relative z-10 leading-relaxed"
                  >
                    {{ ret.reason }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Return Financials -->
          <div
            class="p-5 flex items-center justify-between gap-4 bg-gray-50/50"
          >
            <div class="flex items-center gap-3">
              <div
                class="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-400"
              >
                <Icon name="ph:money-bold" class="text-lg" />
              </div>
              <div>
                <p
                  class="text-[10px] text-gray-400 font-bold uppercase tracking-widest"
                >
                  Expected Refund
                </p>
                <span class="text-lg font-black text-gray-900"
                  >৳{{ ret.refund_amount.toLocaleString() }}</span
                >
              </div>
            </div>

            <button
              class="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-black uppercase tracking-widest text-[10px] hover:bg-white hover:text-primary transition-all shadow-sm flex items-center gap-2 active:scale-95 shrink-0"
            >
              View Details <Icon name="ph:caret-right-bold" class="text-sm" />
            </button>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div
        v-else
        class="flex-1 flex flex-col items-center justify-center text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm"
      >
        <div class="relative w-32 h-32 mb-6">
          <div
            class="absolute inset-0 bg-primary/10 rounded-full animate-ping opacity-70"
          ></div>
          <div
            class="relative w-full h-full bg-gray-50 rounded-full flex items-center justify-center border-4 border-white shadow-xl"
          >
            <Icon
              name="ph:arrow-u-down-left-duotone"
              class="text-6xl text-gray-300"
            />
          </div>
        </div>
        <h3 class="text-2xl font-black text-gray-900 mb-2">
          No Returns Requested
        </h3>
        <p class="text-gray-500 mb-8 max-w-sm font-medium">
          Any items you request to return for a refund or replacement will
          appear here.
        </p>
      </div>
    </div>
  </div>
</template>
