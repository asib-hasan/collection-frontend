<script setup lang="ts">
useHead({ title: "Contact Us | Loomino" });

const toast = useToast();
const { $api } = useNuxtApp();
const settings = useState<any>('config');

const form = reactive({
  name: "",
  email: "",
  phone: "",
  subject: "",
  massage: "",
});

const errors = reactive<Record<string, string>>({});
const loading = ref(false);
const submitted = ref(false);

const subjects = [
  "Order Inquiry",
  "Return & Refund",
  "Shipping Issue",
  "Product Question",
  "Payment Problem",
  "Partnership",
  "Other",
];

const validate = (): boolean => {
  Object.keys(errors).forEach((k) => delete errors[k]);
  if (!form.name.trim()) errors.name = "Name is required";
  if (!form.email.trim()) errors.email = "Email is required";
  else if (!/\S+@\S+\.\S+/.test(form.email))
    errors.email = "Enter a valid email";
  if (!form.subject) errors.subject = "Please select a subject";
  if (!form.massage.trim()) errors.massage = "Message is required";
  else if (form.massage.trim().length < 10)
    errors.massage = "Message must be at least 10 characters";
  return Object.keys(errors).length === 0;
};

const handleSubmit = async () => {
  if (!validate()) return;
  loading.value = true;
  try {
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("phone", form.phone);
    formData.append("subject", form.subject);
    formData.append("massage", form.massage);

    await $api("/frontend/v1/store-mails", {
      method: "POST",
      body: formData,
    });

    submitted.value = true;
    toast.add({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours.",
      color: "primary",
      icon: "i-heroicons-check-circle",
    });
  } catch {
    toast.add({
      title: "Failed to send",
      description: "Please try again or email us directly.",
      color: "error",
      icon: "i-heroicons-x-circle",
    });
  } finally {
    loading.value = false;
  }
};

const resetForm = () => {
  Object.assign(form, {
    name: "",
    email: "",
    phone: "",
    subject: "",
    massage: "",
  });
  submitted.value = false;
};

const contactInfo = computed(() => [
  {
    icon: "mdi:map-marker-outline",
    label: "Our Address",
    value: settings.value?.address || "House 12, Road 4, Mirpur-1, Dhaka-1216, Bangladesh",
    color: "text-blue-500",
    bg: "bg-blue-50",
    href: "https://maps.google.com",
  },
  {
    icon: "mdi:phone-outline",
    label: "Phone",
    value: settings.value?.phone_number || "+880 1800-000000",
    color: "text-green-500",
    bg: "bg-green-50",
    href: `tel:${settings.value?.phone_number || "+8801800000000"}`,
  },
  {
    icon: "mdi:email-outline",
    label: "Email",
    value: settings.value?.email || "support@loomino.com",
    color: "text-primary",
    bg: "bg-primary/10",
    href: `mailto:${settings.value?.email || "support@loomino.com"}`,
  },
  {
    icon: "mdi:clock-outline",
    label: "Business Hours",
    value: settings.value?.business_hours || "Sat – Thu · 9:00 AM – 9:00 PM",
    color: "text-orange-500",
    bg: "bg-orange-50",
    href: null,
  },
]);

