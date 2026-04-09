<script setup lang="ts">
import { ref } from "vue";
definePageMeta({
  middleware: "auth",
});

useHead({ title: "Dashboard | Loomino" });
const authStore = useAuthStore();

const tabs = [
  { name: "My Orders", icon: "material-symbols:local-mall-outline" },
  { name: "My Reviews", icon: "ph:star" },
  { name: "Track Order", icon: "ph:truck" },
  // { name: "My Returns", icon: "ph:arrow-u-down-left" },
  { name: "My Cancellations", icon: "ph:x-circle" },
  { name: "Account Settings", icon: "ph:gear" },
];

const activeTab = ref(0);
const trackedOrderCode = ref('');

const handleTrackOrder = (code: string) => {
  trackedOrderCode.value = code;
  activeTab.value = 2; // Index of "Track Order" tab
};
</script>

<template>
  <div class="min-h-screen bg-gray-50/80 pb-20">
    <!-- ── Header Banner ─────────────────────────────────────────────── -->
    <section
      class="relative h-48 sm:h-64 md:h-72 lg:h-[380px] overflow-hidden bg-gray-900 flex flex-col items-center justify-center mx-2 sm:mx-4 mt-4 rounded-3xl shadow-lg">
      <!-- Cover Image -->
      <img src="/images/bg-01.png" alt="Contact Banner"
        class="absolute inset-0 w-full h-full object-cover z-0 opacity-40" />

      <!-- Subtle Pattern Overlay -->
      <div class="absolute inset-0 opacity-20 z-10"
        style="background-image: linear-gradient(rgba(255,255,255,.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.2) 1px, transparent .5px); background-size: 30px 30px;">
      </div>
      <!-- Animated Glow -->
      <div
        class="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/30 rounded-full blur-[100px] animate-pulse pointer-events-none z-10 translate-x-1/3 -translate-y-1/3">
      </div>
      <div
        class="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/20 rounded-full blur-[80px] pointer-events-none z-10 -translate-x-1/3 translate-y-1/3">
      </div>

      <!-- Welcome Text Inside Banner -->
      <div class="relative z-20 text-center mb-20 md:mb-32 px-4">
        <h1
          class="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black text-white drop-shadow-lg tracking-tight mb-2">
          My Dashboard</h1>
        <p class="text-white/80 font-medium text-sm md:text-base">Manage your orders, profile, and preferences</p>
      </div>
    </section>

    <!-- ── Main Dashboard Container ──────────────────────────────────── -->
    <div class="container mx-auto px-3 sm:px-4 -mt-12 sm:-mt-24 md:-mt-36 relative z-20">
      <div class="flex flex-col xl:flex-row gap-4 sm:gap-6 lg:gap-8">

        <!-- Left Column: Profile & Navigation -->
        <div class="w-full xl:w-[340px] flex-shrink-0 flex flex-col gap-6">

          <!-- User Profile Card -->
          <div
            class="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl shadow-gray-200/50 border border-white p-6 md:p-8 relative overflow-hidden group">
            <div class="absolute inset-0 bg-gradient-to-br from-white/80 to-transparent z-0"></div>

            <div class="relative z-10 flex flex-col items-center text-center">
              <div
                class="relative w-28 h-28 md:w-32 md:h-32 rounded-full ring-4 ring-white shadow-xl bg-white mb-5 transition-transform duration-500 group-hover:scale-105">

                <!-- Show image if exists -->
                <img v-if="authStore?.user?.image_url" :src="authStore.user.image_url" alt="User profile"
                  class="w-full h-full object-cover rounded-full" />

                <!-- Show icon if no image -->
                <div v-else class="w-full h-full flex items-center justify-center rounded-full bg-gray-100">
                  <Icon name="material-symbols:account-circle-full" class="w-16 h-16 text-gray-400" />
                </div>

                <!-- Status dot -->
                <div
                  class="absolute bottom-2 right-2 bg-green-500 w-6 h-6 rounded-full border-4 border-white shadow-sm">
                </div>
              </div>

              <h2 class="text-2xl font-black text-gray-900 tracking-tight mb-1">
                {{ authStore?.user?.name }}
              </h2>
              <p class="text-gray-500 font-medium text-sm mb-5">{{ authStore?.user?.email }}</p>

              <div class="flex items-center justify-center gap-3 mb-6 w-full">
                <span
                  class="flex-1 flex items-center justify-center gap-1.5 text-[10px] sm:text-xs text-gray-600 bg-gray-50 py-2.5 rounded-xl border border-gray-100 font-black uppercase tracking-widest">
                  <Icon name="uil:calender" class="text-primary w-4 h-4" />
                  {{ new Date(authStore?.user?.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  }) }}
                </span>
              </div>

              <div class="w-full flex gap-3">
                <button @click="authStore.logout()"
                  class="flex-1 px-4 py-3 rounded-xl bg-red-50 text-red-600 font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-colors duration-300 flex items-center justify-center gap-2 text-xs shadow-sm">
                  <Icon name="uil:sign-out-alt" class="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>
          </div>

          <!-- Sidebar Navigation -->
          <nav
            class="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl shadow-gray-200/50 border border-white overflow-hidden xl:sticky xl:top-6">
            <div class="px-6 py-5 border-b border-gray-100/60 bg-white/50">
              <h3 class="font-black text-gray-900 flex items-center gap-2 text-sm uppercase tracking-widest">
                <Icon name="uil:apps" class="text-primary text-lg" />
                Dash Menu
              </h3>
            </div>
            <ul class="p-4 space-y-2">
              <li v-for="(tab, index) in tabs" :key="index">
                <button @click="activeTab = index" :class="[
                  'w-full px-5 py-4 text-left flex items-center gap-4 rounded-2xl transition-all duration-300 font-bold text-sm outline-none group',
                  activeTab == index
                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/30 transform scale-[1.02]'
                    : 'bg-transparent text-gray-600 hover:bg-white hover:shadow-md border border-transparent hover:border-gray-100',
                ]">
                  <div :class="[
                    'w-9 h-9 rounded-xl flex items-center justify-center transition-colors duration-300 shrink-0',
                    activeTab == index ? 'bg-white/20' : 'bg-gray-50 group-hover:bg-primary/10'
                  ]">
                    <Icon :name="tab.icon" :class="[
                      'w-[18px] h-[18px]',
                      activeTab == index ? 'text-white' : 'text-gray-500 group-hover:text-primary'
                    ]" />
                  </div>
                  {{ tab.name }}

                  <Icon v-if="activeTab == index" name="uil:angle-right-b" class="ml-auto w-5 h-5 opacity-90" />
                </button>
              </li>
            </ul>
          </nav>
        </div>

        <!-- Right Column: Main Content Area -->
        <div class="flex-1 min-w-0">
          <div
            class="bg-white/95 backdrop-blur-xl rounded-3xl shadow-xl shadow-gray-200/50 border border-white p-4 sm:p-6 md:p-8 lg:p-10 min-h-[500px] md:min-h-[700px] h-full flex flex-col">

            <!-- Dynamic Tab Content -->
            <Transition name="fade-scale" mode="out-in" class="flex-1">
              <div :key="activeTab" class="h-full">
                <!-- My Orders -->
                <DashboardMyOrders v-if="activeTab == 0" @track-order="handleTrackOrder" />

                <!-- My Reviews -->
                <DashboardMyReviews v-if="activeTab == 1" />

                <!-- Track Order -->
                <DashboardOrderTracking v-if="activeTab == 2" :itemCode="trackedOrderCode" />

                <!-- My Returns -->
                <!-- <DashboardMyReturns v-if="activeTab == 3" /> -->

                <!-- My Cancellations -->
                <DashboardMyCancellations v-if="activeTab == 3" />

                <!-- Account Settings -->
                <DashboardAccountSettings v-if="activeTab == 4" />
              </div>
            </Transition>

          </div>
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
  transform: translateY(20px) scale(0.98);
}

.fade-scale-leave-to {
  opacity: 0;
  transform: translateY(-20px) scale(0.98);
}
</style>
