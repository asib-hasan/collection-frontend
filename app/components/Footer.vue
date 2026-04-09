<template>
  <footer class="bg-primary/15 text-slate-800 transition-colors duration-300">
    <!-- Main Footer Grid -->
    <div class="border-b border-black/5">
      <div class="container mx-auto px-4 py-8 md:py-16">
        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12"
        >
          <!-- Brand Column -->
          <div class="space-y-6">
            <NuxtLink
              to="/"
              class="inline-block transition-transform hover:scale-105 duration-300"
            >
              <img
                src="/images/logo1.png"
                alt="Loomino"
                class="h-14 w-auto object-contain rounded-xl shadow-sm"
              />
            </NuxtLink>
            <p
              class="text-slate-600 leading-relaxed text-sm md:text-base max-w-xs"
            >
              Your premium destination for fashion, lifestyle & trending
              products. Shop smart, live stylish with Loomino.
            </p>
            <!-- Social Icons -->
            <div class="flex items-center gap-3">
              <a
                v-for="social in socialLinks"
                :key="social.name"
                :href="social.url"
                target="_blank"
                class="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-500 border border-black/5 hover:bg-primary hover:text-black hover:border-primary hover:-translate-y-1 transition-all duration-300 shadow-sm"
                :title="social.name"
              >
                <Icon :name="social.icon" class="text-xl" />
              </a>
            </div>
          </div>

          <!-- Quick Links -->
          <div
            v-for="column in settings?.footer_columns"
            :key="column.title"
            class="space-y-6"
          >
            <h3
              class="text-xs font-bold uppercase tracking-widest text-slate-400 border-l-4 border-primary pl-3"
            >
              {{ column.title }}
            </h3>
            <ul class="space-y-3">
              <li v-for="link in column.pages" :key="link.to">
                <NuxtLink
                  :to="`/${link.slug}`"
                  class="text-slate-600 hover:text-primary hover:translate-x-1 flex items-center group transition-all duration-200"
                >
                  <Icon
                    name="mdi:chevron-right"
                    class="text-primary opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200"
                  />
                  <span class="text-sm font-medium">{{ link.title }}</span>
                </NuxtLink>
              </li>
            </ul>
          </div>

          <!-- Newsletter & Contact -->
          <div class="space-y-6">
            <h3
              class="text-xs font-bold uppercase tracking-widest text-slate-400 border-l-4 border-primary pl-3"
            >
              Stay Connected
            </h3>
            <div class="space-y-4">
              <div class="flex items-center gap-3 text-slate-600">
                <div
                  class="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-primary shadow-sm border border-black/5"
                >
                  <Icon name="mdi:map-marker-outline" class="text-lg" />
                </div>
                <span class="text-sm font-medium">{{ settings?.address }}</span>
              </div>
              <div class="flex items-center gap-3 text-slate-600">
                <div
                  class="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-primary shadow-sm border border-black/5"
                >
                  <Icon name="mdi:phone-outline" class="text-lg" />
                </div>
                <a
                  href="tel:+8801234567890"
                  class="text-sm font-medium hover:text-primary transition-colors"
                  >{{ settings?.hotline_number }}</a
                >
              </div>
            </div>

            <!-- Newsletter -->
            <div
              class="p-5 bg-white/50 backdrop-blur-sm rounded-2xl border border-black/5 shadow-inner"
            >
              <h4 class="text-sm font-bold text-slate-800 mb-2">Newsletter</h4>
              <p class="text-xs text-slate-500 mb-4">
                Get exclusive deals and updates.
              </p>
              <div class="flex gap-2">
                <input
                  type="email"
                  placeholder="Email address"
                  v-model="form.email"
                  class="flex-1 bg-white border border-black/5 rounded-xl px-4 py-2 text-xs outline-none focus:border-primary transition-colors shadow-sm"
                />
                <button @click="subscribe" :disabled="loading"
                  class="bg-primary hover:opacity-90 text-black px-3 rounded-xl transition-all shadow-md active:scale-95"
                >
                  <Icon name="mdi:send" class="text-lg" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Payment & Trust -->
    <div class="bg-white/30 backdrop-blur-sm border-b border-black/5">
      <div class="container mx-auto px-4 py-6">
        <div
          class="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6"
        >
          <div
            class="flex items-center gap-2 sm:gap-4 flex-wrap justify-center"
          >
            <span
              class="text-[10px] font-bold text-slate-400 uppercase tracking-widest"
              >We Accept</span
            >
            <div
              v-for="payment in payments"
              :key="payment.icon"
              class="px-3 py-1.5 bg-white rounded-lg border border-black/5 shadow-sm flex items-center gap-2 hover:border-primary transition-colors cursor-default"
            >
              <Icon :name="payment.icon" class="text-lg text-slate-600" />
              <span class="text-[10px] font-bold text-slate-500 uppercase">{{
                payment.label
              }}</span>
            </div>
          </div>
          <div
            class="flex items-center gap-3 sm:gap-6 flex-wrap justify-center"
          >
            <div
              v-for="trust in trusts"
              :key="trust.label"
              class="flex items-center gap-2 text-slate-500"
            >
              <Icon :name="trust.icon" class="text-lg text-primary" />
              <span class="text-[10px] font-bold tracking-wide uppercase">{{
                trust.label
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div class="container mx-auto px-4 py-6">
      <div
        class="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-medium text-slate-500"
      >
        <p>
          © {{ new Date().getFullYear() }}
          <span class="text-slate-800 font-bold">Loomino</span>. All rights
          reserved.
        </p>
        <div class="flex items-center gap-6">
          <NuxtLink
            v-for="legal in legalLinks"
            :key="legal.to"
            :to="legal.to"
            class="hover:text-primary transition-colors"
            >{{ legal.label }}</NuxtLink
          >
        </div>
        <p>
          Developed by
          <a
            href="https://creativetechpark.com/"
            target="_blank"
            class="text-slate-800 font-bold"
            >Creative Tech Park</a
          >.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const settings = useState<any>("config");
const { $api } = useNuxtApp()
const toast = useToast()

const socialLinks = computed(() => {
  const links = [];
  if (settings.value?.facebook_link) links.push({ name: 'Facebook', icon: 'line-md:facebook', url: settings.value.facebook_link });
  if (settings.value?.instagram_link) links.push({ name: 'Instagram', icon: 'line-md:instagram', url: settings.value.instagram_link });
  if (settings.value?.twitter_link) links.push({ name: 'Twitter', icon: 'line-md:twitter-x', url: settings.value.twitter_link });
  if (settings.value?.youtube_link) links.push({ name: 'YouTube', icon: 'line-md:youtube', url: settings.value.youtube_link });
  
  if (links.length === 0) {
    return [
      { name: 'Facebook', icon: 'line-md:facebook', url: '#' },
      { name: 'Instagram', icon: 'line-md:instagram', url: '#' },
      { name: 'Twitter', icon: 'line-md:twitter-x', url: '#' },
      { name: 'YouTube', icon: 'line-md:youtube', url: '#' },
    ]
  }
  return links;
});

const form = ref({
  email: ''
})
const loading = ref(false)
const subscribe = async () => {
  if (!form.value.email) {
    toast.add({
      title: "Error ❌",
      description: "Please enter your email address.",
      color: "error",
      icon: "i-heroicons-x-circle",
    })
    return
  }
  loading.value = true
  try {
    const response = await $api('/frontend/v1/store-newsletter', {
      method: 'POST',
      body: form.value
    })
    toast.add({
      title: "Subscribed 🎉",
      description: response?.message || "You have successfully subscribed to our newsletter.",
      color: "primary",
      icon: "i-heroicons-check-circle",
    })
    form.value.email = ''
  } catch (error) {
    toast.add({
      title: "Error ❌",
      description: error?.data?.message || "Subscription failed. Please try again.",
      color: "error",
      icon: "i-heroicons-x-circle",
    })
  } finally {
    loading.value = false
  }
}
const payments = [
  { label: "Visa", icon: "mdi:credit-card-outline" },
  { label: "Mastercard", icon: "mdi:credit-card-chip-outline" },
  { label: "COD", icon: "mdi:cash-fast" },
  { label: "Bank", icon: "mdi:bank-outline" },
];

const trusts = [
  { label: "Secure Checkout", icon: "mdi:shield-check-outline" },
  { label: "Fast Delivery", icon: "mdi:truck-fast-outline" },
  { label: "Easy Returns", icon: "mdi:refresh" },
];

const legalLinks = computed(() => [
  { label: "Privacy Policy", to: settings.value?.privacyPolicy_link || '/privacy' },
  { label: "Terms of Service", to: settings.value?.termsandcondition_link || '/terms' },
]);
</script>

<style scoped>
/* No extra CSS needed - pure Tailwind */
</style>
