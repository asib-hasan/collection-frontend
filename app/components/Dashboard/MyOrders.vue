<script setup lang="ts">
const { $api } = useNuxtApp();
const toast = useToast();

const { data: orders } = await useAPI("/frontend/v1/get-user-order");

// Review modal logic (moved from parent)
const createReviewModal = ref(false);
const orderCancelModal = ref(false);
const isSubmitting = ref(false);
const isCancelling = ref(false);
const selectedProduct = ref<any>(null);
const image = ref<string | null>(null);

const reviewForm = reactive({
  rating: null as number | null,
  reviewMassage: "",
  image: null as File | null,
  product_id: null as number | null,
});

const cancelForm = reactive({
  cancel_reason: "",
  order_id: null as number | null,
});

const downloadInvoice = async (id: any) => {
  try {
    const data = await $api(`/frontend/v1/order-invoice/${id}`, {
      method: "GET",
    });
    
    // Create blob from base64 string
    const blob = await fetch(`data:application/pdf;base64,${data.pdf}`).then(res => res.blob());
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    
    // Set filename
    link.setAttribute("download", `Order_Invoice_${id}.pdf`);
    
    // Append to document, click and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up the URL
    window.URL.revokeObjectURL(url);
    
  } catch (error) {
    console.error("Download error:", error);
    toast.add({
      title: "Error",
      description: "Failed to download invoice. Please try again.",
      color: "red",
    });
  }
};

const openReviewModal = (orderDetail: any) => {
  selectedProduct.value = orderDetail;
  reviewForm.product_id = orderDetail?.product?.id;
  reviewForm.rating = null;
  reviewForm.reviewMassage = "";
  image.value = null;
  createReviewModal.value = true;
};

const openOrderCancelModal = (order: any) => {
  cancelForm.order_id = order?.id;
  cancelForm.cancel_reason = "";
  orderCancelModal.value = true;
};

const handleImageUpload = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      image.value = reader.result as string;
      reviewForm.image = file;
    };
    reader.readAsDataURL(file);
  }
};

const onSubmit = async () => {
  if (isSubmitting.value) return;
  isSubmitting.value = true;
  try {
    const formData = new FormData();
    formData.append("rating", reviewForm.rating?.toString() || "");
    formData.append("reviewMassage", reviewForm.reviewMassage);
    if (reviewForm.image) formData.append("image", reviewForm.image);
    formData.append("product_id", reviewForm.product_id?.toString() ?? "");

    await $api("/frontend/v1/product-review", {
      method: "POST",
      body: formData,
    });

    toast.add({
      title: "Success",
      description: "Your review has been submitted successfully",
    });

    createReviewModal.value = false;
  } catch (error) {
    toast.add({
      title: "Error",
      description: "Failed to submit review",
      color: "secondary",
    });
  } finally {
    isSubmitting.value = false;
  }
};

