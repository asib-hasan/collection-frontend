<script setup lang="ts">
import { ref, computed } from "vue";

interface Review {
  id: number;
  rating: number;
  status: 'publish' | 'pending' | 'rejected';
  reviewMassage: string;
  created_at: string;
  products?: {
    title: string;
    cover_image_url: string;
  };
}

const { data: reviewsData } = await useAPI<Review[]>("/frontend/v1/product-review");
const reviews = computed(() => reviewsData.value || []);
const handleImageError = (e: Event) => {
  const target = e.target as HTMLImageElement;
  target.src = "https://via.placeholder.com/300?text=Product+Image";
};
const filterBy = ref("All");
</script>

<template>
  <div class="h-full flex flex-col">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
      <div class="flex items-center gap-3">
        <div class="w-12 h-12 rounded-2xl bg-yellow-100 flex items-center justify-center flex-shrink-0">
          <Icon name="ph:star-duotone" class="text-yellow-500 text-2xl" />
        </div>
        <div>
          <h2 class="text-2xl font-black text-gray-900">My Reviews</h2>
          <p class="text-sm text-gray-500 font-medium mt-0.5">
            Manage your product ratings and feedback.
          </p>
        </div>
      </div>
    </div>

    <!-- Reviews List -->
    <div class="space-y-6 flex-1">
      <div v-if="reviews.length > 0" class="grid grid-cols-1 gap-6 pb-4">
        <div v-for="review in reviews" :key="review.id"
          class="bg-white rounded-3xl border border-gray-100 p-6 flex flex-col md:flex-row gap-6 shadow-sm hover:shadow-lg hover:border-primary/20 transition-all duration-300 group">
          <!-- Product Context (Left) -->
          <div class="flex items-center md:flex-col md:w-48 gap-4 md:border-r border-gray-100 md:pr-6 shrink-0">
            <div
              class="w-20 h-20 md:w-32 md:h-32 bg-gray-50 rounded-2xl border border-gray-100 p-2 shrink-0 group-hover:border-primary/20 transition-colors">
              <img :src="review?.products?.cover_image_url" :alt="review?.products?.title" @error="handleImageError"
                class="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div class="min-w-0 md:text-center">
              <NuxtLink :to="`/product/${review.product_slug}`"
                class="block font-bold text-gray-900 text-sm md:text-base leading-tight mb-1 line-clamp-2 hover:text-primary transition-colors">
                {{ review?.products?.title }}
              </NuxtLink>
              <span class="text-[10px] font-black uppercase tracking-widest text-gray-400">Purchased Item</span>
            </div>
          </div>

          <!-- Review Content (Right) -->
          <div class="flex-1 relative flex flex-col justify-center">
            <div class="flex flex-wrap items-center justify-between gap-3 mb-3">
              <div class="flex items-center gap-1">
                <Icon v-for="n in 5" :key="n" :name="review.rating >= n ? 'ph:star-fill' : 'ph:star'" class="text-lg"
                  :class="review.rating >= n
                      ? 'text-yellow-400 drop-shadow-sm'
                      : 'text-gray-200'
                    " />
              </div>

              <div class="flex flex-wrap items-center gap-3">
                <span
                  class="px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-1 border"
                  :class="{
                    'bg-green-50 text-green-600 border-green-100': review.status == 'publish',
                    'bg-yellow-50 text-yellow-600 border-yellow-100': review.status == 'pending',
                    'bg-red-50 text-red-600 border-red-100': review.status == 'rejected'
                  }">
                  <Icon :name="{
                    publish: 'ph:seal-check-fill',
                    pending: 'ph:clock-fill',
                    rejected: 'ph:x-circle-fill'
                  }[review.status]" />
                  {{ review.status }}
                </span>
                <span class="text-xs font-bold text-gray-400 flex items-center gap-1.5">
                  <Icon name="ph:calendar-blank" /> {{ review.created_at }}
                </span>
              </div>
            </div>

            <p class="text-gray-600 text-sm md:text-base leading-relaxed italic mb-6">
              "{{ review.reviewMassage }}"
            </p>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else
        class="flex-1 flex flex-col items-center justify-center text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
        <div class="relative w-32 h-32 mb-6">
          <div class="absolute inset-0 bg-yellow-100 rounded-full animate-ping opacity-50"></div>
          <div
            class="relative w-full h-full bg-yellow-50 rounded-full flex items-center justify-center border-4 border-white shadow-xl">
            <Icon name="ph:star-half-duotone" class="text-6xl text-yellow-400" />
          </div>
        </div>
        <h3 class="text-2xl font-black text-gray-900 mb-2">No Reviews Yet</h3>
        <p class="text-gray-500 mb-8 max-w-sm font-medium">
          You haven't left any product reviews yet. Share your experience with
          others!
        </p>
        <button
          class="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-black uppercase tracking-widest hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300">
          <Icon name="ph:shopping-bag-open-bold" class="text-lg" />
          Review Purchases
        </button>
      </div>
    </div>
  </div>
</template>
