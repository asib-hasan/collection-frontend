<script setup lang="ts">
import { ref, computed, onMounted, watch, nextTick } from 'vue';

const props = defineProps({
  itemCode: {
    type: String,
    default: ''
  }
});

const { data: ordersData, refresh } = await useAPI<any>("/frontend/v1/get-user-order");
const orders = computed(() => ordersData.value || []);
const toast = useToast();

const trackingId = ref('');
const isTracking = ref(false);
const showResult = ref(false);
const trackedOrder = ref<any>(null);

const handleTrackOrder = () => {
  const currentId = trackingId.value?.trim();
  if (!currentId) return;
  
  isTracking.value = true;
  showResult.value = false;
  
  // Find order in local list - added more robust search
  const found = orders.value.find((o: any) => 
    o.order_code?.toString().toLowerCase().trim() === currentId.toLowerCase()
  );
  
  setTimeout(() => {
    isTracking.value = false;
    if (found) {
      trackedOrder.value = found;
      showResult.value = true;
    } else {
      trackedOrder.value = null;
      showResult.value = false;
      toast.add({
        title: "Order Not Found",
        description: `We couldn't find order ${currentId} in your history.`,
        color: "error"
      });
    }
  }, 600);
};

// Watch for prop changes to handle cross-tab navigation properly
watch(() => props.itemCode, (newCode) => {
  if (newCode) {
    trackingId.value = newCode;
    // Delay slightly to ensure component is fully ready
    nextTick(() => {
      handleTrackOrder();
    });
  }
}, { immediate: true });

const trackingSteps = computed(() => {
  if (!trackedOrder.value) return [];

  const status = trackedOrder.value.order_status;
  const createdAt = new Date(trackedOrder.value.created_at).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  // If order is canceled, we might want to handle it differently
  if (status === 'cancel') {
    return [
      { 
        id: 1, 
        status: 'Order Placed', 
        date: createdAt, 
        description: 'We received your order.',
        completed: true,
        icon: 'mdi:clipboard-check-outline'
      },
      { 
        id: 2, 
        status: 'Order Canceled', 
        date: 'Canceled', 
        description: 'This order has been canceled.',
        completed: true,
        icon: 'mdi:close-circle-outline'
      }
    ];
  }

  const steps = [
    { 
      id: 1, 
      status: 'Order Placed', 
      date: createdAt, 
      description: 'We have received your order.',
      completed: true,
      icon: 'mdi:clipboard-check-outline'
    },
    { 
      id: 2, 
      status: 'Processing', 
      date: ['received', 'process', 'shipped', 'delivered'].includes(status) ? 'Completed' : 'Pending', 
      description: 'Your order is being prepared for shipping.',
      completed: ['received', 'process', 'shipped', 'delivered'].includes(status),
      icon: 'mdi:package-variant-closed'
    },
    { 
      id: 3, 
      status: 'Shipped', 
      date: ['shipped', 'delivered'].includes(status) ? 'Completed' : 'Pending', 
      description: 'Item has been handed over to the courier.',
      completed: ['shipped', 'delivered'].includes(status),
      icon: 'mdi:truck-fast-outline'
    },
    { 
      id: 4, 
      status: 'Out for Delivery', 
      date: status === 'delivered' ? 'Completed' : 'Pending', 
      description: 'Courier is on the way to your address.',
      completed: status === 'delivered',
      icon: 'mdi:map-marker-path'
    },
    { 
      id: 5, 
      status: 'Delivered', 
      date: status === 'delivered' ? 'Completed' : 'Pending', 
      description: 'Item successfully delivered.',
      completed: status === 'delivered',
      icon: 'mdi:home-variant-outline'
    }
  ];

  return steps;
});
</script>