const onCancelRequest = async () => {
  if (isCancelling.value) return;
  isCancelling.value = true;
  try {
    const formData = new FormData();
    formData.append("cancel_reason", cancelForm.cancel_reason);
    formData.append("order_id", cancelForm.order_id?.toString() ?? "");

    await $api(`/frontend/v1/cancel-order/${cancelForm.order_id}`, {
      method: "POST",
      body: formData,
    });

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
    <div
      class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8"
    >
      <div class="flex items-center gap-3">
        <div
          class="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0"
        >
          <Icon
            name="ph:shopping-bag-open-duotone"
            class="text-primary text-2xl"
          />
        </div>
        <div>
          <h2 class="text-2xl font-black text-gray-900">Order History</h2>
          <p class="text-sm text-gray-500 font-medium mt-0.5">
            Track, return, or buy items again.
          </p>
        </div>
      </div>
    </div>

    <!-- Orders Feed -->
    <div class="space-y-6 flex-1">
      <div v-if="orders" class="space-y-8 pb-4">
        <!-- Order Card -->
        <div
          v-for="order in orders"
          :key="order.id"
          class="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-lg shadow-gray-200/40 hover:shadow-xl hover:shadow-gray-200/60 hover:border-primary/20 transition-all duration-300 group"
        >
          <!-- Order Header: Status & Invoice -->
          <div
            class="p-5 md:p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative overflow-hidden"
          >
            <div
              class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none"
            ></div>

            <div class="relative z-10 w-full sm:w-auto">
              <div class="flex flex-wrap items-center gap-2 sm:gap-3 mb-1">
                <h3 class="text-lg font-black text-gray-900">
                  {{ order.order_code }}
                </h3>
                <span
                  class="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border"
                  :class="{
                    'bg-green-50 text-green-600 border-green-200':
                      order.order_status == 'delivered',
                    'bg-primary/10 text-primary border-primary/20':
                      order.order_status == 'shipped',
                    'bg-orange-50 text-orange-600 border-orange-200':
                      order.order_status == 'process',
                    'bg-purple-50 text-purple-600 border-purple-200':
                      order.order_status == 'pending',
                  }"
                >
                  <span class="flex items-center gap-1.5">
                    <span
                      v-if="
                        order.order_status == 'process' ||
                        order.order_status == 'pending'
                      "
                      class="w-1.5 h-1.5 rounded-full bg-current animate-pulse"
                    ></span>
                    <Icon
                      v-if="order.order_status == 'delivered'"
                      name="ph:check-circle-fill"
                    />
                    <Icon
                      v-if="order.order_status == 'shipped'"
                      name="ph:truck-fill"
                    />
                    {{ order.order_status }}
                  </span>
                </span>
              </div>
              <p
                class="text-xs text-gray-500 font-medium flex items-center gap-1.5"
              >
                <Icon name="ph:calendar-blank" class="text-primary/70" />
                Placed on
                {{
                  new Date(order.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                }}
              </p>
            </div>

            <div
              class="relative z-10 flex items-center justify-between sm:justify-end gap-5 w-full sm:w-auto"
            >
              <div class="text-left sm:text-right">
                <p
                  class="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-0.5"
                >
                  Total
                </p>
                <span class="text-2xl font-black text-gray-900 leading-none">
                  ৳{{ order.grand_total.toLocaleString() }}
                </span>
              </div>
              <button
                @click="downloadInvoice(order.id)"
                class="w-10 h-10 rounded-xl bg-white border-2 border-gray-100 flex items-center justify-center text-primary hover:bg-primary/5 hover:border-primary/30 transition-all duration-300 shadow-sm tooltip-trigger relative group/btn"
              >
                <Icon name="ph:receipt" class="text-xl" />
                <span
                  class="absolute -top-10 scale-0 group-hover/btn:scale-100 transition-transform bg-gray-900 text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg whitespace-nowrap"
                  >Invoice</span
                >
              </button>
            </div>
          </div>

          <!-- Products Grid -->
          <div class="p-5 md:p-6 bg-white">
            <div class="flex flex-col gap-4">
              <div
                v-for="orderDetail in order.order_details"
                :key="orderDetail.id"
                class="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center p-4 rounded-2xl border border-gray-100 hover:border-primary/20 transition-colors bg-gray-50/30"
              >
                <div
                  class="relative w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-xl overflow-hidden flex-shrink-0 border border-gray-100 shadow-sm group-hover:shadow-md transition-shadow p-2"
                >
                  <img
                    :src="orderDetail?.product?.cover_image_url"
                    :alt="orderDetail.product.title"
                    @error="handleImageError"
                    class="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                <div class="flex-1 min-w-0 flex flex-col justify-center">
                  <h4
                    class="font-bold text-gray-900 text-base sm:text-lg mb-1 leading-tight line-clamp-2 hover:text-primary transition-colors cursor-pointer"
                  >
                    {{ orderDetail.product.title }}
                  </h4>
                  <p class="text-sm font-medium text-gray-500 mb-3 sm:mb-0">
                    Qty:
                    <span class="text-gray-900 font-bold">{{
                      orderDetail.quantity
                    }}</span>
                    &nbsp;&times;&nbsp; ৳{{
                      orderDetail.price.toLocaleString()
                    }}
                  </p>
                  <span class="text-xs text-gray-500 mt-1 flex gap-2">
                    <span v-if="orderDetail?.color" class="bg-gray-100 px-2 py-0.5 rounded">Color: {{ orderDetail.color }}</span>
                    <span v-if="orderDetail?.size" class="bg-gray-100 px-2 py-0.5 rounded">Size: {{ orderDetail.size }}</span>
                  </span>
                </div>

                <div
                  class="flex gap-2 w-full sm:w-auto shrink-0 justify-end mt-2 sm:mt-0"
                >
                  <NuxtLink
                    :to="`/Products/${orderDetail.product.slug}`"
                    class="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-white text-xs font-black uppercase tracking-widest hover:shadow-lg hover:shadow-primary/30 transition-all text-center flex items-center justify-center gap-2 active:scale-95"
                  >
                    <Icon name="ph:shopping-cart-simple-bold" class="text-sm" />
                    Buy Again
                  </NuxtLink>
                  <button
                    @click="openReviewModal(orderDetail)"
                    class="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border-2 border-gray-200 text-gray-600 text-xs font-bold hover:border-secondary hover:text-secondary hover:bg-secondary/5 transition-all text-center flex items-center justify-center gap-2 active:scale-95"
                  >
                    <Icon name="ph:star-half" class="text-sm" />
                    Review
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Order Summary Dashboard & Actions -->
          <div
            class="border-t border-gray-100 p-5 md:p-6 bg-gray-50 flex flex-col xl:flex-row xl:items-center justify-between gap-2"
          >
            <div class="grid grid-cols-2 md:grid-cols-3 gap-2 flex-1">
              <div
                class="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex items-center gap-3"
              >
                <div
                  class="w-8 h-8 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center shrink-0"
                >
                  <Icon name="ph:credit-card" />
                </div>
                <div>
                  <p
                    class="text-[10px] text-gray-400 uppercase tracking-widest font-black mb-0.5"
                  >
                    Method
                  </p>
                  <p
                    class="font-bold text-gray-800 text-xs sm:text-sm leading-none"
                  >
                    {{ order.payment_method }}
                  </p>
                </div>
              </div>
              <div
                class="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex items-center gap-3"
              >
                <div
                  class="w-8 h-8 rounded-lg bg-green-50 text-green-500 flex items-center justify-center shrink-0"
                >
                  <Icon name="ph:money" />
                </div>
                <div>
                  <p
                    class="text-[10px] text-gray-400 uppercase tracking-widest font-black mb-0.5"
                  >
                    Payment
                  </p>
                  <p
                    class="font-bold text-xs sm:text-sm capitalize leading-none"
                    :class="
                      order.payment_status == 'paid'
                        ? 'text-green-600'
                        : 'text-orange-500'
                    "
                  >
                    {{ order.payment_status }}
                  </p>
                </div>
              </div>
              <div
                class="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex items-center gap-3 col-span-2 md:col-span-1"
              >
                <div
                  class="w-8 h-8 rounded-lg bg-purple-50 text-purple-500 flex items-center justify-center shrink-0"
                >
                  <Icon name="ph:truck" />
                </div>
                <div>
                  <p
                    class="text-[10px] text-gray-400 uppercase tracking-widest font-black mb-0.5"
                  >
                    Delivery Charge
                  </p>
                  <p
                    class="font-bold text-gray-800 text-xs sm:text-sm leading-none"
                  >
                    ৳{{ order.delivery_charge }}
                  </p>
                </div>
              </div>
            </div>

            <div
              class="flex flex-wrap sm:flex-nowrap items-center gap-3 justify-end shrink-0"
            >
              <!-- Cancel Request State -->
              <div
                v-if="order.is_cancel_request && order.order_status !== 'cancel'"
                class="px-5 py-3 rounded-xl bg-orange-50 text-orange-600 border border-orange-200 text-xs font-black uppercase tracking-widest flex items-center gap-2 whitespace-nowrap"
              >
                <Icon name="ph:spinner-gap" class="animate-spin text-sm" />
                Cancel Pending
              </div>

              <!-- Canceled State -->
              <div
                v-if="order.order_status == 'cancel'"
                class="px-5 py-3 rounded-xl bg-red-50 text-red-600 border border-red-200 text-xs font-black uppercase tracking-widest flex items-center gap-2 whitespace-nowrap"
              >
                <Icon name="ph:x-circle-fill" class="text-sm" />
                Order Canceled
              </div>

              <!-- Cancel Button -->
              <button
                v-if="
                  (order.order_status == 'pending' ||
                    order.order_status == 'process' ||
                    order.order_status == 'received') &&
                  !order.is_cancel_request &&
                  order.order_status !== 'cancel'
                "
                @click="openOrderCancelModal(order)"
                class="flex-1 sm:flex-none px-5 py-3 rounded-xl border-2 border-red-100 text-red-500 hover:bg-red-50 hover:border-red-500 text-xs font-black uppercase tracking-widest transition-all active:scale-95 whitespace-nowrap"
              >
                Cancel Order
              </button>

              <!-- Track Button -->
              <button
                v-if="order.order_status !== 'delivered' && order.order_status !== 'cancel'"
                @click="$emit('track-order', order.order_code)"
                class="flex-1 sm:flex-none px-5 py-3 rounded-xl bg-gray-900 text-white hover:bg-primary text-xs font-black uppercase tracking-widest transition-all shadow-md hover:shadow-lg hover:shadow-primary/30 flex items-center justify-center gap-2 active:scale-95 whitespace-nowrap"
              >
                Track
                <Icon name="ph:arrow-right-bold" class="text-sm" />
              </button>
            </div>
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
              name="ph:shopping-bag-open-duotone"
              class="text-6xl text-gray-300"
            />
          </div>
        </div>
        <h3 class="text-2xl font-black text-gray-900 mb-2">
          No orders placed yet
        </h3>
        <p class="text-gray-500 mb-8 max-w-sm font-medium">
          Your order history is empty. Start exploring our collections and
          discover something amazing!
        </p>
        <NuxtLink
          to="/products"
          class="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-black uppercase tracking-widest hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
        >
          <Icon name="ph:shopping-cart-simple-bold" class="text-lg" />
          Start Shopping
        </NuxtLink>
      </div>
    </div>

    <!-- Review Modal overlay implemented natively to avoid UModal dependency issues if any -->
    <ClientOnly>
      <Teleport to="body">
        <div
          v-if="createReviewModal"
          class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fade-in"
        >
      <div
        class="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-slide-up border border-gray-100 flex flex-col max-h-[90vh]"
      >
        <div
          class="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50"
        >
          <h3 class="text-lg font-black text-gray-900">Write a Review</h3>
          <button
            @click="createReviewModal = false"
            class="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-red-500 hover:border-red-200 transition-colors"
          >
            <Icon name="ph:x-bold" />
          </button>
        </div>
        <div class="p-6 overflow-y-auto custom-scrollbar">
          <div
            class="flex gap-4 items-center p-2 bg-white border border-gray-100 shadow-sm shadow-gray-100/50 rounded-2xl mb-6"
          >
            <div
              class="w-16 h-16 rounded-xl bg-gray-50 p-2 border border-gray-100 flex-shrink-0"
            >
              <img
                class="w-full h-full object-contain mix-blend-multiply"
                :src="selectedProduct?.product?.cover_image_url"
                @error="handleImageError"
              />
            </div>
            <div>
              <h3
                class="font-bold text-gray-900 line-clamp-2 leading-tight text-sm"
              >
                {{ selectedProduct?.product?.title }}
              </h3>
            </div>
          </div>

          <div
            class="text-center mb-6 bg-gray-50 p-3 rounded-2xl border border-gray-100"
          >
            <p
              class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3"
            >
              Rate this product
            </p>
            <div class="flex justify-center gap-1.5 mb-2">
              <button
                v-for="n in 5"
                :key="n"
                @click="reviewForm.rating = n"
                class="text-3xl transition-transform hover:scale-110 active:scale-95 focus:outline-none"
                :class="
                  reviewForm.rating >= n
                    ? 'text-yellow-400 drop-shadow-sm'
                    : 'text-gray-200 hover:text-yellow-200'
                "
              >
                <Icon
                  :name="reviewForm.rating >= n ? 'ph:star-fill' : 'ph:star'"
                />
              </button>
            </div>
          </div>

          <div class="mb-6">
            <label
              class="block text-xs font-black text-gray-900 uppercase tracking-widest mb-2"
              >Your Review</label
            >
            <textarea
              v-model="reviewForm.reviewMassage"
              rows="4"
              class="w-full rounded-2xl border-2 border-gray-100 focus:border-primary focus:ring-4 focus:ring-primary/10 p-4 text-sm bg-gray-50 transition-all outline-none resize-none"
              placeholder="What did you love or hate about it?"
            ></textarea>
          </div>

          <div class="mb-6">
            <label
              class="block text-xs font-black text-gray-900 uppercase tracking-widest mb-2"
              >Add Photo (Optional)</label
            >
            <div class="flex items-center gap-4">
              <label
                class="w-20 h-20 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors bg-gray-50 group"
              >
                <input
                  type="file"
                  hidden
                  @change="handleImageUpload"
                  accept="image/*"
                />
                <Icon
                  name="ph:camera-plus"
                  class="text-2xl text-gray-400 group-hover:text-primary transition-colors mb-1"
                />
              </label>
              <div
                v-if="image"
                class="relative w-20 h-20 rounded-2xl overflow-hidden border border-gray-200 shadow-sm group"
              >
                <img :src="image" class="w-full h-full object-cover" />
                <button
                  @click="image = null"
                  class="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md"
                >
                  <Icon name="ph:x-bold" class="text-[10px]" />
                </button>
              </div>
            </div>
          </div>

          <button
            @click="onSubmit()"
            :disabled="!reviewForm.rating || isSubmitting"
            class="w-full py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-black uppercase tracking-widest hover:shadow-lg hover:shadow-primary/30 transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
          >
            <Icon
              v-if="isSubmitting"
              name="ph:spinner-gap"
              class="animate-spin text-lg"
            />
            <Icon v-else name="ph:paper-plane-Tilt-bold" class="text-lg" />
            {{ isSubmitting ? "Submitting..." : "Submit Review" }}
          </button>
        </div>
      </div>
    </div>

    <!-- Cancel Modal overlay -->
    <div
      v-if="orderCancelModal"
      class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fade-in"
    >
      <div
        class="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden animate-slide-up border border-gray-100"
      >
        <div class="p-6 text-center">
          <div
            class="w-16 h-16 rounded-full border-4 border-red-100 bg-red-50 text-red-500 flex items-center justify-center mx-auto mb-4 relative"
          >
            <div
              class="absolute inset-0 rounded-full border border-red-200 animate-ping opacity-50"
            ></div>
            <Icon name="ph:warning-circle-fill" class="text-3xl" />
          </div>
          <h3 class="text-xl font-black text-gray-900 mb-2">Cancel Order?</h3>
          <p class="text-sm text-gray-500 font-medium mb-6">
            Are you sure you want to cancel this order? This action cannot be
            reversed.
          </p>

          <div class="text-left mb-6">
            <label
              class="block text-xs font-black text-gray-900 uppercase tracking-widest mb-2"
              >Reason (Optional)</label
            >
            <textarea
              v-model="cancelForm.cancel_reason"
              rows="3"
              class="w-full rounded-2xl border-2 border-gray-100 focus:border-red-400 focus:ring-4 focus:ring-red-400/10 p-3 text-sm bg-gray-50 outline-none resize-none transition-all"
              placeholder="Tell us why..."
            ></textarea>
          </div>

          <div class="flex flex-col gap-2">
            <button
              @click="onCancelRequest"
              :disabled="isCancelling"
              class="w-full py-3.5 bg-red-500 text-white rounded-xl font-black uppercase tracking-widest shadow-lg shadow-red-500/20 hover:bg-red-600 active:scale-95 transition-all text-xs flex items-center justify-center gap-2 disabled:opacity-70 disabled:scale-100"
            >
              <Icon
                v-if="isCancelling"
                name="ph:spinner-gap"
                class="animate-spin text-base"
              />
              {{ isCancelling ? "Processing..." : "Yes, Cancel Order" }}
            </button>
            <button
              @click="orderCancelModal = false"
              :disabled="isCancelling"
              class="w-full py-3.5 bg-gray-100 text-gray-700 rounded-xl font-black uppercase tracking-widest hover:bg-gray-200 active:scale-95 transition-all text-xs disabled:opacity-70 disabled:scale-100"
            >
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
