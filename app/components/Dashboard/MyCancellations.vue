<script setup lang="ts">
import { computed, ref } from 'vue';
const cancellationsData = ref([
  {
    id: 1,
    order_code: "ORD-2025-X091",
    order_status: "cancel",
    updated_at: "2025-04-15T09:30:00Z",
    grand_total: 4500,
    cancel_reason: "Found a better price elsewhere.",
    is_cancel_request: false,
    order_details: [
      {
        id: 201,
        quantity: 1,
        price: 4500,
        product: {
          id: 5,
          title: "Classic Leather Boots",
          slug: "classic-leather-boots",
          cover_image_url: "/images/category-3.webp",
        }
      }
    ]
  },
  {
    id: 2,
    order_code: "ORD-2025-Y112",
    order_status: "process",
    updated_at: "2025-04-22T16:45:00Z",
    grand_total: 1200,
    cancel_reason: "Ordered the wrong size.",
    is_cancel_request: true,
    order_details: [
      {
        id: 202,
        quantity: 2,
        price: 600,
        product: {
          id: 6,
          title: "Cotton Basic Tee",
          slug: "cotton-basic-tee",
          cover_image_url: "/images/category-5.webp",
        }
      }
    ]
  }
]);
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
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 pb-4 border-b border-gray-100">
      <div class="flex items-center gap-4">
        <div class="w-10 h-10 flex items-center justify-center border border-gray-200 text-[#111]">
          <Icon name="mdi:close-circle-outline" class="text-xl" />
        </div>
        <div>
          <h2 class="font-cinzel text-2xl tracking-widest text-[#111] uppercase">My Cancellations</h2>
          <p class="font-jost text-[13px] text-gray-500 tracking-wide mt-1">View your cancelled orders and refund statuses.</p>
        </div>
      </div>
    </div>

    <!-- Cancellations Feed -->
    <div class="space-y-6 flex-1">
      <div v-if="cancellations.length > 0" class="space-y-8 pb-4">
        <!-- Cancellation Card -->
        <div
          v-for="cancel in cancellations"
          :key="cancel.id"
          class="bg-white border border-gray-200"
        >
          <!-- Cancellation Header -->
          <div class="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#fbfaf8]">
            <div class="w-full sm:w-auto">
              <div class="flex flex-wrap items-center gap-3 mb-2">
                <h3 class="font-cinzel text-lg tracking-widest text-[#111] uppercase flex items-center gap-2">
                  <Icon name="mdi:close-circle-outline" class="text-red-500" />
                  {{ cancel.order_code }}
                </h3>
                <span
                  class="px-3 py-1 text-[10px] font-jost font-medium uppercase tracking-[2px] border bg-white"
                  :class="{
                    'border-red-200 text-red-600': cancel.order_status === 'cancel',
                    'border-orange-200 text-orange-600': cancel.is_cancel_request,
                    'border-gray-200 text-gray-600': !cancel.is_cancel_request && cancel.order_status !== 'cancel'
                  }"
                >
                  <span class="flex items-center gap-1.5">
                    <span v-if="cancel.is_cancel_request && cancel.order_status !== 'cancel'" class="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>
                    {{ getDisplayStatus(cancel) }}
                  </span>
                </span>
              </div>
              <p class="text-xs text-gray-500 font-jost tracking-wide flex items-center gap-2 uppercase">
                Cancelled on
                {{ new Date(cancel.updated_at).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }) }}
              </p>
            </div>
          </div>

          <!-- Product Details -->
          <div class="p-6 bg-white border-b border-gray-100">
            <div class="flex flex-col gap-6">
              <div v-for="item in cancel.order_details" :key="item.id" class="flex flex-col sm:flex-row gap-6 items-start pb-6 border-b border-gray-50 last:border-0 last:pb-0">
                <div class="relative w-24 aspect-[2/3] bg-[#f9f9f9] flex-shrink-0 opacity-70 grayscale transition-all duration-500 hover:grayscale-0">
                  <img
                    :src="item.product.cover_image_url"
                    :alt="item.product.title"
                    @error="handleImageError"
                    class="w-full h-full object-cover mix-blend-multiply"
                  />
                </div>

                <div class="flex-1 min-w-0 flex flex-col justify-center">
                  <h4 class="font-jost text-[15px] text-[#111] mb-2 line-through decoration-red-200 tracking-wide text-opacity-80">
                    {{ item.product.title }}
                  </h4>
                  <p class="font-jost text-[13px] text-gray-500 uppercase tracking-wide">
                    Qty: <span class="text-[#111] font-medium">{{ item.quantity }}</span> &nbsp;|&nbsp; ৳{{ item.price }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Cancellation Reason -->
          <div class="px-6 py-4 bg-[#fbfaf8] border-b border-gray-100">
            <div class="flex items-start gap-3">
              <Icon name="mdi:information-outline" class="text-gray-400 text-lg flex-shrink-0 mt-0.5" />
              <div>
                <p class="font-jost text-[10px] font-medium uppercase tracking-[2px] text-gray-400 mb-1">
                  Reason for Cancellation
                </p>
                <p class="font-jost text-[13px] text-gray-700 leading-relaxed italic">
                  "{{ cancel.cancel_reason || 'No reason provided' }}"
                </p>
              </div>
            </div>
          </div>

          <!-- Refund Status -->
          <div class="p-6 flex items-center justify-between gap-4 bg-white">
            <div class="flex items-center gap-3">
              <div>
                <p class="font-jost text-[10px] text-gray-400 font-medium uppercase tracking-[2px] mb-1">
                  Refund Amount
                </p>
                <span class="text-xl font-jost font-medium text-[#111]">৳{{ parseFloat(cancel.grand_total).toLocaleString() }}</span>
              </div>
            </div>

            <NuxtLink
              :to="'/product/' + cancel.order_details[0]?.product?.slug"
              class="px-6 py-3 bg-[#111] text-white hover:bg-transparent hover:text-[#111] border border-[#111] transition-colors duration-300 font-jost text-[11px] font-medium tracking-[2px] uppercase shrink-0 text-center"
            >
              Buy Again
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="flex-1 flex flex-col items-center justify-center text-center py-20 bg-white border border-gray-100 animate-fade-in-up">
        <div class="w-16 h-16 flex items-center justify-center border border-gray-200 mb-6 bg-[#fbfaf8]">
          <Icon name="mdi:check" class="text-2xl text-green-500" />
        </div>
        <h3 class="font-cinzel text-xl tracking-widest text-[#111] uppercase mb-3">No Cancellations</h3>
        <p class="font-jost text-[14px] text-gray-500 tracking-wide max-w-sm mb-8">
          Great news! You don't have any cancelled orders. All your orders are looking good.
        </p>
      </div>
    </div>
  </div>
</template>
