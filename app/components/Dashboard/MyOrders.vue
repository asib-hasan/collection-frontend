<script setup lang="ts">
const { $api } = useNuxtApp();
const toast = useToast();

const ordersData = ref([
  {
    id: 1,
    order_code: "ORD-2025-C102",
    order_status: "delivered",
    created_at: "2025-04-10T10:00:00Z",
    grand_total: 8500,
    payment_method: "Credit Card",
    payment_status: "paid",
    delivery_charge: 100,
    is_cancel_request: false,
    order_details: [
      {
        id: 101,
        quantity: 2,
        price: 4000,
        color: "Black",
        size: "M",
        product: {
          id: 1,
          title: "Luxury Silk Dress",
          slug: "luxury-silk-dress",
          cover_image_url: "/images/category-1.webp",
        }
      },
      {
        id: 102,
        quantity: 1,
        price: 500,
        color: "Silver",
        size: "Free",
        product: {
          id: 2,
          title: "Minimalist Necklace",
          slug: "minimalist-necklace",
          cover_image_url: "/images/category-2.webp",
        }
      }
    ]
  },
  {
    id: 2,
    order_code: "ORD-2025-B943",
    order_status: "process",
    created_at: "2025-04-20T14:30:00Z",
    grand_total: 12000,
    payment_method: "Cash on Delivery",
    payment_status: "unpaid",
    delivery_charge: 150,
    is_cancel_request: false,
    order_details: [
      {
        id: 103,
        quantity: 1,
        price: 12000,
        color: "Navy",
        size: "L",
        product: {
          id: 3,
          title: "Premium Wool Coat",
          slug: "premium-wool-coat",
          cover_image_url: "/images/category-4.webp",
        }
      }
    ]
  }
]);
const orders = computed(() => ordersData.value || []);

// Cancel modal logic
const orderCancelModal = ref(false);
const isCancelling = ref(false);

const cancelForm = reactive({
  cancel_reason: "",
  order_id: null as number | null,
});

const downloadInvoice = async (id: any) => {
  try {
    toast.add({
      title: "Info",
      description: "Demo invoice generation complete. Check your downloads.",
      color: "primary",
    });
  } catch (error) {
    console.error("Download error:", error);
    toast.add({
      title: "Error",
      description: "Failed to download invoice. Please try again.",
      color: "red",
    });
  }
};

const openOrderCancelModal = (order: any) => {
  cancelForm.order_id = order?.id;
  cancelForm.cancel_reason = "";
  orderCancelModal.value = true;
};

const onCancelRequest = async () => {
  if (isCancelling.value) return;
  isCancelling.value = true;
  try {
    await new Promise(resolve => setTimeout(resolve, 800));

    toast.add({
      title: "Success",
      description: "Your cancellation request has been submitted successfully",
    });

    orderCancelModal.value = false;
  } catch (error) {
    toast.add({
      title: "Error",
      description: "Failed to cancel order",
      color: "secondary",
    });
  } finally {
    isCancelling.value = false;
  }
};

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement;
  target.src = "https://placehold.co/400x400/f3f4f6/9ca3af?text=No+Image";
};
</script>

