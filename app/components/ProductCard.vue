<script setup lang="ts">
import { ref, computed } from "vue";

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const cartStore = useCartStore();
const wishlistStore = useWishlistStore();
const toast = useToast();
const isHovered = ref(false);
const isSelectionModalOpen = ref(false);

// Initial selections based on new data structure
const initialVariation = props.product?.base_variations?.[0];
const initialPrice = initialVariation?.prices?.[0];

const selectedColor = ref(initialVariation?.color?.name || null);
const selectedSize = ref(initialPrice?.size?.name || null);

interface ProductPrice {
  id: number;
  price: string;
  unit_price: string;
  stock: number;
  sku: string;
  size: { id: number; name: string };
}

interface ProductVariation {
  id: number;
  color: { id: number; name: string; hex_code: string };
  prices: ProductPrice[];
  variations_images: Array<{ varietion_image_url: string }>;
}

// Get current variation and size price object
const currentVariation = computed(() => 
  props.product?.base_variations?.find((v: ProductVariation) => v.color?.name === selectedColor.value) || initialVariation
);

const currentPriceObj = computed(() => 
  currentVariation.value?.prices?.find((p: ProductPrice) => p.size?.name === selectedSize.value) || currentVariation.value?.prices?.[0]
);

// Discount calculation
const discountPercentage = computed(() => {
  if (!props.product.price || !props.product.discount_price) return 0;
  if (props.product.discount_price >= props.product.price) return 0;
  return Math.round(((props.product.price - props.product.discount_price) / props.product.price) * 100);
});

// Build a cart-compatible item from the product
const cartItem = computed(() => ({
  id: props.product.id,
  name: props.product.title,
  price: parseFloat(currentPriceObj.value?.price || props.product.discount_price),
  original_price: parseFloat(currentPriceObj.value?.unit_price || props.product.price),
  quantity: 1,
  stock: currentPriceObj.value?.stock ?? props.product.stock ?? 0,
  sku: currentPriceObj.value?.sku || props.product.sku,
  variant: [selectedColor.value, selectedSize.value].filter(Boolean).join(' / '),
  size: selectedSize.value,
  color: selectedColor.value,
  category: props.product.category,
  image: currentVariation.value?.variations_images?.[0]?.varietion_image_url || props.product.cover_image_url,
  image_url: currentVariation.value?.variations_images?.[0]?.varietion_image_url || props.product.cover_image_url,
}));

// Wishlist item (no variant — save product-level)
const wishlistItem = computed(() => ({
  id: props.product.id,
  name: props.product.title,
  price: props.product.discount_price,
  quantity: 1,
  stock: props.product.stock ?? 0,
  sku: props.product.sku,
  category: props.product.category,
  image: props.product.cover_image_url,
  image_url: props.product.cover_image_url,
}));

const isInCart = computed(() => cartStore.isInCart(cartItem.value));
const isInWishlist = computed(() => wishlistStore.isInWishlist(wishlistItem.value));

const openSelectionModal = (event: Event) => {
  event.preventDefault();
  event.stopPropagation();
  if (event.currentTarget instanceof HTMLElement) {
    event.currentTarget.blur();
  }
  isSelectionModalOpen.value = true;
};

const handleAddToCart = () => {
  cartStore.addToCart(cartItem.value);
  isSelectionModalOpen.value = false;
};

const handleAddToCartAction = (event: Event) => {
  event.preventDefault();
  event.stopPropagation();
  
  const hasVariations = props.product?.base_variations && props.product.base_variations.length > 0;
  
  if (hasVariations) {
    if (event.currentTarget instanceof HTMLElement) {
      event.currentTarget.blur();
    }
    isSelectionModalOpen.value = true;
  } else {
    handleAddToCart();
  }
};

const handleToggleWishlist = () => {
  wishlistStore.toggleWishlist(wishlistItem.value);
};

// Average rating from reviews array
const averageRating = computed(() => {
  const reviews = props.product?.reviews;
  if (!reviews || reviews.length === 0) return 0;
  const sum = reviews.reduce((acc: number, r: any) => acc + parseFloat(r.rating || 0), 0);
  return sum / reviews.length;
});
</script>

