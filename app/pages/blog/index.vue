<script setup>
// Page Meta
useHead({
  title: 'News & Blogs | Loomino',
  meta: [
    { name: 'Blogs', content: 'Stay updated with the latest trends, tips, and news from the world of fashion.' }
  ]
})
const { data: blogs } = await useAPI("/frontend/v1/get-blogs");
const settings = useState('config');

const allBlogs = blogs.value?.data || blogs.value || [];
const featuredBlog = allBlogs[0] || {};
const gridBlogs = allBlogs.slice(1);

const topArticles = settings.value?.top_articles || [];
const latestBlogs = allBlogs.slice(0, 4);

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const formatDateShort = (dateStr) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

const toast = useToast();
const { $api } = useNuxtApp();

const newsletterForm = ref({ email: '' });
const isNewsletterLoading = ref(false);
const subscribeNewsletter = async () => {
  if (!newsletterForm.value.email) {
    toast.add({
      title: "Error ❌",
      description: "Please enter your email address.",
      color: "error",
      icon: "i-heroicons-x-circle",
    })
    return;
  }
  isNewsletterLoading.value = true;
  try {
    const response = await $api('/frontend/v1/store-newsletter', {
      method: 'POST',
      body: newsletterForm.value
    });
    toast.add({
      title: "Subscribed 🎉",
      description: response?.message || "You have successfully subscribed to our newsletter.",
      color: "primary",
      icon: "i-heroicons-check-circle",
    });
    newsletterForm.value.email = '';
  } catch (error) {
    toast.add({
      title: "Error ❌",
      description: error?.data?.message || "Subscription failed. Please try again.",
      color: "error",
      icon: "i-heroicons-x-circle",
    });
  } finally {
    isNewsletterLoading.value = false;
  }
};
</script>

