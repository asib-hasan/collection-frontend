<script setup>
useHead({ title: "Blog Details | Loomino" });
const route = useRoute();
const { data: blogData } = await useAPI(
  `/frontend/v1/blog-details/${route?.params?.slug}`,
);

const BlogDetails = computed(() => blogData.value?.data || blogData.value || {});

const settings = useState("config");

const { data: allBlogsResponse } = await useAPI("/frontend/v1/get-blogs");

// Using API for latest articles and config for top articles
const latestBlogs = computed(() => {
  const blogsArr = allBlogsResponse.value?.data || allBlogsResponse.value || [];
  return blogsArr.slice(0, 4);
});
const topArticles = computed(() => settings.value?.top_articles || []);

const newsletterForm = ref({ email: '' });
const isNewsletterLoading = ref(false);
const toast = useToast();
const { $api } = useNuxtApp();

const subscribeNewsletter = async () => {
  if (!newsletterForm.value.email) {
    toast.add({
      title: "Error ❌",
      description: "Please enter your email address.",
      color: "error",
      icon: "i-heroicons-x-circle",
    });
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

// Reviews form state
const rating = ref(0);
const review = ref({
  rating: 0,
  reviewMassage: "",
  name: "",
  email: "",
  blog_slug: "",
});

// Keep blog_slug in sync once data resolves
watchEffect(() => {
  review.value.blog_slug = BlogDetails.value?.slug || "";
});

const onSubmit = async () => {
  if (
    !review.value.name ||
    !review.value.email ||
    !review.value.reviewMassage
  ) {
    toast.add({
      title: "Please fill in all fields!",
      color: "red",
      icon: "i-heroicons-exclamation-circle",
    });
    return;
  }

  try {
    const formData = new FormData();
    formData.append("rating", rating.value.toString());
    formData.append("reviewMassage", review.value.reviewMassage);
    formData.append("name", review.value.name);
    formData.append("email", review.value.email);
    formData.append("blog_slug", route.params.slug);
    if (BlogDetails.value?.id) {
      formData.append("blog_id", BlogDetails.value.id.toString());
    }

    await $api("/frontend/v1/store-blog-review", {
      method: "POST",
      body: formData,
    });

    toast.add({
      title: "Comment submitted!",
      description: "Your review has been posted successfully for publish.",
      color: "primary",
      icon: "i-heroicons-check-circle",
    });

    review.value = {
      rating: 0,
      reviewMassage: "",
      name: "",
      email: "",
      blog_slug: BlogDetails.value?.slug || "",
    };
    rating.value = 0;

  } catch (error) {
    console.error("Failed to submit review:", error);
  }
};

const averageRating = computed(() => {
  const reviews = BlogDetails.value?.blog_reviews || [];
  if (reviews.length === 0) return 0;
  const total = reviews.reduce((sum, r) => sum + parseInt(r.rating || 0), 0);
  return Math.round(total / reviews.length);
});

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
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};
</script>

<template>
  <div class="bg-gray-50 min-h-screen">
    <!-- ─── Immersive Hero Banner ─── -->
    <section
      class="relative h-[55vh] min-h-[350px] sm:min-h-[460px] md:min-h-[540px] w-full overflow-hidden"
    >
      <div class="absolute inset-0">
        <img
          :src="BlogDetails.blog_image_url"
          alt="Blog Hero"
          class="w-full h-full object-cover"
        />
        <div
          class="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-gray-900/90"
        ></div>
        <!-- Fine grid overlay -->
        <div
          class="absolute inset-0 opacity-10"
          style="
            background-image:
              linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(
                90deg,
                rgba(255, 255, 255, 0.1) 1px,
                transparent 1px
              );
            background-size: 60px 60px;
          "
        ></div>
      </div>

      <div class="relative z-10 h-full flex items-end pb-10 sm:pb-16 md:pb-20">
        <div class="container mx-auto px-4">
          <div class="max-w-3xl px-1 sm:px-2">
            <!-- Breadcrumb -->
            <div
              class="flex flex-wrap items-center gap-2 text-white/50 text-xs sm:text-sm mb-4 sm:mb-5"
            >
              <NuxtLink
                to="/"
                class="hover:text-white/80 transition-colors flex-shrink-0"
                >Home</NuxtLink
              >
              <Icon name="mdi:chevron-right" class="w-4 h-4 flex-shrink-0" />
              <NuxtLink
                to="/blog"
                class="hover:text-white/80 transition-colors flex-shrink-0"
                >Blog</NuxtLink
              >
              <Icon name="mdi:chevron-right" class="w-4 h-4 flex-shrink-0" />
              <span class="text-white/70 line-clamp-1 flex-1 min-w-[100px]">{{
                BlogDetails.title
              }}</span>
            </div>

            <!-- Category Tag -->
            <span
              class="inline-flex items-center gap-1.5 bg-primary text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full mb-4 sm:mb-5 shadow-lg"
            >
              <Icon name="mdi:tag-outline" class="w-3 h-3" />
              Fashion &amp; Style
            </span>

            <!-- Title -->
            <h1
              class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 sm:mb-5 leading-tight drop-shadow-lg"
            >
              {{ BlogDetails.title }}
            </h1>

            <!-- Meta Pills -->
            <div class="flex flex-wrap items-center gap-2 sm:gap-3">
              <div
                class="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/15 text-white/80 text-[10px] sm:text-sm px-2.5 sm:px-4 py-1 sm:py-2 rounded-full"
              >
                <Icon
                  name="uil:calendar-alt"
                  class="w-3.5 sm:w-4 h-3.5 sm:h-4 text-secondary"
                />
                {{ formatDate(BlogDetails.publish_date) }}
              </div>
              <div
                class="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/15 text-white/80 text-[10px] sm:text-sm px-2.5 sm:px-4 py-1 sm:py-2 rounded-full"
              >
                <Icon
                  name="uil:user"
                  class="w-3.5 sm:w-4 h-3.5 sm:h-4 text-secondary"
                />
                By Admin
              </div>
              <div
                class="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/15 text-white/80 text-[10px] sm:text-sm px-2.5 sm:px-4 py-1 sm:py-2 rounded-full"
              >
                <div class="flex text-yellow-400">
                  <Icon
                    name="mdi:star"
                    class="w-3 sm:w-3.5 h-3 sm:h-3.5"
                    v-for="i in averageRating"
                    :key="i"
                  />
                </div>
                <span
                  >({{ BlogDetails?.blog_reviews?.length || 0 }} Reviews)</span
                >
              </div>
              <div
                class="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/15 text-white/80 text-[10px] sm:text-sm px-2.5 sm:px-4 py-1 sm:py-2 rounded-full"
              >
                <Icon
                  name="mdi:clock-outline"
                  class="w-3.5 sm:w-4 h-3.5 sm:h-4 text-secondary"
                />
                5 min read
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── Main Content ─── -->
    <section class="relative z-20 pb-16 sm:pb-20">
      <div class="container mx-auto px-4">
        <div
          class="flex flex-col lg:flex-row-reverse gap-8 xl:gap-12 -mt-8 sm:-mt-10 items-start"
        >
          <!-- Left Column: Article -->
          <div class="w-full lg:w-2/3">
            <!-- Article Body Card -->
            <article
              class="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-5 sm:p-8 md:p-12 border border-gray-100"
            >
              <!-- Short description highlight -->
              <p
                class="text-sm sm:text-lg md:text-xl text-gray-600 font-medium leading-relaxed mb-5 sm:mb-8 pb-5 sm:pb-8 border-b border-gray-100 italic"
              >
                {{ BlogDetails.short_description }}
              </p>

              <!-- Content Body -->
              <div
                v-html="BlogDetails.description"
                class="prose prose-base sm:prose-lg max-w-none text-gray-600 leading-relaxed blog-content"
              ></div>

              <!-- Tags & Share -->
              <div
                class="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div class="flex flex-wrap items-center gap-2">
                  <span class="font-black text-gray-900 text-sm mr-1"
                    >Tags:</span
                  >
                  <span
                    v-for="tag in BlogDetails.tags"
                    :key="tag"
                    class="text-xs bg-primary/10 text-primary font-bold px-3 py-1 rounded-full hover:bg-primary hover:text-white transition-colors cursor-pointer"
                  >
                    #{{ tag }}
                  </span>
                </div>
                <div class="flex items-center gap-2 sm:gap-3">
                  <span class="font-black text-gray-900 text-sm">Share:</span>
                  <button
                    class="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    <Icon name="uil:facebook-f" class="w-4 h-4" />
                  </button>
                  <button
                    class="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-sky-100 text-sky-500 flex items-center justify-center hover:bg-sky-500 hover:text-white transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    <Icon name="uil:twitter" class="w-4 h-4" />
                  </button>
                  <button
                    class="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center hover:bg-blue-800 hover:text-white transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    <Icon name="uil:linkedin" class="w-4 h-4" />
                  </button>
                </div>
              </div>
            </article>

            <!-- ─── Comments Section ─── -->
            <div
              class="mt-6 sm:mt-8 bg-white rounded-2xl sm:rounded-3xl shadow-lg p-5 sm:p-8 md:p-10 border border-gray-100"
            >
              <h3
                class="text-xl sm:text-2xl font-black text-gray-900 mb-6 sm:mb-8 flex items-center gap-3"
              >
                <div
                  class="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-primary/10 flex items-center justify-center"
                >
                  <Icon
                    name="uil:comments"
                    class="text-primary w-5 h-5 sm:w-6 sm:h-6"
                  />
                </div>
                Comments
                <span class="text-gray-400 text-base font-normal"
                  >({{ BlogDetails?.blog_reviews?.length || 0 }})</span
                >
              </h3>

              <div
                class="space-y-6 sm:space-y-8"
                v-if="BlogDetails?.blog_reviews?.length > 0"
              >
                <div
                  v-for="rev in BlogDetails.blog_reviews"
                  :key="rev.id"
                  class="flex gap-3 sm:gap-5"
                >
                  <div
                    class="flex-1 bg-gray-50 p-3 sm:p-5 md:p-6 rounded-2xl rounded-tl-none"
                  >
                    <div
                      class="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2 mb-2"
                    >
                      <h4 class="font-black text-gray-900 text-sm sm:text-base">
                        {{ rev.name }}
                      </h4>
                      <span class="text-xs text-gray-400 font-medium">{{
                        formatDate(rev.created_at)
                      }}</span>
                    </div>
                    <div class="flex text-yellow-400 text-sm mb-2 sm:mb-3">
                      <Icon
                        name="mdi:star"
                        v-for="i in 5"
                        :key="i"
                        :class="
                          i <= rev.rating ? 'text-yellow-400' : 'text-gray-200'
                        "
                        class="w-4 h-4"
                      />
                    </div>
                    <p
                      class="text-gray-600 text-sm sm:text-base leading-relaxed italic"
                    >
                      "{{ rev.reviewMassage }}"
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- ─── Leave a Review ─── -->
            <div
              class="mt-6 sm:mt-8 bg-white rounded-2xl sm:rounded-3xl shadow-lg p-5 sm:p-8 md:p-10 border border-gray-100 relative overflow-hidden"
            >
              <!-- Decorative blob -->
              <div
                class="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"
              ></div>

              <h3
                class="text-xl sm:text-2xl font-black text-gray-900 mb-1 relative z-10 flex items-center gap-3"
              >
                <div
                  class="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-secondary/10 flex items-center justify-center"
                >
                  <Icon name="uil:pen" class="text-secondary w-5 h-5" />
                </div>
                Leave a Reply
              </h3>
              <p
                class="text-gray-400 text-xs sm:text-sm mb-6 sm:mb-8 relative z-10 ml-12 sm:ml-14"
              >
                Your email address will not be published. Required fields are
                marked *
              </p>

              <div class="relative z-10 space-y-4 sm:space-y-5">
                <!-- Star Rating -->
                <div>
                  <label
                    class="block text-xs sm:text-sm font-black text-gray-700 mb-2 uppercase tracking-wider"
                    >Your Rating</label
                  >
                  <div class="flex gap-1.5 sm:gap-2">
                    <button
                      v-for="star in 5"
                      :key="star"
                      @click="rating = star"
                      type="button"
                      class="transition-transform hover:scale-110 focus:outline-none"
                    >
                      <Icon
                        :name="rating >= star ? 'mdi:star' : 'mdi:star-outline'"
                        class="w-7 h-7 sm:w-8 sm:h-8 transition-colors"
                        :class="
                          rating >= star ? 'text-yellow-400' : 'text-gray-300'
                        "
                      />
                    </button>
                  </div>
                </div>

                <!-- Name & Email -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      class="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5"
                      >Full Name *</label
                    >
                    <input
                      v-model="review.name"
                      type="text"
                      placeholder="John Doe"
                      class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm placeholder-gray-400"
                    />
                  </div>
                  <div>
                    <label
                      class="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5"
                      >Email Address *</label
                    >
                    <input
                      v-model="review.email"
                      type="email"
                      placeholder="john@example.com"
                      class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm placeholder-gray-400"
                    />
                  </div>
                </div>

                <!-- Message -->
                <div>
                  <label
                    class="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5"
                    >Your Comment *</label
                  >
                  <textarea
                    v-model="review.reviewMassage"
                    rows="5"
                    placeholder="Write your thoughts here..."
                    class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none text-sm placeholder-gray-400"
                  ></textarea>
                </div>

                <button
                  @click="onSubmit"
                  class="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white font-black tracking-wider px-8 sm:px-10 py-3.5 sm:py-4 rounded-xl shadow-lg hover:shadow-primary/30 transform hover:-translate-y-0.5 transition-all duration-300 text-sm sm:text-base"
                >
                  <Icon name="uil:message" class="w-5 h-5" />
                  POST COMMENT
                </button>
              </div>
            </div>
          </div>

          <!-- Right Sidebar -->
          <aside class="w-full lg:w-1/3 space-y-6 sm:space-y-8">
            <!-- Author Card -->
            <div
              class="bg-white rounded-2xl sm:rounded-3xl shadow-md p-5 sm:p-6 border border-gray-100 text-center"
            >
              <div
                class="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-primary to-secondary mx-auto mb-3 sm:mb-4 flex items-center justify-center shadow-lg"
              >
                <Icon
                  name="uil:user"
                  class="w-8 h-8 sm:w-10 sm:h-10 text-white"
                />
              </div>
              <h4 class="text-base font-black text-gray-900 mb-1">Admin</h4>
              <p class="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
                Content Writer &amp; Designer
              </p>
              <p class="text-xs text-gray-400 leading-relaxed">
                Passionate about design, technology, and sharing insights that
                help creators build amazing digital experiences.
              </p>
            </div>

            <!-- Search -->
            <div
              class="bg-white rounded-2xl sm:rounded-3xl shadow-md p-5 sm:p-6 border border-gray-100"
            >
              <h3
                class="text-base font-black text-gray-900 mb-4 flex items-center gap-2"
              >
                <Icon name="uil:search" class="w-4 h-4 text-primary" />
                Search
              </h3>
              <div class="relative">
                <input
                  type="text"
                  placeholder="Search articles..."
                  class="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder-gray-400"
                />
                <Icon
                  name="uil:search"
                  class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4"
                />
              </div>
            </div>

            <!-- Trending Now -->
            <div
              class="bg-white rounded-2xl sm:rounded-3xl shadow-md p-5 sm:p-6 md:p-8 border border-gray-100"
            >
              <h3
                class="text-base font-black text-gray-900 mb-5 pb-3 border-b border-gray-100 flex items-center gap-2"
              >
                <Icon name="mdi:fire" class="text-orange-500 w-5 h-5" />
                Trending Now
              </h3>
              <div class="space-y-4 sm:space-y-5">
                <div
                  v-for="blog in topArticles"
                  :key="blog.id"
                  class="flex items-start gap-3 sm:gap-4 group cursor-pointer"
                >
                  <div
                    class="relative overflow-hidden rounded-xl w-16 h-14 sm:w-20 sm:h-16 flex-shrink-0"
                  >
                    <img
                      :src="blog.blog_image_url"
                      class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      alt="Thumbnail"
                    />
                  </div>
                  <div class="flex-1 min-w-0">
                    <NuxtLink
                      :to="`/blog/${blog.slug}`"
                      class="block font-bold text-xs sm:text-sm text-gray-900 leading-snug hover:text-primary transition-colors line-clamp-2 mb-1.5"
                    >
                      {{ blog.title }}
                    </NuxtLink>
                    <span
                      class="text-[10px] sm:text-xs text-gray-400 font-medium flex items-center gap-1"
                    >
                      <Icon name="uil:calendar-alt" class="w-3 h-3" />
                      {{ formatDateShort(blog.publish_date) }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Latest Posts -->
            <div
              class="bg-white rounded-2xl sm:rounded-3xl shadow-md p-5 sm:p-6 md:p-8 border border-gray-100"
            >
              <h3
                class="text-base font-black text-gray-900 mb-5 pb-3 border-b border-gray-100 flex items-center gap-2"
              >
                <Icon name="mdi:clock-outline" class="text-secondary w-5 h-5" />
                Latest Posts
              </h3>
              <div class="space-y-4 sm:space-y-5">
                <div
                  v-for="blog in latestBlogs"
                  :key="blog.id"
                  class="flex items-start gap-3 sm:gap-4 group cursor-pointer"
                >
                  <div
                    class="relative overflow-hidden rounded-xl w-16 h-14 sm:w-20 sm:h-16 flex-shrink-0"
                  >
                    <img
                      :src="blog.blog_image_url"
                      class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      alt="Thumbnail"
                    />
                  </div>
                  <div class="flex-1 min-w-0">
                    <NuxtLink
                      :to="`/blog/${blog.slug}`"
                      class="block font-bold text-xs sm:text-sm text-gray-900 leading-snug hover:text-primary transition-colors line-clamp-2 mb-1.5"
                    >
                      {{ blog.title }}
                    </NuxtLink>
                    <span
                      class="text-[10px] sm:text-xs text-gray-400 font-medium flex items-center gap-1"
                    >
                      <Icon name="uil:calendar-alt" class="w-3 h-3" />
                      {{ formatDateShort(blog.publish_date) }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Newsletter Widget -->
            <div
              class="relative overflow-hidden bg-gradient-to-br from-primary to-secondary rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-center shadow-lg"
            >
              <div
                class="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full pointer-events-none"
              ></div>
              <div
                class="absolute -bottom-8 -left-8 w-24 h-24 bg-white/10 rounded-full pointer-events-none"
              ></div>
              <div class="relative z-10">
                <div
                  class="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4"
                >
                  <Icon
                    name="uil:envelope-check"
                    class="w-6 h-6 sm:w-7 sm:h-7 text-white"
                  />
                </div>
                <h3 class="text-base sm:text-lg font-black text-white mb-1">
                  Subscribe Newsletter
                </h3>
                <p
                  class="text-white/75 text-xs sm:text-sm mb-5 leading-relaxed"
                >
                  Get the latest posts delivered right to your inbox.
                </p>
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

<style scoped>
/* Blog content typography */
:deep(.blog-content h3) {
  font-size: 1.35rem;
  line-height: 1.75rem;
  font-weight: 800;
  color: #111827;
  margin-top: 2rem;
  margin-bottom: 0.75rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #f3f4f6;
}

:deep(.blog-content p) {
  margin-bottom: 1.5rem;
  font-size: 1rem;
  line-height: 1.75;
  color: #4b5563;
}

:deep(.blog-content p:first-child::first-letter) {
  float: left;
  font-size: 3.25rem;
  line-height: 0.85;
  font-weight: 900;
  margin-right: 0.5rem;
  margin-top: 0.2rem;
  color: #13a1fd;
}
</style>