<template>
  <div class="h-full flex flex-col">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 pb-4 border-b border-gray-100">
      <div class="flex items-center gap-4">
        <div class="w-10 h-10 flex items-center justify-center border border-gray-200 text-[#111]">
          <Icon name="mdi:shopping-outline" class="text-xl" />
        </div>
        <div>
          <h2 class="font-cinzel text-2xl tracking-widest text-[#111] uppercase">Order History</h2>
          <p class="font-jost text-[13px] text-gray-500 tracking-wide mt-1">Track, return, or buy items again.</p>
        </div>
      </div>
    </div>

    <!-- Orders Feed -->
    <div class="space-y-6 flex-1">
      <div v-if="orders && orders.length > 0" class="space-y-8 pb-4">
        <!-- Order Card -->
        <div
          v-for="order in orders"
          :key="order.id"
          class="bg-white border border-gray-200"
        >
          <!-- Order Header: Status & Invoice -->
          <div class="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#fbfaf8]">
            <div class="w-full sm:w-auto">
              <div class="flex flex-wrap items-center gap-3 mb-2">
                <h3 class="font-cinzel text-lg tracking-widest text-[#111] uppercase">
                  {{ order.order_code }}
                </h3>
                <span
                  class="px-3 py-1 text-[10px] font-jost font-medium uppercase tracking-[2px] border bg-white"
                  :class="{
                    'border-green-200 text-green-700': order.order_status == 'delivered',
                    'border-[#d4929f] text-[#d4929f]': order.order_status == 'shipped',
                    'border-orange-200 text-orange-600': order.order_status == 'process',
                    'border-gray-300 text-gray-600': order.order_status == 'pending',
                  }"
                >
                  <span class="flex items-center gap-1.5">
                    <span v-if="order.order_status == 'process' || order.order_status == 'pending'" class="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>
                    <Icon v-if="order.order_status == 'delivered'" name="mdi:check" />
                    <Icon v-if="order.order_status == 'shipped'" name="mdi:truck-fast-outline" />
                    {{ order.order_status }}
                  </span>
                </span>
              </div>
              <p class="text-xs text-gray-500 font-jost tracking-wide flex items-center gap-2 uppercase">
                Placed on
                {{ new Date(order.created_at).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) }}
              </p>
            </div>

            <div class="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
              <div class="text-left sm:text-right">
                <p class="font-jost text-[10px] text-gray-400 font-medium uppercase tracking-[2px] mb-1">Total</p>
                <span class="text-xl font-jost font-medium text-[#111]">৳{{ order.grand_total.toLocaleString() }}</span>
              </div>
              <button
                @click="downloadInvoice(order.id)"
                class="w-10 h-10 border border-gray-200 flex items-center justify-center text-[#111] hover:bg-[#111] hover:text-white transition-colors duration-300 tooltip-trigger relative group/btn bg-white"
              >
                <Icon name="mdi:receipt-text-outline" class="text-xl" />
                <span class="absolute -top-10 scale-0 group-hover/btn:scale-100 transition-transform bg-[#111] text-white text-[10px] font-jost tracking-widest uppercase px-3 py-1.5 whitespace-nowrap">Invoice</span>
              </button>
            </div>
          </div>

          <!-- Products Grid -->
          <div class="p-6 bg-white">
            <div class="flex flex-col gap-6">
              <div
                v-for="orderDetail in order.order_details"
                :key="orderDetail.id"
                class="flex flex-col sm:flex-row gap-6 items-start sm:items-center pb-6 border-b border-gray-100 last:border-0 last:pb-0"
              >
                <div class="relative w-24 aspect-[2/3] bg-[#f9f9f9] flex-shrink-0">
                  <img
                    :src="orderDetail?.product?.cover_image_url"
                    :alt="orderDetail.product.title"
                    @error="handleImageError"
                    class="w-full h-full object-cover mix-blend-multiply"
                  />
                </div>

                <div class="flex-1 min-w-0 flex flex-col justify-center">
                  <h4 class="font-jost text-[15px] text-[#111] mb-2 hover:text-[#d4929f] transition-colors cursor-pointer tracking-wide">
                    {{ orderDetail.product.title }}
                  </h4>
                  <p class="font-jost text-[13px] text-gray-500 mb-2 uppercase tracking-wide">
                    Qty: <span class="text-[#111] font-medium">{{ orderDetail.quantity }}</span> &nbsp;&times;&nbsp; ৳{{ orderDetail.price.toLocaleString() }}
                  </p>
                  <span class="font-jost text-[11px] tracking-[1px] uppercase text-gray-500 flex gap-3">
                    <span v-if="orderDetail?.color">Color: <span class="text-[#111]">{{ orderDetail.color }}</span></span>
                    <span v-if="orderDetail?.size">Size: <span class="text-[#111]">{{ orderDetail.size }}</span></span>
                  </span>
                </div>

                <div class="flex flex-col gap-2 w-full sm:w-auto shrink-0 mt-4 sm:mt-0">
                  <NuxtLink
                    :to="`/products/${orderDetail.product.slug}`"
                    class="px-6 py-3 bg-[#111] text-white font-jost text-[11px] font-medium tracking-[2px] uppercase border border-[#111] hover:bg-transparent hover:text-[#111] transition-colors text-center"
                  >
                    Buy Again
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>

          <!-- Order Summary Dashboard & Actions -->
          <div class="border-t border-gray-100 p-6 bg-[#fbfaf8] flex flex-col xl:flex-row xl:items-center justify-between gap-6">
            <div class="flex flex-wrap gap-8 flex-1">
              <div>
                <p class="font-jost text-[10px] text-gray-400 uppercase tracking-[2px] mb-1">Method</p>
                <p class="font-jost text-[13px] font-medium text-[#111] tracking-wide">{{ order.payment_method }}</p>
              </div>
              <div>
                <p class="font-jost text-[10px] text-gray-400 uppercase tracking-[2px] mb-1">Payment</p>
                <p class="font-jost text-[13px] font-medium tracking-wide capitalize"
                  :class="order.payment_status == 'paid' ? 'text-green-700' : 'text-orange-600'">
                  {{ order.payment_status }}
                </p>
              </div>
              <div>
                <p class="font-jost text-[10px] text-gray-400 uppercase tracking-[2px] mb-1">Delivery Charge</p>
                <p class="font-jost text-[13px] font-medium text-[#111] tracking-wide">৳{{ order.delivery_charge }}</p>
              </div>
            </div>

            <div class="flex flex-wrap sm:flex-nowrap items-center gap-3 justify-end shrink-0">
              <!-- Cancel Request State -->
              <div v-if="order.is_cancel_request && order.order_status !== 'cancel'"
                class="px-6 py-3 bg-orange-50 border border-orange-200 text-orange-600 font-jost text-[11px] font-medium uppercase tracking-[2px] flex items-center gap-2">
                <Icon name="mdi:loading" class="animate-spin text-sm" />
                Cancel Pending
              </div>

              <!-- Canceled State -->
              <div v-if="order.order_status == 'cancel'"
                class="px-6 py-3 bg-red-50 border border-red-200 text-red-600 font-jost text-[11px] font-medium uppercase tracking-[2px] flex items-center gap-2">
                <Icon name="mdi:close-circle-outline" class="text-sm" />
                Order Canceled
              </div>

              <!-- Cancel Button -->
              <button v-if="(order.order_status == 'pending' || order.order_status == 'process' || order.order_status == 'received') && !order.is_cancel_request && order.order_status !== 'cancel'"
                @click="openOrderCancelModal(order)"
                class="px-6 py-3 border border-red-200 text-red-500 hover:bg-red-50 hover:border-red-500 font-jost text-[11px] font-medium uppercase tracking-[2px] transition-colors whitespace-nowrap">
                Cancel Order
              </button>

              <!-- Track Button -->
              <button v-if="order.order_status !== 'delivered' && order.order_status !== 'cancel'"
                @click="$emit('track-order', order.order_code)"
                class="px-6 py-3 bg-white border border-[#111] text-[#111] hover:bg-[#111] hover:text-white font-jost text-[11px] font-medium uppercase tracking-[2px] transition-colors flex items-center gap-2 whitespace-nowrap">
                Track
                <Icon name="mdi:arrow-right" class="text-sm" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="flex-1 flex flex-col items-center justify-center text-center py-20 bg-white border border-gray-100 animate-fade-in-up">
        <div class="w-16 h-16 flex items-center justify-center border border-gray-200 mb-6 bg-[#fbfaf8]">
          <Icon name="mdi:shopping-outline" class="text-2xl text-gray-400" />
        </div>
        <h3 class="font-cinzel text-xl tracking-widest text-[#111] uppercase mb-3">No orders placed yet</h3>
        <p class="font-jost text-[14px] text-gray-500 tracking-wide max-w-sm mb-8">
          Your order history is empty. Start exploring our collections and discover something amazing!
        </p>
        <NuxtLink to="/products"
          class="px-10 py-4 bg-[#111] text-white font-jost text-[12px] font-medium tracking-[2px] uppercase border border-[#111] hover:bg-transparent hover:text-[#111] transition-colors">
          Start Shopping
        </NuxtLink>
      </div>
    </div>

    <!-- Cancel Modal overlay -->
    <ClientOnly>
      <Teleport to="body">
        <div v-if="orderCancelModal" class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#111]/40 backdrop-blur-sm animate-fade-in">
          <div class="bg-white w-full max-w-md border border-gray-200 shadow-2xl flex flex-col">
            <div class="p-8 text-center">
              <div class="w-16 h-16 border border-red-200 bg-red-50 text-red-500 flex items-center justify-center mx-auto mb-6 relative">
                <Icon name="mdi:alert-circle-outline" class="text-3xl" />
              </div>
              <h3 class="font-cinzel text-xl tracking-widest text-[#111] uppercase mb-2">Cancel Order?</h3>
              <p class="font-jost text-[14px] text-gray-500 tracking-wide mb-8">
                Are you sure you want to cancel this order? This action cannot be reversed.
              </p>

              <div class="text-left mb-8">
                <label class="block font-jost text-[11px] font-medium uppercase tracking-[2px] text-[#111] mb-3">Reason (Optional)</label>
                <textarea v-model="cancelForm.cancel_reason" rows="3"
                  class="w-full border border-gray-200 focus:border-red-400 focus:outline-none p-4 font-jost text-[14px] bg-transparent resize-none transition-colors"
                  placeholder="Tell us why..."></textarea>
              </div>

              <div class="flex flex-col gap-3">
                <button @click="onCancelRequest" :disabled="isCancelling"
                  class="w-full py-4 bg-red-500 text-white font-jost text-[12px] font-medium tracking-[2px] uppercase border border-red-500 hover:bg-transparent hover:text-red-500 transition-colors disabled:opacity-30 flex items-center justify-center gap-3">
                  <Icon v-if="isCancelling" name="mdi:loading" class="animate-spin text-base" />
                  {{ isCancelling ? "Processing..." : "Yes, Cancel Order" }}
                </button>
                <button @click="orderCancelModal = false" :disabled="isCancelling"
                  class="w-full py-4 bg-white text-gray-600 font-jost text-[12px] font-medium tracking-[2px] uppercase border border-gray-200 hover:bg-gray-50 transition-colors disabled:opacity-30">
                  No, Keep It
                </button>
              </div>
            </div>
          </div>
        </div>
      </Teleport>
    </ClientOnly>
  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.2s ease-out forwards;
}
.animate-slide-up {
  animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e5e7eb;
  border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #d1d5db;
}
</style>