const socials = [
  {
    icon: "mdi:facebook",
    label: "Facebook",
    href: settings.value?.facebook_link || "#",
    color: "hover:bg-blue-600",
  },
  {
    icon: "mdi:instagram",
    label: "Instagram",
    href: settings.value?.instagram_link || "#",
    color: "hover:bg-pink-500",
  },
  {
    icon: "mdi:twitter",
    label: "Twitter / X",
    href: settings.value?.twitter_link || "#",
    color: "hover:bg-sky-500",
  },
  {
    icon: "mdi:whatsapp",
    label: "WhatsApp",
    href: settings.value?.whatsapp_link || "#",
    color: "hover:bg-green-500",
  },
];
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- ── Page Header ─────────────────────────────────────────────── -->
    <div
      class="relative py-10 md:py-16 lg:py-20 border-b border-gray-100 overflow-hidden"
    >
      <img
        src="/images/contact.png"
        alt="Contact Banner"
        class="absolute inset-0 w-full h-full object-cover z-0"
      />
      <div
        class="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent z-10"
      />
      <div class="container mx-auto px-4 relative z-20">
        <h1
          class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight uppercase mb-3 drop-shadow-sm"
        >
          Contact Us
        </h1>
        <div class="w-16 sm:w-20 h-1.5 bg-primary rounded-full mb-4 shadow-md" />
        <div class="flex flex-wrap items-center gap-2 text-sm sm:text-base text-gray-600 font-medium">
          <NuxtLink to="/" class="hover:text-primary transition-colors flex-shrink-0"
            >Home</NuxtLink
          >
          <Icon name="mdi:chevron-right" class="text-gray-400 flex-shrink-0" />
          <span class="text-gray-900 flex-1 min-w-0 truncate">Contact</span>
        </div>
      </div>
    </div>

    <!-- ── Main Content ───────────────────────────────────────────── -->
    <div class="container mx-auto px-4 py-8 md:py-14">
      <div class="flex flex-col lg:flex-row gap-6 md:gap-10 ">
        <!-- ══════════════════════════════════════════════════════ -->
        <!-- LEFT: Contact Form -->
        <!-- ══════════════════════════════════════════════════════ -->
        <div class="flex-1 min-w-0">
          <!-- Success State -->
          <Transition name="fade-scale" mode="out-in">
            <div
              v-if="submitted"
              key="success"
              class="bg-white border border-gray-100 rounded-2xl p-10 shadow-sm text-center"
            >
              <div
                class="w-24 h-24 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6 shadow-inner"
              >
                <Icon
                  name="mdi:check-circle-outline"
                  class="text-5xl text-green-400"
                />
              </div>
              <h2 class="text-2xl font-black text-gray-900 mb-2">
                Message Received! 🎉
              </h2>
              <p class="text-gray-500 mb-8 leading-relaxed max-w-sm mx-auto">
                Thank you for reaching out. Our team will get back to you within
                <strong>24 hours</strong>.
              </p>
              <button
                @click="resetForm"
                class="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-black font-black px-8 py-3.5 rounded-xl shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300 text-sm uppercase tracking-wider"
              >
                <Icon name="mdi:refresh" class="text-xl" />
                Send Another Message
              </button>
            </div>

            <!-- Form Card -->
            <div
              v-else
              key="form"
              class="bg-white border border-gray-100 rounded-2xl p-4 sm:p-6 md:p-8 shadow-sm"
            >
              <h2
                class="font-black text-gray-900 text-xl mb-2 flex items-center gap-3"
              >
                <span
                  class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center"
                >
                  <Icon
                    name="mdi:message-text-outline"
                    class="text-primary text-lg"
                  />
                </span>
                Send Us a Message
              </h2>
              <p class="text-sm text-gray-400 mb-7 ml-11">
                We typically reply within 24 hours.
              </p>

              <form @submit.prevent="handleSubmit" class="space-y-5">
                <!-- Name & Email -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      class="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5"
                      for="name"
                    >
                      Full Name <span class="text-red-400">*</span>
                    </label>
                    <div class="relative">
                      <Icon
                        name="mdi:account-outline"
                        class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg pointer-events-none"
                      />
                      <input
                        id="name"
                        v-model="form.name"
                        type="text"
                        placeholder="John Doe"
                        class="w-full pl-11 pr-4 py-3.5 rounded-xl border-2 bg-gray-50 text-gray-900 text-sm font-medium focus:outline-none focus:bg-white transition-all duration-200 placeholder:text-gray-400"
                        :class="
                          errors.name
                            ? 'border-red-400 focus:border-red-500'
                            : 'border-gray-200 focus:border-primary'
                        "
                      />
                    </div>
                    <p
                      v-if="errors.name"
                      class="mt-1 text-xs text-red-500 font-semibold"
                    >
                      {{ errors.name }}
                    </p>
                  </div>

                  <div>
                    <label
                      class="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5"
                      for="contact-email"
                    >
                      Email Address <span class="text-red-400">*</span>
                    </label>
                    <div class="relative">
                      <Icon
                        name="mdi:email-outline"
                        class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg pointer-events-none"
                      />
                      <input
                        id="contact-email"
                        v-model="form.email"
                        type="email"
                        placeholder="you@example.com"
                        class="w-full pl-11 pr-4 py-3.5 rounded-xl border-2 bg-gray-50 text-gray-900 text-sm font-medium focus:outline-none focus:bg-white transition-all duration-200 placeholder:text-gray-400"
                        :class="
                          errors.email
                            ? 'border-red-400 focus:border-red-500'
                            : 'border-gray-200 focus:border-primary'
                        "
                      />
                    </div>
                    <p
                      v-if="errors.email"
                      class="mt-1 text-xs text-red-500 font-semibold"
                    >
                      {{ errors.email }}
                    </p>
                  </div>
                </div>

                <!-- Phone & Subject -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      class="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5"
                      for="contact-phone"
                    >
                      Phone
                      <span class="text-gray-400 font-normal normal-case"
                        >(optional)</span
                      >
                    </label>
                    <div class="relative">
                      <Icon
                        name="mdi:phone-outline"
                        class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg pointer-events-none"
                      />
                      <input
                        id="contact-phone"
                        v-model="form.phone"
                        type="tel"
                        placeholder="01XXXXXXXXX"
                        class="w-full pl-11 pr-4 py-3.5 rounded-xl border-2 border-gray-200 bg-gray-50 text-gray-900 text-sm font-medium focus:outline-none focus:border-primary focus:bg-white transition-all duration-200 placeholder:text-gray-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      class="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5"
                      for="subject"
                    >
                      Subject <span class="text-red-400">*</span>
                    </label>
                    <select
                      id="subject"
                      v-model="form.subject"
                      class="w-full px-4 py-3.5 rounded-xl border-2 bg-gray-50 text-gray-900 text-sm font-medium focus:outline-none focus:bg-white transition-all duration-200 appearance-none cursor-pointer"
                      :class="
                        errors.subject
                          ? 'border-red-400 focus:border-red-500'
                          : 'border-gray-200 focus:border-primary'
                      "
                    >
                      <option value="" disabled>Select a topic</option>
                      <option v-for="s in subjects" :key="s" :value="s">
                        {{ s }}
                      </option>
                    </select>
                    <p
                      v-if="errors.subject"
                      class="mt-1 text-xs text-red-500 font-semibold"
                    >
                      {{ errors.subject }}
                    </p>
                  </div>
                </div>

                <!-- Message -->
                <div>
                  <label
                    class="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5"
                    for="message"
                  >
                    Your Message <span class="text-red-400">*</span>
                  </label>
                  <textarea
                    id="message"
                    v-model="form.massage"
                    rows="6"
                    placeholder="Tell us how we can help you..."
                    class="w-full px-4 py-3.5 rounded-xl border-2 bg-gray-50 text-gray-900 text-sm font-medium focus:outline-none focus:bg-white transition-all duration-200 placeholder:text-gray-400 resize-none leading-relaxed"
                    :class="
                      errors.massage
                        ? 'border-red-400 focus:border-red-500'
                        : 'border-gray-200 focus:border-primary'
                    "
                  />
                  <div class="flex items-center justify-between mt-1">
                    <p
                      v-if="errors.massage"
                      class="text-xs text-red-500 font-semibold"
                    >
                      {{ errors.massage }}
                    </p>
                    <p class="text-xs text-gray-400 font-semibold ml-auto">
                      {{ form.massage.length }} chars
                    </p>
                  </div>
                </div>

                <!-- Submit -->
                <button
                  type="submit"
                  :disabled="loading"
                  class="w-full bg-gradient-to-r from-primary to-secondary text-black font-black py-4 rounded-xl hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2 text-sm uppercase tracking-widest disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none mt-1"
                >
                  <Icon
                    v-if="loading"
                    name="mdi:loading"
                    class="text-xl animate-spin"
                  />
                  <Icon v-else name="mdi:send-outline" class="text-xl" />
                  {{ loading ? "Sending..." : "Send Message" }}
                </button>
              </form>
            </div>
          </Transition>
        </div>

        <!-- ══════════════════════════════════════════════════════ -->
        <!-- RIGHT: Contact Info + Map + Social -->
        <!-- ══════════════════════════════════════════════════════ -->
        <aside
          class="w-full lg:w-[400px] flex-shrink-0 space-y-4 sm:space-y-6 md:space-y-8 lg:sticky lg:top-6"
        >
          <!-- Info Cards -->
          <div
            class="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden"
          >
            <div class="px-4 sm:px-6 py-4 border-b border-gray-100">
              <h3 class="font-black text-gray-900 flex items-center gap-2">
                <Icon
                  name="mdi:information-outline"
                  class="text-primary text-xl"
                />
                Get in Touch
              </h3>
            </div>
            <div class="divide-y divide-gray-50">
              <component
                v-for="info in contactInfo"
                :key="info.label"
                :is="info.href ? 'a' : 'div'"
                :href="info.href || undefined"
                :target="
                  info.href && info.href.startsWith('http')
                    ? '_blank'
                    : undefined
                "
                class="flex items-start gap-3 sm:gap-4 px-4 sm:px-6 py-4 group transition-colors duration-200"
                :class="info.href ? 'hover:bg-gray-50 cursor-pointer' : ''"
              >
                <div
                  class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                  :class="info.bg"
                >
                  <Icon :name="info.icon" class="text-lg" :class="info.color" />
                </div>
                <div class="min-w-0">
                  <p
                    class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5"
                  >
                    {{ info.label }}
                  </p>
                  <p
                    class="font-semibold text-sm text-gray-800 leading-snug group-hover:text-primary transition-colors"
                  >
                    {{ info.value }}
                  </p>
                </div>
                <Icon
                  v-if="info.href"
                  name="mdi:chevron-right"
                  class="text-gray-300 group-hover:text-primary ml-auto flex-shrink-0 mt-1.5 group-hover:translate-x-0.5 transition-all"
                />
              </component>
            </div>
          </div>
          <!-- Social Links -->
          <div
            class="bg-white border border-gray-100 rounded-2xl p-5 sm:p-6 shadow-sm"
          >
            <h3 class="font-black text-gray-900 mb-4 flex items-center gap-2">
              <Icon
                name="mdi:share-variant-outline"
                class="text-primary text-xl"
              />
              Follow Us
            </h3>
            <div class="grid grid-cols-2 gap-2 sm:gap-3">
              <a
                v-for="social in socials"
                :key="social.label"
                :href="social.href"
                target="_blank"
                class="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-3 rounded-xl border-2 border-gray-100 text-gray-600 font-bold text-xs sm:text-sm transition-all duration-200 hover:text-white hover:border-transparent hover:-translate-y-0.5 hover:shadow-md"
                :class="social.color"
              >
                <Icon :name="social.icon" class="text-xl flex-shrink-0" />
                {{ social.label }}
              </a>
            </div>
          </div>

          <!-- FAQ Teaser -->
          <div
            class="bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/10 rounded-2xl p-6"
          >
            <div class="flex items-start gap-4">
              <div
                class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0"
              >
                <Icon
                  name="mdi:frequently-asked-questions"
                  class="text-primary text-xl"
                />
              </div>
              <div class="min-w-0">
                <h4 class="font-black text-gray-900 mb-1">Quick Answers</h4>
                <p class="text-sm text-gray-500 mb-4 leading-relaxed">
                  Most questions are already answered in our Help Center.
                </p>
                <NuxtLink
                  to="/faq"
                  class="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-secondary transition-colors group"
                >
                  Visit Help Center
                  <Icon
                    name="mdi:arrow-right"
                    class="group-hover:translate-x-0.5 transition-transform"
                  />
                </NuxtLink>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
    <!-- ── Map Embed ─────────────────────────────────────────────── -->
    <div class="container mx-auto px-4 my-8 md:my-10">
      <div class="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div
          class="px-4 sm:px-6 py-4 border-b border-gray-100 flex items-center justify-between"
        >
          <h3 class="font-black text-gray-900 flex items-center gap-2">
            <Icon name="mdi:map-outline" class="text-primary text-xl" />
            Find Us
          </h3>
          <a
            :href="settings?.google_map || 'https://maps.google.com'"
            target="_blank"
            class="text-xs font-bold text-primary hover:text-secondary transition-colors flex items-center gap-1"
          >
            Open in Maps
            <Icon name="mdi:open-in-new" class="text-xs" />
          </a>
        </div>
        <div class="relative overflow-hidden" style="height: 400px">
          <!-- Real Google Map iframe -->
          <iframe
            v-if="settings?.google_map"
            :src="settings.google_map"
            width="100%"
            height="100%"
            style="border: 0;"
            allowfullscreen
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
          <!-- Fallback placeholder if no map URL configured -->
          <div
            v-else
            class="absolute inset-0 bg-gradient-to-br from-blue-100 via-sky-50 to-teal-50 flex items-center justify-center"
          >
            <div class="text-center">
              <div
                class="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3 shadow-md"
              >
                <Icon name="mdi:map-marker" class="text-3xl text-primary" />
              </div>
              <p class="text-sm font-bold text-gray-600">Mirpur-1, Dhaka</p>
              <p class="text-xs text-gray-400 mt-0.5">Bangladesh 🇧🇩</p>
            </div>
            <!-- Decorative grid lines -->
            <div
              class="absolute inset-0 opacity-10"
              style="
                background-image:
                  linear-gradient(#13a1fd 1px, transparent 1px),
                  linear-gradient(90deg, #13a1fd 1px, transparent 1px);
                background-size: 28px 28px;
              "
            />
          </div>
        </div>
      </div>
    </div>

    <!-- ── Bottom CTA Banner ───────────────────────────────────────── -->
    <div
      class="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 py-12 md:py-14 mt-8"
    >
      <div class="container mx-auto px-4 text-center">
        <div class="flex items-center justify-center gap-2 mb-3">
          <div class="w-6 sm:w-8 h-0.5 bg-primary rounded-full" />
          <Icon name="mdi:headset" class="text-primary text-xl sm:text-2xl" />
          <div class="w-6 sm:w-8 h-0.5 bg-primary rounded-full" />
        </div>
        <h2 class="text-2xl sm:text-3xl font-black text-white mb-2">We're Here to Help</h2>
        <p class="text-sm sm:text-base text-gray-400 mb-6 sm:mb-8 max-w-md mx-auto leading-relaxed">
          Whether it's a question about your order, a return, or just feedback —
          we love hearing from you.
        </p>
        <div
          class="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
        >
          <a
            href="tel:+8801800000000"
            class="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-secondary text-black font-black px-6 sm:px-8 py-3.5 rounded-full shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300 text-xs sm:text-sm uppercase tracking-wider"
          >
            <Icon name="mdi:phone" class="text-lg sm:text-xl" />
            Call Us Now
          </a>
          <a
            href="mailto:support@loomino.com"
            class="w-full sm:w-auto inline-flex items-center justify-center gap-2 border-2 border-white/20 text-white font-bold px-6 sm:px-8 py-3.5 rounded-full hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-300 text-xs sm:text-sm"
          >
            <Icon name="mdi:email-outline" class="text-lg sm:text-xl" />
            Email Support
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.fade-scale-enter-from {
  opacity: 0;
  transform: scale(0.96) translateY(10px);
}
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.96) translateY(-10px);
}
</style>
