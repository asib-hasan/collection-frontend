<script setup>
import { computed } from 'vue';

const props = defineProps({
  blogs: Object,
});

const truncateText = (text, wordLimit) => {
  if (!text) return "";
  const words = text.split(" ");
  return words.length > wordLimit
    ? words.slice(0, wordLimit).join(" ") + "..."
    : text;
};

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const blogDescription = computed(() => {
  const text = props.blogs?.short_description || props.blogs?.description || "Explore the latest insights and trends in our detailed blog post.";
  return truncateText(text, 20);
});

const commentCount = computed(() => {
  const len = props.blogs?.blog_reviews?.length ?? 0;
  if (len === 0) return "No Comments";
  return `${len} Comment${len > 1 ? "s" : ""}`;
});
</script>

<template>
  <div class="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1.5 border border-gray-100 flex flex-col h-full">

    <!-- Image Section -->
    <NuxtLink :to="`/blog/${blogs?.slug}`" class="relative overflow-hidden block aspect-[16/10]">
      <img
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        :src="blogs?.blog_image_url"
        alt="Blog Image"
      />

      <!-- Dark Gradient Overlay -->
      <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>

      <!-- Category Badge (top-left) -->
      <div class="absolute top-3 left-3 sm:top-4 sm:left-4">
        <span class="inline-flex items-center gap-1.5 bg-primary text-white text-[10px] sm:text-xs font-black uppercase tracking-widest px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full shadow-lg">
          <Icon name="mdi:tag-outline" class="w-3 h-3" />
          Lifestyle
        </span>
      </div>

      <!-- Date Badge (top-right) -->
      <div class="absolute top-3 right-3 sm:top-4 sm:right-4">
        <div class="bg-white/15 backdrop-blur-md border border-white/25 text-white text-[10px] sm:text-xs font-semibold px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full flex items-center gap-1.5">
          <Icon name="uil:calendar-alt" class="w-3 h-3 text-secondary" />
          {{ formatDate(blogs?.publish_date) }}
        </div>
      </div>

      <!-- Bottom Title Overlay (visible on hover) -->
      <div class="absolute bottom-0 inset-x-0 p-4 sm:p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
        <h3 class="text-white font-black text-sm sm:text-base md:text-lg leading-tight line-clamp-2 drop-shadow-md">
          {{ blogs?.title }}
        </h3>
      </div>
    </NuxtLink>

    <!-- Content Section -->
    <div class="p-3 sm:p-4 md:p-5 flex flex-col flex-grow">

      <!-- Meta Row -->
      <div class="flex items-center gap-3 text-[10px] sm:text-xs text-gray-500 mb-3">
        <span class="flex items-center gap-1">
          <Icon name="uil:user-circle" class="w-3.5 h-3.5 text-primary" />
          By Admin
        </span>
        <span class="w-1 h-1 rounded-full bg-gray-300"></span>
        <span class="flex items-center gap-1">
          <Icon name="uil:comment-alt-lines" class="w-3.5 h-3.5 text-secondary" />
          {{ commentCount }}
        </span>
        <span class="w-1 h-1 rounded-full bg-gray-300"></span>
        <span class="flex items-center gap-1">
          <Icon name="mdi:clock-outline" class="w-3.5 h-3.5 text-gray-400" />
          5 min read
        </span>
      </div>

      <!-- Title (for non-overlay view) -->
      <h3 class="text-sm sm:text-base md:text-lg font-black text-gray-900 mb-2 sm:mb-3 line-clamp-2 leading-snug group-hover:text-primary transition-colors duration-300">
        <NuxtLink :to="`/blog/${blogs?.slug}`">
          {{ blogs?.title }}
        </NuxtLink>
      </h3>

      <!-- Excerpt -->
      <p class="text-gray-500 text-xs sm:text-sm line-clamp-2 mb-4 flex-grow leading-relaxed">
        {{ blogDescription }}
      </p>

      <!-- Footer CTA -->
      <div class="mt-auto pt-3 border-t border-gray-100">
        <NuxtLink
          :to="`/blog/${blogs?.slug}`"
          class="group/btn inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-primary hover:text-secondary transition-colors duration-300"
        >
          Read Article
          <span class="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-primary/10 group-hover/btn:bg-secondary/20 transition-colors duration-300">
            <Icon name="heroicons:arrow-long-right" class="w-3.5 h-3.5 sm:w-4 sm:h-4 transform group-hover/btn:translate-x-0.5 transition-transform duration-300" />
          </span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
