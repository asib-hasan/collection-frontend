<script setup lang="ts">
import { computed } from 'vue';
const { data: cancellationsData } = await useAPI<any>("/frontend/v1/cancel-orders");
const cancellations = computed(() => cancellationsData.value || []);

const handleImageError = (e: any) => {
  e.target.src = "https://via.placeholder.com/300?text=Product+Image";
};

const getStatusTheme = (item: any) => {
  if (item.order_status === "cancel") {
    return "bg-red-50 text-red-600 border-red-200";
  }
  if (item.is_cancel_request) {
    return "bg-orange-50 text-orange-600 border-orange-200";
  }
  return "bg-gray-50 text-gray-600 border-gray-200";
};

const getDisplayStatus = (item: any) => {
  if (item.order_status === "cancel") return "Canceled";
  if (item.is_cancel_request) return "Cancel Pending";
  return item.order_status;
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
          class="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center flex-shrink-0"
        >
          <Icon name="ph:x-circle-duotone" class="text-red-500 text-2xl" />
        </div>
        <div>
          <h2 class="text-2xl font-black text-gray-900">My Cancellations</h2>
          <p class="text-sm text-gray-500 font-medium mt-0.5">
            View your cancelled orders and refund statuses.
          </p>
        </div>
      </div>
    </div>

    <!-- Cancellations Feed -->
    <div class="space-y-6 flex-1">
      <div v-if="cancellations.length > 0" class="space-y-6 pb-4">
        <!-- Cancellation Card -->
        <div
          v-for="cancel in cancellations"
          :key="cancel.id"
          class="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-lg hover:border-red-100 transition-all duration-300 group"
        >
          <!-- Cancellation Header -->
          <div
            class="p-5 md:p-6 border-b border-gray-100 bg-gray-50/30 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
          >
            <div class="w-full sm:w-auto">
              <div class="flex flex-wrap items-center gap-2 sm:gap-3 mb-1">
                <h3
                  class="text-lg font-black text-gray-900 flex items-center gap-2"
                >
                  <Icon name="ph:x-circle-bold" class="text-red-500" />
                  {{ cancel.order_code }}
                </h3>
                <span
                  class="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border"
                  :class="getStatusTheme(cancel)"
                >
                  <span class="flex items-center gap-1.5">
                    <span
                      v-if="cancel.is_cancel_request && cancel.order_status !== 'cancel'"
                      class="w-1.5 h-1.5 rounded-full bg-current animate-pulse"
                    ></span>
                    <Icon
                      v-if="cancel.order_status == 'cancel'"
                      name="ph:check-circle-fill"
                    />
                    {{ getDisplayStatus(cancel) }}
                  </span>
                </span>
              </div>
              <p
                class="text-xs text-gray-500 font-medium flex items-center gap-1.5"
              >
                <Icon name="ph:calendar-blank" class="text-primary/70" />
                Cancelled on
                {{
                  new Date(cancel.updated_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                }}
              </p>
            </div>
          </div>

          <!-- Product Details (Iterate over order_details) -->
          <div v-for="item in cancel.order_details" :key="item.id" class="p-5 md:p-6 bg-white border-b border-gray-50">
            <div
              class="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center"
            >
              <div
                class="relative w-20 h-20 sm:w-24 sm:h-24 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0 border border-gray-100 p-2 opacity-70 grayscale group-hover:grayscale-0 transition-all duration-500"
              >
                <img
                  :src="item.product.cover_image_url"
                  :alt="item.product.title"
                  @error="handleImageError"
                  class="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div class="flex-1 min-w-0">
                <h4
                  class="font-bold text-gray-900 text-base sm:text-lg mb-1 leading-tight line-clamp-2 line-through decoration-red-200 decoration-2 text-opacity-80"
                >
                  {{ item.product.title }}
                </h4>
                <p class="text-xs text-gray-400 font-bold uppercase tracking-widest leading-tight mb-2">
                  Qty: {{ item.quantity }} | Unit Price: ৳{{ item.price }}
                </p>
              </div>
            </div>
          </div>

          <!-- Cancellation Reason -->
          <div class="px-5 md:px-6 py-4 bg-white border-b border-gray-50">
            <div
              class="bg-gray-50 rounded-xl border border-gray-100 p-3 flex items-start gap-3"
            >
              <Icon
                name="ph:info-duotone"
                class="text-gray-400 text-lg flex-shrink-0 mt-0.5"
              />
              <div>
                <p
                  class="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-0.5"
                >
                  Cancellation Reason
                </p>
                <p
                  class="text-sm font-medium text-gray-700 leading-relaxed"
                >
                  {{ cancel.cancel_reason }}
                </p>
              </div>
            </div>
          </div>

          <!-- Refund Status -->
          <div
            class="p-5 flex items-center justify-between gap-4 bg-gray-50/50"
          >
            <div class="flex items-center gap-3">
              <div
                class="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-400"
              >
                <Icon name="ph:wallet-bold" class="text-lg" />
              </div>
              <div>
                <p
                  class="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-tight"
                >
                  Refund Status Amount
                </p>
                <span class="text-lg font-black text-gray-900 leading-none"
                  >৳{{ parseFloat(cancel.grand_total).toLocaleString() }}</span
                >
              </div>
            </div>

            <NuxtLink
              :to="'/product/' + cancel.order_details[0]?.product?.slug"
              class="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-black uppercase tracking-widest text-[10px] hover:bg-white hover:text-primary transition-all shadow-sm flex items-center gap-2 active:scale-95 shrink-0"
            >
              Buy Again
              <Icon name="ph:shopping-cart-simple-bold" class="text-sm" />
            </NuxtLink>
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
            class="relative w-full h-full bg-gray-50 rounded-full flex items-center justify-center border-4 border-white shadow-xl"
          >
            <Icon
              name="ph:check-circle-duotone"
              class="text-6xl text-green-400"
            />
          </div>
        </div>
        <h3 class="text-2xl font-black text-gray-900 mb-2">No Cancellations</h3>
        <p class="text-gray-500 mb-8 max-w-sm font-medium">
          Great news! You don't have any cancelled orders. All your orders are
          looking good.
        </p>
      </div>
    </div>
  </div>
</template>
