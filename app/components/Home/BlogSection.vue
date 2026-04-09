<script setup lang="ts">
const settings = useState<any>('config');

const localBlogs = ref([] as any[]);

watch(() => settings.value?.home_blogs, (newVal) => {
  if (newVal && localBlogs.value.length === 0) {
    localBlogs.value = [...newVal];
  }
}, { immediate: true });

const featuredBlog = computed(() => localBlogs.value[0])
const sideBlogs = computed(() => localBlogs.value.slice(1, 3))

let timer: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  // Rotate the array every 4 seconds to create an infinite bottom-to-top carousel
  timer = setInterval(() => {
    if (localBlogs.value.length > 0) {
      const first = localBlogs.value.shift()
      if (first) {
        localBlogs.value.push(first)
      }
    }
  }, 4000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <section class="py-12 sm:py-16 md:py-20 bg-white overflow-hidden">
    <div class="container mx-auto px-4">
      <div class="text-center mb-10 sm:mb-14">
         <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 tracking-wide uppercase mb-2">
            Fashion Blogs
          </h2>
          <div class="w-24 h-1.5 bg-primary mx-auto rounded-full mb-6 relative overflow-hidden">
        <div class="absolute inset-0 bg-white/50 animate-pulse"></div>
      </div>
      <p class="text-sm sm:text-base text-gray-500 max-w-2xl mx-auto">
        Stay updated with the latest trends, styling tips, and exclusive insights from the world of fashion.
      </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 h-full">
        
        <!-- Featured Blog (Left Side) -->
        <div class="relative rounded-xl overflow-hidden group min-h-[320px] sm:min-h-[400px] md:min-h-[450px] lg:h-full flex items-end">
          <Transition name="fade" mode="out-in">
            <div v-if="featuredBlog" :key="featuredBlog?.id" class="absolute inset-0 w-full h-full flex items-end">
              <img 
                :src="featuredBlog.blog_image_url" 
                :alt="featuredBlog.title" 
                class="absolute inset-0 w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-105"
              />
              <!-- Gradient Overlay -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-colors duration-500"></div>
              
              <!-- Content -->
              <div class="relative z-10 p-5 sm:p-8 md:p-12 flex flex-col items-center text-center w-full">
                <span class="bg-white text-black font-semibold text-xs sm:text-sm px-3 sm:px-4 py-1 sm:py-1.5 rounded shadow-md mb-4 sm:mb-6 hover:bg-gray-100 transition-colors">
                  {{ featuredBlog.publish_date }}
                </span>
                <h3 class="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4 drop-shadow-md">
                  {{ featuredBlog.title }}
                </h3>
                <p class="text-white/90 text-xs sm:text-sm md:text-base mb-5 sm:mb-8 max-w-md leading-relaxed drop-shadow-sm line-clamp-2">
                  {{ featuredBlog.short_description }}
                </p>
                <NuxtLink v-if="featuredBlog" :to="`/blog/${featuredBlog?.slug}`" class="text-white font-bold uppercase text-xs sm:text-sm border-b-2 border-white pb-1 hover:text-primary hover:border-primary transition-all duration-300">
                  Read More
                </NuxtLink>
              </div>
            </div>
          </Transition>
        </div>

        <!-- Side Blogs Carousel (Right Side - Moves bottom to top) -->
        <div class="relative w-full h-full min-h-[400px] sm:min-h-[520px] pt-1">
          <TransitionGroup name="vert-carousel" tag="div" class="flex flex-col gap-5 sm:gap-8 w-full relative">
            <div 
              v-for="blog in sideBlogs" 
              :key="blog.id" 
              class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 items-center w-full vert-carousel-item bg-white"
            >
              <!-- Image -->
              <div class="rounded-xl overflow-hidden group h-[200px] sm:h-[240px] relative">
                <img 
                  :src="blog.blog_image_url" 
                  :alt="blog.title" 
                  class="absolute inset-0 w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-105"
                />
              </div>
              
              <!-- Content -->
              <div class="flex flex-col items-start px-1 sm:px-2 py-2 sm:py-4">
                 <span class="bg-[#242424] text-white font-medium text-xs px-3 py-1.5 rounded mb-3 sm:mb-4 shadow-sm">
                  {{ blog.publish_date }}
                </span>
                <h3 class="text-base sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 hover:text-primary transition-colors duration-300 line-clamp-2">
                  <NuxtLink :to="`/blog/${blog?.slug}`">{{ blog.title }}</NuxtLink>
                </h3>
                <p class="text-gray-500 text-xs sm:text-sm mb-4 sm:mb-6 leading-relaxed line-clamp-3">
                  {{ blog.short_description }}
                </p>
                <NuxtLink :to="`/blog/${blog?.slug}`" class="text-black font-bold uppercase text-xs border-b-[1.5px] border-black pb-0.5 hover:text-primary hover:border-primary transition-all duration-300">
                  Read More
                </NuxtLink>
              </div>
            </div>
          </TransitionGroup>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Feature Blog Fade Out-In Animation */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Right Side Vertical Carousel Animations */
.vert-carousel-move,
.vert-carousel-enter-active,
.vert-carousel-leave-active {
  transition: all 0.8s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.vert-carousel-enter-from {
  opacity: 0;
  transform: translateY(30px);
}
.vert-carousel-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
.vert-carousel-leave-active {
  position: absolute;
  width: 100%;
}
</style>
