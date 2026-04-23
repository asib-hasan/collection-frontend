<script setup lang="ts">
import { ref, computed, onMounted, watch, nextTick } from 'vue';

const props = defineProps({
  itemCode: {
    type: String,
    default: ''
  }
});

const ordersData = ref([
  {
    id: 1,
    order_code: "ORD-2025-C102",
    order_status: "shipped",
    created_at: "2025-04-10T10:00:00Z",
  },
  {
    id: 2,
    order_code: "ORD-2025-B943",
    order_status: "process",
    created_at: "2025-04-20T14:30:00Z",
  },
  {
    id: 3,
    order_code: "ORD-2025-D456",
    order_status: "delivered",
    created_at: "2025-03-15T09:15:00Z",
  }
]);
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
    <!-- Header -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 pb-4 border-b border-gray-100">
      <div class="flex items-center gap-4">
        <div class="w-10 h-10 flex items-center justify-center border border-gray-200 text-[#111]">
          <Icon name="mdi:truck-outline" class="text-xl" />
        </div>
        <div>
          <h2 class="font-cinzel text-2xl tracking-widest text-[#111] uppercase">Track Your Order</h2>
          <p class="font-jost text-[13px] text-gray-500 tracking-wide mt-1">Enter your tracking ID to see real-time updates.</p>
        </div>
      </div>
    </div>

    <!-- Recent Orders (Quick Select) -->
    <div v-if="orders.length > 0 && !showResult" class="mb-8">
      <p class="font-jost text-[10px] font-medium uppercase tracking-[2px] text-gray-400 mb-4">Your Recent Orders</p>
      <div class="flex flex-wrap gap-3">
        <button 
          v-for="order in orders.slice(0, 5)" 
          :key="order.id"
          @click="trackingId = order.order_code; handleTrackOrder()"
          class="px-5 py-2.5 bg-white border border-gray-200 font-jost text-[11px] font-medium tracking-[2px] uppercase text-[#111] hover:border-[#111] hover:bg-[#fbfaf8] transition-colors"
        >
          {{ order.order_code }}
        </button>
      </div>
    </div>

    <!-- Tracking Input Form -->
    <div class="bg-[#fbfaf8] border border-gray-100 p-8 mb-10">
      <form @submit.prevent="handleTrackOrder" class="flex flex-col sm:flex-row gap-4">
        <div class="relative flex-1">
          <input 
            v-model="trackingId"
            type="text" 
            placeholder="ENTER ORDER ID (E.G. LOOM-123456)" 
            class="w-full px-4 py-4 border border-gray-200 bg-white font-jost text-[13px] tracking-wide text-[#111] focus:outline-none focus:border-[#111] transition-colors placeholder-gray-400"
          />
        </div>
        <button 
          type="submit"
          :disabled="isTracking || !trackingId.trim()"
          class="bg-[#111] text-white px-10 py-4 border border-[#111] hover:bg-transparent hover:text-[#111] transition-colors duration-300 font-jost text-[12px] font-medium tracking-[2px] uppercase flex items-center justify-center gap-3 disabled:opacity-50 disabled:hover:bg-[#111] disabled:hover:text-white shrink-0"
        >
          <Icon v-if="isTracking" name="mdi:loading" class="text-lg animate-spin" />
          <Icon v-else name="mdi:crosshairs-gps" class="text-lg" />
          {{ isTracking ? 'TRACKING...' : 'TRACK ORDER' }}
        </button>
      </form>
    </div>

    <!-- Tracking Results UI -->
    <Transition name="fade" mode="out-in">
      <div v-if="showResult" class="flex-1">
        
        <!-- Summary Header -->
        <div class="bg-white border border-gray-200 p-8 mb-10 relative overflow-hidden">
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div>
              <p class="font-jost text-[10px] font-medium uppercase tracking-[2px] text-gray-400 mb-2">Tracking Number</p>
              <div class="flex items-center gap-4">
                <h3 class="font-cinzel text-2xl tracking-widest text-[#111] uppercase">{{ trackedOrder?.order_code }}</h3>
                <span 
                  class="px-3 py-1 font-jost text-[10px] font-medium uppercase tracking-[2px] border bg-white flex items-center gap-2"
                  :class="trackedOrder?.order_status == 'delivered' ? 'border-green-200 text-green-700' : 'border-[#d4929f] text-[#d4929f]'"
                >
                  <span v-if="trackedOrder?.order_status !== 'delivered'" class="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>
                  {{ trackedOrder?.order_status }}
                </span>
              </div>
            </div>
            <div class="text-left md:text-right">
              <p class="font-jost text-[10px] font-medium uppercase tracking-[2px] text-gray-400 mb-2">Order Date</p>
              <h3 class="font-jost text-[16px] text-[#111] tracking-wide uppercase">
                {{ new Date(trackedOrder?.created_at).toLocaleDateString("en-US", { month: 'long', day: 'numeric', year: 'numeric' }) }}
              </h3>
            </div>
          </div>
        </div>

        <!-- Timeline -->
        <div class="pl-2 md:pl-8">
          <div class="relative border-l border-gray-200 pb-4">
            
            <div 
              v-for="(step, index) in trackingSteps" 
              :key="step.id"
              class="relative pl-10 md:pl-16 pb-12 last:pb-0"
            >
              <!-- Connection Line active filler -->
              <div v-if="step.completed && index !== trackingSteps.length - 1" class="absolute top-6 left-[-1px] w-[2px] h-full bg-[#111]"></div>

              <!-- Node Icon -->
              <div 
                class="absolute left-0 top-0 -translate-x-[50%] w-10 h-10 flex items-center justify-center bg-white transition-all duration-300 border"
                :class="step.completed ? 'border-[#111] text-[#111]' : 'border-gray-200 text-gray-300'"
              >
                <Icon :name="step.completed ? step.icon : 'mdi:circle-small'" :class="step.completed ? 'text-lg' : 'text-3xl'" />
              </div>

              <!-- Content Row -->
              <div class="bg-white border p-6 transition-all duration-300 group"
                :class="step.completed ? 'border-gray-200 hover:border-[#111]' : 'border-gray-100 opacity-60'">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
                  <h4 class="font-cinzel text-[16px] tracking-widest uppercase flex items-center gap-3" :class="step.completed ? 'text-[#111]' : 'text-gray-400'">
                    {{ step.status }}
                  </h4>
                  <span class="font-jost text-[11px] font-medium uppercase tracking-[2px] text-gray-400">
                    {{ step.date }}
                  </span>
                </div>
                <p class="font-jost text-[14px] text-gray-500 leading-relaxed italic" :class="{'text-gray-400': !step.completed}">
                  "{{ step.description }}"
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
      
      <!-- Empty State -->
      <div v-else class="flex-1 flex flex-col items-center justify-center text-center py-20 bg-white border border-gray-100 animate-fade-in-up mt-8">
        <div class="w-16 h-16 flex items-center justify-center border border-gray-200 mb-6 bg-[#fbfaf8]">
          <Icon name="mdi:package-variant" class="text-2xl text-gray-400" />
        </div>
        <h3 class="font-cinzel text-xl tracking-widest text-[#111] uppercase mb-3">No Tracking Information</h3>
        <p class="font-jost text-[14px] text-gray-500 tracking-wide max-w-sm mb-8">
          Enter your tracking number above to see the current status of your shipment.
        </p>
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
