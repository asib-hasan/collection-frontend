<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { useRouter } from 'vue-router'
import AccountSettings from '~/components/Dashboard/AccountSettings.vue'
import MyOrders from '~/components/Dashboard/MyOrders.vue'
import MyReturns from '~/components/Dashboard/MyReturns.vue'
import OrderTracking from '~/components/Dashboard/OrderTracking.vue'
import MyCancellations from '~/components/Dashboard/MyCancellations.vue'

definePageMeta({
  middleware: ['auth'] // Ensure only logged-in users access
})

const authStore = useAuthStore()
const router = useRouter()
const activeTab = ref('AccountSettings')

const tabs = [
  { id: 'AccountSettings', label: 'Account Details', icon: 'mdi:account-outline' },
  { id: 'MyOrders', label: 'Order History', icon: 'mdi:shopping-outline' },
  { id: 'OrderTracking', label: 'Track Order', icon: 'mdi:map-marker-path' },
  { id: 'MyReturns', label: 'Returns', icon: 'mdi:keyboard-return' },
  { id: 'MyCancellations', label: 'Cancellations', icon: 'mdi:close-circle-outline' },
]

const components = {
  AccountSettings,
  MyOrders,
  OrderTracking,
  MyReturns,
  MyCancellations
}

onMounted(() => {
  if (!authStore.loggedIn) {
    router.push('/auth/login')
  }
})

const handleLogout = async () => {
  await authStore.logout()
}
</script>

<template>
  <div class="dashboard-page min-h-screen bg-[#fbfaf8] py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-[1200px] mx-auto">
      
      <!-- Minimalist Header -->
      <div class="text-center mb-12 animate-fade-in-up">
        <h1 class="font-cinzel text-3xl md:text-4xl font-semibold tracking-widest text-[#111] mb-3 uppercase">My Account</h1>
        <div class="w-12 h-px bg-[#d4929f] mx-auto mb-4"></div>
        <p class="font-jost text-gray-500 text-sm tracking-widest uppercase">
          Welcome back, {{ authStore.user?.name || 'Guest' }}
        </p>
      </div>

      <div class="flex flex-col md:flex-row gap-8 lg:gap-12">
        
        <!-- Sidebar Navigation -->
        <aside class="w-full md:w-[280px] flex-shrink-0 animate-fade-in-up" style="animation-delay: 0.1s;">
          <div class="bg-white border border-gray-100 p-6 shadow-sm sticky top-24">
            <nav class="flex flex-col gap-2">
              <button 
                v-for="tab in tabs" 
                :key="tab.id"
                @click="activeTab = tab.id"
                class="flex items-center gap-3 px-4 py-3.5 text-sm font-jost tracking-widest uppercase transition-all duration-300 w-full text-left border-l-2"
                :class="activeTab === tab.id ? 'bg-[#fbfaf8] text-[#d4929f] font-medium border-[#d4929f]' : 'text-gray-500 hover:bg-gray-50 hover:text-[#111] border-transparent'"
              >
                <Icon :name="tab.icon" class="text-xl" />
                {{ tab.label }}
              </button>
              
              <div class="h-px bg-gray-100 my-4"></div>
              
              <button 
                @click="handleLogout"
                class="flex items-center gap-3 px-4 py-3.5 text-sm font-jost tracking-widest uppercase text-gray-500 hover:bg-gray-50 hover:text-red-500 transition-all duration-300 border-l-2 border-transparent w-full text-left"
              >
                <Icon name="mdi:logout" class="text-xl" />
                Sign Out
              </button>
            </nav>
          </div>
        </aside>

        <!-- Dynamic Content Area -->
        <main class="flex-1 min-w-0 bg-white border border-gray-100 p-6 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] animate-fade-in-up" style="animation-delay: 0.2s;">
          <component :is="components[activeTab]" />
        </main>
        
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
  opacity: 0;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