<template>
  <div
    class="group relative bg-white border border-gray-100 rounded-xl sm:rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 w-full flex flex-col h-full"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <!-- Top Badges -->
    <div class="absolute top-2 sm:top-4 left-2 sm:left-4 z-10 flex flex-col gap-1 sm:gap-2">
      <span
        v-if="product.status == 1"
        class="bg-primary text-black text-[9px] sm:text-[10px] font-black uppercase tracking-wider px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-sm"
      >
        New
      </span>
      <span
        v-if="discountPercentage > 0"
        class="bg-red-500 text-white text-[9px] sm:text-[10px] font-black uppercase tracking-wider px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-sm"
      >
        -{{ discountPercentage }}%
      </span>
    </div>

    <!-- Right Actions -->
    <div
      class="absolute top-2 sm:top-4 right-2 sm:right-4 z-10 flex flex-col gap-1 sm:gap-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300"
    >
      <button
        @click.prevent="handleToggleWishlist"
        class="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center shadow-md transition-all duration-200 hover:scale-110"
        :class="isInWishlist ? 'text-red-500' : 'text-gray-700 hover:text-red-500 hover:bg-gray-50'"
        :title="isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'"
      >
        <Icon :name="isInWishlist ? 'mdi:heart' : 'mdi:heart-outline'" class="text-base sm:text-xl" />
      </button>
      <NuxtLink
        :to="`/Products/${product.slug}`"
        class="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center text-gray-700 hover:text-primary hover:bg-gray-50 shadow-md transition-colors"
      >
        <Icon name="mdi:eye-outline" class="text-base sm:text-xl" />
      </NuxtLink>
    </div>

    <!-- Image Area -->
    <div
      class="relative w-full aspect-[3/4] overflow-hidden bg-gray-50 cursor-pointer"
    >
      <!-- Default Image -->
      <NuxtLink :to="`/Products/${product.slug}`">
        <img
          :src="product.cover_image_url"
          :alt="product.title"
          class="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
          :class="{ 'opacity-0': isHovered && product.hover_image_url }"
        />
        <!-- Hover Image (if available) -->
        <img
          v-if="product.hover_image_url"
          :src="product.hover_image_url"
          :alt="product.title"
          class="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-0"
          :class="{ 'opacity-100': isHovered }"
        />
      </NuxtLink>
      <!-- Quick Select Modal Trigger -->
      <div
        class="absolute bottom-0 inset-x-0 p-2 sm:p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/50 to-transparent"
      >
        <button
          @click="handleAddToCartAction"
          class="w-full bg-white text-black font-bold py-2 sm:py-3 rounded-lg sm:rounded-xl hover:bg-primary hover:text-black transition-colors shadow-lg flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm"
          :class="{ 'bg-green-500 text-white': isInCart && !(product.base_variations && product.base_variations.length > 0) }"
        >
          <Icon :name="isInCart ? 'mdi:check-circle' : 'mdi:cart-outline'" class="text-base sm:text-xl" />
          <span class="hidden xs:inline sm:inline">{{ isInCart && !(product.base_variations && product.base_variations.length > 0) ? 'Added' : 'Add to Cart' }}</span>
          <span class="xs:hidden sm:hidden">{{ isInCart && !(product.base_variations && product.base_variations.length > 0) ? 'Added' : 'Add' }}</span>
        </button>
      </div>
    </div>

    <!-- Content Area -->
    <div class="p-2 sm:p-3 md:p-5 flex flex-col flex-grow bg-white z-20">
      <div class="flex items-center gap-0.5 sm:gap-1 mb-1 sm:mb-2">
        <Icon
          v-for="i in 5"
          :key="i"
          name="mdi:star"
          class="text-xs sm:text-sm"
          :class="i <= Math.round(averageRating) ? 'text-yellow-400' : 'text-gray-200'"
        />
        <span class="text-[10px] sm:text-xs text-gray-400 ml-0.5 sm:ml-1"
          >({{ product?.reviews?.length || 0 }})</span
        >
      </div>

      <NuxtLink :to="`/Products/${product.slug}`">
        <h3
          class="font-bold text-gray-900 text-sm sm:text-base md:text-lg leading-tight mb-1 cursor-pointer hover:text-primary transition-colors line-clamp-2"
        >
          {{ product.title }}
        </h3>
      </NuxtLink>

      <p class="text-xs sm:text-sm text-gray-500 mb-2 sm:mb-4 line-clamp-1">
        {{ product.category?.name }}
      </p>

      <div class="mt-auto flex flex-col gap-2 sm:gap-3">
        <div class="flex items-center gap-1 sm:gap-2 flex-wrap">
          <span class="text-base sm:text-lg md:text-xl font-black text-gray-900"
            >৳{{ product.discount_price }}</span
          >
          <span
            v-if="discountPercentage > 0"
            class="text-xs sm:text-sm text-gray-400 line-through"
            >৳{{ product.price }}</span
          >
        </div>
      </div>
    </div>

    <!-- Selection Modal -->
    <UModal
      v-model:open="isSelectionModalOpen"
      title="Select Options"
      description="Choose your preferred color and size for this product."
    >
      <template #body>
        <div class="p-2 sm:p-4">
          <div class="flex gap-3 sm:gap-4 mb-4 sm:mb-6">
            <img
              :src="currentVariation?.variations_images?.[0]?.varietion_image_url || product.cover_image_url"
              class="w-16 h-16 sm:w-24 sm:h-24 object-cover rounded-lg sm:rounded-xl border border-gray-100 flex-shrink-0"
            />
            <div class="min-w-0">
              <h3 class="font-bold text-gray-900 text-base sm:text-lg line-clamp-2 mb-1">
                {{ product.title }}
              </h3>
              <div class="text-lg sm:text-xl font-black text-primary">
                ৳{{ currentPriceObj?.price || product.discount_price }}
              </div>
              <div v-if="currentPriceObj?.unit_price > currentPriceObj?.price" class="text-xs sm:text-sm text-gray-400 line-through">
                ৳{{ currentPriceObj?.unit_price }}
              </div>
            </div>
          </div>

          <div v-if="product.base_variations && product.base_variations.length" class="mb-5">
            <h4 class="text-sm font-bold text-gray-700 uppercase mb-3">
              Select Color:
            </h4>
            <div class="flex gap-3 flex-wrap">
              <button
                v-for="variation in product.base_variations"
                :key="variation.id"
                @click="selectedColor = variation.color.name; selectedSize = variation.prices?.[0]?.size?.name"
                class="group flex flex-col items-center gap-1 focus:outline-none"
              >
                <span
                  class="w-8 h-8 rounded-full border-2 transition-all duration-200"
                  :class="[
                    ['White', 'Beige'].includes(variation.color.name)
                      ? 'border-gray-200'
                      : 'border-transparent',
                    selectedColor == variation.color.name
                      ? 'ring-2 ring-primary ring-offset-2 scale-110 shadow-lg'
                      : 'hover:scale-110 shadow-sm',
                  ]"
                  :style="{ backgroundColor: variation.color.hex_code }"
                ></span>
                <span
                  class="text-[10px] font-semibold text-gray-500 group-hover:text-black transition-colors"
                  :class="{
                    'text-black !font-bold': selectedColor == variation.color.name,
                  }"
                >
                  {{ variation.color.name }}
                </span>
              </button>
            </div>
          </div>

          <div v-if="currentVariation?.prices && currentVariation.prices.length" class="mb-8">
            <h4 class="text-sm font-bold text-gray-700 uppercase mb-3">
              Select Size:
            </h4>
            <div class="flex gap-2 flex-wrap">
              <button
                v-for="priceObj in currentVariation.prices"
                :key="priceObj.id"
                @click="selectedSize = priceObj.size.name"
                class="h-10 px-4 rounded-lg border-2 text-sm font-bold uppercase transition-all duration-200"
                :class="
                  selectedSize == priceObj.size.name
                    ? 'border-primary bg-primary text-black'
                    : 'border-gray-200 text-gray-600 hover:border-black hover:text-black hover:bg-gray-50'
                "
              >
                {{ priceObj.size.name }}
              </button>
            </div>
          </div>

          <button
            @click="handleAddToCart"
            class="w-full font-bold py-3 sm:py-4 rounded-xl transition-all hover:shadow-lg flex items-center justify-center gap-2 uppercase tracking-wide text-sm sm:text-base border-2"
            :class="isInCart ? 'border-green-500 bg-green-500 text-white hover:bg-green-600' : 'border-black bg-black text-white hover:bg-primary hover:border-primary hover:text-black'"
          >
            <Icon :name="isInCart ? 'mdi:check-circle' : 'mdi:cart'" class="text-lg sm:text-xl" />
            {{ isInCart ? 'Added to Cart ✓' : 'Confirm Add To Cart' }}
          </button>
        </div>
      </template>
    </UModal>
  </div>
</template>