<template>
  <div class="bg-gray-50 min-h-screen">

    <!-- ── Page Header ─────────────────────────────────────────────── -->
    <div
      class="relative py-16 md:py-20 border-b border-gray-100 overflow-hidden"
    >
      <img
        src="/images/blog2.png"
        alt="Blog Banner"
        class="absolute inset-0 w-full h-full object-cover z-0"
      />
      <div
        class="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent z-10"
      />
      <div class="container mx-auto px-4 relative z-20">
        <h1
          class="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 tracking-tight uppercase mb-3 drop-shadow-sm"
        >
          News &amp; Blogs
        </h1>
        <div class="w-16 sm:w-20 h-1.5 bg-primary rounded-full mb-4 shadow-md" />
        <div class="flex flex-wrap items-center gap-2 text-sm sm:text-base text-gray-600 font-medium">
          <NuxtLink to="/" class="hover:text-primary transition-colors flex-shrink-0"
            >Home</NuxtLink
          >
          <Icon name="mdi:chevron-right" class="text-gray-400 flex-shrink-0" />
          <span class="text-gray-900 flex-1 min-w-0 truncate">Blogs</span>
        </div>
      </div>
    </div>
    <!-- ─── Main Content ─── -->
    <section class="py-12 sm:py-16 md:py-20">
      <div class="container mx-auto px-4">
        <div class="flex flex-col lg:flex-row-reverse gap-10 items-start">
          <!-- Blog Grid (2/3) -->
          <div class="w-full lg:w-2/3">
            <!-- Featured Blog Hero Card -->
            <NuxtLink v-if="featuredBlog.slug" :to="`/blog/${featuredBlog.slug}`"
              class="group block relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl aspect-[21/9] sm:aspect-[3/1] md:aspect-[21/7] mb-10">
              <img :src="featuredBlog.blog_image_url" alt="Featured Blog" class="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
              <div class="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
              <div class="absolute inset-0 flex items-end p-5 sm:p-10 md:p-14">
                <div class="max-w-5xl">
                  <span class="inline-flex items-center gap-1.5 bg-primary text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full mb-3 sm:mb-4">
                    <Icon name="mdi:fire" class="w-3 h-3" />
                    Featured
                  </span>
                  <h2 class="text-xl sm:text-2xl md:text-4xl font-black text-white leading-tight mb-3 sm:mb-4 drop-shadow-lg">
                    {{ featuredBlog.title }}
                  </h2>
                  <p class="text-white/75 text-xs sm:text-sm md:text-base leading-relaxed mb-4 line-clamp-2 hidden sm:block">
                    {{ featuredBlog.short_description }}
                  </p>
                  <div class="flex items-center gap-3 sm:gap-4 text-white/60 text-xs sm:text-sm">
                    <span class="flex items-center gap-1.5">
                      <Icon name="uil:calendar-alt" class="w-3.5 h-3.5 text-secondary" />
                      {{ formatDate(featuredBlog.publish_date) }}
                    </span>
                    <span class="flex items-center gap-1.5">
                      <Icon name="uil:comment-alt-lines" class="w-3.5 h-3.5 text-secondary" />
                      {{ featuredBlog.blog_reviews?.length || 0 }} Comments
                    </span>
                  </div>
                </div>
              </div>
            </NuxtLink>

            <div v-if="allBlogs.length > 0" class="flex items-center justify-between mb-6 sm:mb-8">
              <h2 class="text-xl sm:text-2xl font-black text-gray-900 flex items-center gap-2">
                <span class="w-1 h-6 sm:h-7 bg-gradient-to-b from-primary to-secondary rounded-full inline-block"></span>
                All Articles
              </h2>
              <span class="text-xs sm:text-sm text-gray-500 font-medium">{{ allBlogs.length }} posts</span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 md:gap-8">
              <BlogCard v-for="blogs in gridBlogs" :key="blogs.id" :blogs="blogs" />
            </div>

            <!-- Load More (decorative) -->
            <div class="mt-10 sm:mt-12 text-center">
              <button class="inline-flex items-center gap-2 bg-white border-2 border-gray-200 text-gray-700 font-bold px-6 py-3 rounded-xl hover:border-primary hover:text-primary transition-all duration-300 shadow-sm hover:shadow-md text-sm">
                <Icon name="mdi:refresh" class="w-4 h-4" />
                Load More Articles
              </button>
            </div>
          </div>

          <!-- Sidebar (1/3) -->
          <aside class="w-full lg:w-1/3 space-y-6 sm:space-y-8">

            <!-- Search -->
            <div class="bg-white rounded-2xl shadow-md p-5 sm:p-6 border border-gray-100">
              <h3 class="text-base font-black text-gray-900 mb-4 flex items-center gap-2">
                <Icon name="uil:search" class="w-4 h-4 text-primary" />
                Search
              </h3>
              <div class="relative">
                <input
                  type="text"
                  placeholder="Search articles..."
                  class="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder-gray-400"
                />
                <Icon name="uil:search" class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>
            </div>

            <!-- Top Articles -->
            <div class="bg-white rounded-2xl shadow-md p-5 sm:p-6 border border-gray-100">
              <h3 class="text-base font-black text-gray-900 mb-5 pb-3 border-b border-gray-100 flex items-center gap-2">
                <Icon name="mdi:fire" class="w-5 h-5 text-orange-500" />
                Trending Now
              </h3>

              <div class="space-y-4">
                <div
                  v-for="(blog, i) in topArticles"
                  :key="blog.id"
                  class="flex items-start gap-3 group"
                >
                  <div class="relative overflow-hidden rounded-xl w-16 h-14 sm:w-18 sm:h-16 flex-shrink-0">
                    <img :src="blog.blog_image_url" alt="Thumbnail"
                      class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div class="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300"></div>
                  </div>
                  <div class="flex-1 min-w-0">
                    <NuxtLink :to="`/blog/${blog.slug}`"
                      class="block text-xs sm:text-sm font-bold text-gray-900 leading-snug line-clamp-2 mb-1.5 hover:text-primary transition-colors duration-300">
                      {{ blog.title }}
                    </NuxtLink>
                    <div class="flex items-center text-[10px] sm:text-xs text-gray-400 gap-2">
                      <Icon name="mdi:calendar-outline" class="w-3 h-3" />
                      {{ formatDateShort(blog.publish_date) }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Latest Articles -->
            <div class="bg-white rounded-2xl shadow-md p-5 sm:p-6 border border-gray-100">
              <h3 class="text-base font-black text-gray-900 mb-5 pb-3 border-b border-gray-100 flex items-center gap-2">
                <Icon name="mdi:clock-outline" class="w-5 h-5 text-secondary" />
                Latest Posts
              </h3>

              <div class="space-y-4">
                <div
                  v-for="blog in latestBlogs"
                  :key="blog.id"
                  class="flex items-start gap-3 group"
                >
                  <div class="relative overflow-hidden rounded-xl w-16 h-14 sm:w-18 sm:h-16 flex-shrink-0">
                    <img :src="blog.blog_image_url" alt="Thumbnail"
                      class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div class="flex-1 min-w-0">
                    <NuxtLink :to="`/blog/${blog.slug}`"
                      class="block text-xs sm:text-sm font-bold text-gray-900 leading-snug line-clamp-2 mb-1.5 hover:text-primary transition-colors duration-300">
                      {{ blog.title }}
                    </NuxtLink>
                    <div class="flex items-center text-[10px] sm:text-xs text-gray-400 gap-2">
                      <Icon name="mdi:calendar-outline" class="w-3 h-3" />
                      {{ formatDateShort(blog.publish_date) }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Newsletter Widget -->
            <div class="relative overflow-hidden bg-gradient-to-br from-primary to-secondary rounded-2xl p-6 text-center shadow-lg">
              <div class="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full"></div>
              <div class="absolute -bottom-8 -left-8 w-24 h-24 bg-white/10 rounded-full"></div>
              <div class="relative z-10">
                <div class="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon name="uil:envelope-check" class="w-6 h-6 text-white" />
                </div>
                <h3 class="text-base font-black text-white mb-1">Subscribe Newsletter</h3>
                <p class="text-white/75 text-xs mb-4 leading-relaxed">Get the latest posts delivered right to your inbox.</p>
                <input
                  type="email"
                  v-model="newsletterForm.email"
                  placeholder="Your email address"
                  class="w-full p-2.5 sm:p-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-white/40 bg-white/20 border border-white/30 text-white placeholder-white/60 mb-3"
                />
                <button @click="subscribeNewsletter" :disabled="isNewsletterLoading" class="w-full bg-white text-primary font-black py-2.5 sm:py-3 rounded-xl hover:bg-gray-50 transition-colors text-sm shadow-sm disabled:opacity-75 disabled:cursor-not-allowed inline-flex items-center justify-center">
                  <Icon v-if="isNewsletterLoading" name="mdi:loading" class="animate-spin mr-2 w-4 h-4" />
                  SUBSCRIBE NOW
                </button>
              </div>
            </div>

          </aside>
        </div>
      </div>
    </section>

  </div>
</template>