<template>
  <div class="h-full flex flex-col">
    <div class="flex items-center gap-3 mb-8">
      <div class="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
        <Icon name="ph:truck-duotone" class="text-primary text-2xl" />
      </div>
      <div>
        <h2 class="text-2xl font-black text-gray-900">Track Your Order</h2>
        <p class="text-sm text-gray-500 font-medium mt-0.5">Enter your tracking ID to see real-time updates.</p>
      </div>
    </div>

    <!-- Recent Orders (Quick Select) -->
    <div v-if="orders.length > 0 && !showResult" class="mb-8">
      <p class="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Your Recent Orders</p>
      <div class="flex flex-wrap gap-3">
        <button 
          v-for="order in orders.slice(0, 5)" 
          :key="order.id"
          @click="trackingId = order.order_code; handleTrackOrder()"
          class="px-4 py-2 bg-white border border-gray-100 rounded-xl text-xs font-bold text-gray-600 hover:border-primary hover:text-primary transition-all shadow-sm"
        >
          {{ order.order_code }}
        </button>
      </div>
    </div>

    <!-- Tracking Input Form -->
    <div class="bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-100 mb-8">
      <form @submit.prevent="handleTrackOrder" class="flex flex-col sm:flex-row gap-4">
        <div class="relative flex-1">
          <Icon name="mdi:barcode-scan" class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
          <input 
            v-model="trackingId"
            type="text" 
            placeholder="Enter Order ID (e.g. LOOM-123456)" 
            class="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-gray-200 bg-white text-gray-900 text-sm font-bold focus:outline-none focus:border-primary transition-colors"
          />
        </div>
        <button 
          type="submit"
          :disabled="isTracking || !trackingId.trim()"
          class="bg-gradient-to-r from-primary to-secondary text-white font-black px-8 py-3.5 rounded-xl shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2 text-sm disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none shrink-0"
        >
          <Icon v-if="isTracking" name="mdi:loading" class="text-xl animate-spin" />
          <Icon v-else name="mdi:crosshairs-gps" class="text-xl" />
          {{ isTracking ? 'Tracking...' : 'Track Order' }}
        </button>
      </form>
    </div>

    <!-- Tracking Results UI -->
    <Transition name="fade" mode="out-in">
      <div v-if="showResult" class="flex-1">
        
        <!-- Summary Header -->
        <div class="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-6 text-white shadow-xl mb-10 border border-gray-700 relative overflow-hidden">
          <Icon name="ph:package-duotone" class="absolute -right-4 -bottom-6 text-[120px] text-white/5 pointer-events-none" />
          
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div>
              <p class="text-gray-400 font-bold text-xs uppercase tracking-wider mb-1">Tracking Number</p>
              <div class="flex items-center gap-3">
                <h3 class="text-2xl font-black font-mono tracking-tight">{{ trackedOrder?.order_code }}</h3>
                <span 
                  class="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 border"
                  :class="trackedOrder?.order_status == 'delivered' ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-primary/20 text-primary border-primary/30'"
                >
                  <span class="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>
                  {{ trackedOrder?.order_status }}
                </span>
              </div>
            </div>
            <div class="text-left md:text-right">
              <p class="text-gray-400 font-bold text-xs uppercase tracking-wider mb-1">Order Date</p>
              <h3 class="text-xl font-bold text-secondary">
                {{ new Date(trackedOrder?.created_at).toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' }) }}
              </h3>
            </div>
          </div>
        </div>

        <!-- Timeline -->
        <div class="pl-2 md:pl-8">
          <div class="relative border-l-2 border-dashed border-gray-200 pb-4">
            
            <div 
              v-for="(step, index) in trackingSteps" 
              :key="step.id"
              class="relative pl-8 md:pl-12 pb-10 last:pb-0"
            >
              <!-- Connection Line active filler -->
              <div v-if="step.completed && index !== trackingSteps.length - 1" class="absolute top-8 left-[-2px] w-[2px] h-full bg-primary -ml-[0px]"></div>

              <!-- Node Icon -->
              <div 
                class="absolute left-0 top-0 -translate-x-[50%] w-10 h-10 rounded-full flex items-center justify-center ring-4 ring-white shadow-sm transition-all duration-300"
                :class="step.completed ? 'bg-gradient-to-br from-primary to-secondary text-white shadow-primary/30' : 'bg-gray-100 text-gray-400 border-2 border-gray-200'"
              >
                <Icon :name="step.completed ? step.icon : 'mdi:circle-outline'" class="text-xl" />
              </div>

              <!-- Content Row -->
              <div class="bg-white rounded-xl p-5 border transition-all duration-300 transform"
                :class="step.completed ? 'border-primary/20 shadow-md shadow-primary/5 hover:-translate-y-1' : 'border-gray-100 opacity-60'">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <h4 class="font-black text-gray-900 text-base flex items-center gap-2">
                    {{ step.status }}
                    <Icon v-if="step.completed && index == 2" name="mdi:check-decagram" class="text-green-500 w-4 h-4" />
                  </h4>
                  <span class="text-xs font-bold px-3 py-1 bg-gray-50 rounded-lg text-gray-500 border border-gray-100 flex items-center gap-1.5">
                    <Icon name="mdi:calendar-clock-outline" />
                    {{ step.date }}
                  </span>
                </div>
                <p class="text-sm text-gray-500 font-medium leading-relaxed">{{ step.description }}</p>
              </div>

            </div>
          </div>
        </div>
      </div>
      
      <!-- Empty State -->
      <div v-else class="flex-1 flex flex-col items-center justify-center text-center py-16 opacity-50">
        <Icon name="ph:package-duotone" class="text-8xl text-gray-300 mb-4" />
        <h3 class="text-xl font-bold text-gray-400">No Tracking Information</h3>
        <p class="text-sm text-gray-400 mt-2 max-w-xs">Enter your tracking number above to see the current status of your shipment.</p>
      </div>
    </Transition>

  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
