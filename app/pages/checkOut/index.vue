<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useAPI } from '~/composables/useAPI'

definePageMeta({
  middleware: 'auth'
})

useHead({ title: 'Checkout | Loomino' })

const { $toast } = useNuxtApp()
const cartStore = useCartStore()
const authStore = useAuthStore()

const cartItems = computed(() => cartStore.getCartItems)
const cartTotal = computed(() => cartStore.cartTotal)
const cartCount = computed(() => cartStore.cartCount)

// Shipping settings
const SHIPPING_COST = 60
const FREE_SHIPPING_THRESHOLD = 2000

const freeShipping = computed(() => cartTotal.value >= FREE_SHIPPING_THRESHOLD)
const shipping = computed(() => (freeShipping.value ? 0 : SHIPPING_COST))

// Discount and coupon logic
const couponCode = ref('')
const promoDiscount = ref(0)
const promoApplied = ref(false)
const orderTotal = computed(() => {
  const discount = promoApplied.value ? promoDiscount.value : 0
  return Math.max(0, cartTotal.value - discount + shipping.value)
})

const applyCoupon = async () => {
  if (!couponCode.value) return
  try {
    const { data, error } = await useAPI("/frontend/v1/apply-coupon", {
      method: "POST",
      body: { code: couponCode.value, grand_total: cartStore?.getCartTotalPrice },
    })

    if (error.value) {
      $toast?.add({ title: 'Coupon Error', description: error.value.data?.message || 'Invalid coupon.', color: 'error' })
      return
    }

    const payload = (data.value as any).data || data.value
    const info = Array.isArray(payload) ? payload[0] : payload
    
    // Check for common discount field names: amount, discount, or value
    const discountValue = info?.amount || info?.discount || info?.value

    if (info && discountValue !== undefined) {
      promoDiscount.value = Number(discountValue)
      promoApplied.value = true
      $toast?.add({ title: 'Coupon Applied! 🎉', color: 'success' })
    } else {
      $toast?.add({ title: 'Invalid Coupon', description: 'Coupon details are missing from response.', color: 'error' })
    }
  } catch (err) {
    $toast?.add({ title: 'Error', description: 'Failed to apply coupon.', color: 'error' })
  }
}

const removeCoupon = () => {
  promoApplied.value = false
  promoDiscount.value = 0
  couponCode.value = ''
}

// Form handling
const form = reactive({ 
  user_id: authStore.user?.id || null,
  first_name: authStore.user?.name?.split(' ')[0] || '', 
  last_name: authStore.user?.name?.split(' ').slice(1).join(' ') || '', 
  email: authStore.user?.email || '', 
  phone: authStore.user?.phone || '', 
  street_address: '', 
  city: '', 
  district: '', // used for division selection
  postcode: '', 
  country: 'Bangladesh', 
  order_note: '',
  payment_method: 'cod' // default
})
const errors = reactive<Record<string, string>>({})
const loading = ref(false)
const step = ref<'shipping' | 'payment'>('shipping')
const divisions = ['Dhaka', 'Chittagong', 'Rajshahi', 'Khulna', 'Barisal', 'Sylhet', 'Rangpur', 'Mymensingh']

const validate = () => {
  Object.keys(errors).forEach(k => delete errors[k])
  if (!form.first_name.trim()) errors.first_name = 'Required'
  if (!form.email.trim()) errors.email = 'Required'
  if (!form.country.trim()) errors.country = 'Required'
  // payment_method is required but has a default
  return Object.keys(errors).length === 0
}

const proceedToPayment = () => {
  if (!validate()) {
    $toast?.add({ title: 'Validation Error', description: 'Check required fields.', color: 'error' })
    return
  }
  step.value = 'payment'
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const placeOrder = async () => {
  if (!cartItems.value.length) return
  loading.value = true
  try {
    const { data, error } = await useAPI('/frontend/v1/orders', {
      method: 'POST',
      body: {
        user_id: form.user_id,
        first_name: form.first_name,
        last_name: form.last_name,
        email: form.email,
        phone: form.phone,
        street_address: form.street_address,
        city: form.city,
        country: form.country,
        postcode: form.postcode,
        order_note: form.order_note,
        sub_total: cartTotal.value,
        grand_total: orderTotal.value,
        delivery_charge: shipping.value,
        discount_amount: promoDiscount.value,
        payment_method: form.payment_method,
        vat: 0,
        tax: 0,
        payment_status: 'pending',
        order_date: new Date().toISOString().split('T')[0],
        order_items: cartItems.value.map(i => ({
          id: i.id,
          product_id: i.id,
          name: i.name,
          price: i.price,
          size: i.size || null,
          color: i.color || null,
          quantity: i.quantity,
          variant: i.variant || null
        })),
      },
    })

    if (error.value) throw new Error(error.value?.data?.message || 'Payment initiation failed')
    
    if (form.payment_method === 'cod') {
      $toast?.add({ title: 'Order Placed successfully! 🎉', color: 'success' })
      cartStore.clearCart();
      setTimeout(() => navigateTo('/order/success'), 1200)
    } else {
      const payload = data.value?.data || data.value
      const url = payload?.GatewayPageURL || payload?.url || (typeof payload === 'string' && payload.startsWith('http') ? payload : null)
      cartStore.clearCart();
      if (url) {
        window.location.href = url
      } else {
        $toast?.add({ title: 'Payment URL missing', description: 'Could not get payment link from server.', color: 'error' })
      }
    }
  } catch (err) {
    $toast?.add({ title: 'Order Failed', color: 'error' })
    navigateTo('/order/failed')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="bg-white min-h-screen">

    <!-- Page Header -->
    <div class="relative py-10 md:py-16 lg:py-20 border-b border-gray-100 overflow-hidden">
      <img src="/images/shipping.png" alt="Checkout" class="absolute inset-0 w-full h-full object-cover z-0" />
      <div class="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent z-10" />
      <div class="container mx-auto px-4 relative z-20">
        <h1 class="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight uppercase mb-3 drop-shadow-sm">
          Checkout
        </h1>
        <div class="w-20 h-1.5 bg-primary rounded-full mb-4 shadow-md" />
        <div class="flex items-center gap-2 text-gray-600 font-medium">
          <NuxtLink to="/" class="hover:text-primary transition-colors">Home</NuxtLink>
          <Icon name="mdi:chevron-right" class="text-gray-400" />
          <NuxtLink to="/cart" class="hover:text-primary transition-colors">Cart</NuxtLink>
          <Icon name="mdi:chevron-right" class="text-gray-400" />
          <span class="text-gray-900">Checkout</span>
        </div>
      </div>
    </div>

    <!-- Empty Cart Guard -->
    <div v-if="cartItems.length == 0" class="container mx-auto px-4 py-24 text-center">
      <div class="max-w-md mx-auto">
        <div class="w-32 h-32 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-6 shadow-inner">
          <Icon name="mdi:cart-off" class="text-6xl text-gray-300" />
        </div>
        <h2 class="text-3xl font-black text-gray-900 mb-3">Your cart is empty</h2>
        <p class="text-gray-500 mb-8">Add some items before checking out.</p>
        <NuxtLink
          to="/products"
          class="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-black font-bold px-8 py-4 rounded-full shadow-lg hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
        >
          <Icon name="mdi:shopping-outline" class="text-xl" />
          Start Shopping
        </NuxtLink>
      </div>
    </div>

    <!-- Main Checkout Layout -->
    <div v-else class="container mx-auto px-4 py-6 md:py-12">

      <!-- Progress Steps -->
      <div class="flex items-center justify-center gap-0 mb-6 md:mb-12">
        <div class="flex items-center gap-2">
          <div
            class="w-9 h-9 rounded-full flex items-center justify-center font-black text-sm transition-all duration-300"
            :class="step == 'shipping' ? 'bg-primary text-black shadow-lg shadow-primary/30' : 'bg-green-500 text-white'"
          >
            <Icon v-if="step == 'payment'" name="mdi:check" class="text-white text-base" />
            <span v-else>1</span>
          </div>
          <span class="font-bold text-sm" :class="step == 'shipping' ? 'text-gray-900' : 'text-green-600'">
            Shipping Info
          </span>
        </div>
        <div class="w-16 h-0.5 mx-2 rounded-full" :class="step == 'payment' ? 'bg-primary' : 'bg-gray-200'" />
        <div class="flex items-center gap-2">
          <div
            class="w-9 h-9 rounded-full flex items-center justify-center font-black text-sm transition-all duration-300"
            :class="step == 'payment' ? 'bg-primary text-black shadow-lg shadow-primary/30' : 'bg-gray-200 text-gray-400'"
          >
            2
          </div>
          <span class="font-bold text-sm" :class="step == 'payment' ? 'text-gray-900' : 'text-gray-400'">
            Payment
          </span>
        </div>
      </div>

      <div class="flex flex-col lg:flex-row gap-6 md:gap-10 items-start">

        <!-- ═══════════════════════════════════════════════════════════ -->
        <!-- LEFT: Shipping Form / Payment Step -->
        <!-- ═══════════════════════════════════════════════════════════ -->
        <div class="flex-1 min-w-0">

          <!-- ── STEP 1: Shipping Information ── -->
          <Transition name="fade-slide" mode="out-in">
            <div v-if="step === 'shipping'" key="shipping">
              <div class="bg-white border border-gray-100 rounded-2xl p-4 sm:p-6 md:p-8 shadow-sm">
                <h2 class="font-black text-gray-900 text-xl mb-6 flex items-center gap-3">
                  <span class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon name="mdi:map-marker-outline" class="text-primary text-lg" />
                  </span>
                  Shipping Information
                </h2>

                <form @submit.prevent="proceedToPayment" class="space-y-5">

                  <!-- Name Row -->
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label class="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5" for="firstName">
                        First Name <span class="text-red-400">*</span>
                      </label>
                      <input
                        id="firstName"
                        v-model="form.first_name"
                        type="text"
                        placeholder="John"
                        class="w-full px-4 py-3.5 rounded-xl border-2 bg-gray-50 text-gray-900 text-sm font-medium focus:outline-none focus:bg-white transition-all duration-200 placeholder:text-gray-400"
                        :class="errors.first_name ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-primary'"
                      />
                      <p v-if="errors.first_name" class="mt-1 text-xs text-red-500 font-semibold">{{ errors.first_name }}</p>
                    </div>
                    <div>
                      <label class="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5" for="lastName">
                        Last Name <span class="text-red-400">*</span>
                      </label>
                      <input
                        id="lastName"
                        v-model="form.last_name"
                        type="text"
                        placeholder="Doe"
                        class="w-full px-4 py-3.5 rounded-xl border-2 bg-gray-50 text-gray-900 text-sm font-medium focus:outline-none focus:bg-white transition-all duration-200 placeholder:text-gray-400"
                        :class="errors.last_name ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-primary'"
                      />
                      <p v-if="errors.last_name" class="mt-1 text-xs text-red-500 font-semibold">{{ errors.last_name }}</p>
                    </div>
                  </div>

                  <!-- Email & Phone -->
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label class="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5" for="email">
                        Email Address <span class="text-red-400">*</span>
                      </label>
                      <div class="relative">
                        <Icon name="mdi:email-outline" class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg pointer-events-none" />
                        <input
                          id="email"
                          v-model="form.email"
                          type="email"
                          placeholder="you@example.com"
                          class="w-full pl-11 pr-4 py-3.5 rounded-xl border-2 bg-gray-50 text-gray-900 text-sm font-medium focus:outline-none focus:bg-white transition-all duration-200 placeholder:text-gray-400"
                          :class="errors.email ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-primary'"
                        />
                      </div>
                      <p v-if="errors.email" class="mt-1 text-xs text-red-500 font-semibold">{{ errors.email }}</p>
                    </div>
                    <div>
                      <label class="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5" for="phone">
                        Phone Number <span class="text-red-400">*</span>
                      </label>
                      <div class="relative">
                        <Icon name="mdi:phone-outline" class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg pointer-events-none" />
                        <input
                          id="phone"
                          v-model="form.phone"
                          type="tel"
                          placeholder="01XXXXXXXXX"
                          class="w-full pl-11 pr-4 py-3.5 rounded-xl border-2 bg-gray-50 text-gray-900 text-sm font-medium focus:outline-none focus:bg-white transition-all duration-200 placeholder:text-gray-400"
                          :class="errors.phone ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-primary'"
                        />
                      </div>
                      <p v-if="errors.phone" class="mt-1 text-xs text-red-500 font-semibold">{{ errors.phone }}</p>
                    </div>
                  </div>

                  <!-- Street Address -->
                  <div>
                    <label class="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5" for="address">
                      Street Address <span class="text-red-400">*</span>
                    </label>
                    <div class="relative">
                      <Icon name="mdi:home-outline" class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg pointer-events-none" />
                      <input
                        id="address"
                        v-model="form.street_address"
                        type="text"
                        placeholder="House, Road, Area"
                        class="w-full pl-11 pr-4 py-3.5 rounded-xl border-2 bg-gray-50 text-gray-900 text-sm font-medium focus:outline-none focus:bg-white transition-all duration-200 placeholder:text-gray-400"
                        :class="errors.street_address ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-primary'"
                      />
                    </div>
                    <p v-if="errors.street_address" class="mt-1 text-xs text-red-500 font-semibold">{{ errors.street_address }}</p>
                  </div>

                  <!-- City / Division / Postal -->
                  <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label class="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5" for="city">
                        City / Upazila <span class="text-red-400">*</span>
                      </label>
                      <input
                        id="city"
                        v-model="form.city"
                        type="text"
                        placeholder="Mirpur"
                        class="w-full px-4 py-3.5 rounded-xl border-2 bg-gray-50 text-gray-900 text-sm font-medium focus:outline-none focus:bg-white transition-all duration-200 placeholder:text-gray-400"
                        :class="errors.city ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-primary'"
                      />
                      <p v-if="errors.city" class="mt-1 text-xs text-red-500 font-semibold">{{ errors.city }}</p>
                    </div>
                    <div>
                      <label class="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5" for="district">
                        Division <span class="text-red-400">*</span>
                      </label>
                      <select
                        id="district"
                        v-model="form.district"
                        class="w-full px-4 py-3.5 rounded-xl border-2 bg-gray-50 text-gray-900 text-sm font-medium focus:outline-none focus:bg-white transition-all duration-200 appearance-none cursor-pointer"
                        :class="errors.district ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-primary'"
                      >
                        <option value="" disabled>Select division</option>
                        <option v-for="div in divisions" :key="div" :value="div">{{ div }}</option>
                      </select>
                      <p v-if="errors.district" class="mt-1 text-xs text-red-500 font-semibold">{{ errors.district }}</p>
                    </div>
                    <div>
                      <label class="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5" for="postalCode">
                        Postal Code
                      </label>
                      <input
                        id="postalCode"
                        v-model="form.postcode"
                        type="text"
                        placeholder="1200"
                        maxlength="4"
                        class="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 bg-gray-50 text-gray-900 text-sm font-medium focus:outline-none focus:border-primary focus:bg-white transition-all duration-200 placeholder:text-gray-400"
                      />
                    </div>
                  </div>

                  <!-- Order Notes -->
                  <div>
                    <label class="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5" for="notes">
                      Order Notes <span class="text-gray-400 font-normal normal-case">(optional)</span>
                    </label>
                    <textarea
                      id="notes"
                      v-model="form.order_note"
                      rows="3"
                      placeholder="Delivery instructions, preferred time, etc."
                      class="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 bg-gray-50 text-gray-900 text-sm font-medium focus:outline-none focus:border-primary focus:bg-white transition-all duration-200 placeholder:text-gray-400 resize-none"
                    />
                  </div>

                  <!-- Submit -->
                  <button
                    type="submit"
                    class="w-full bg-gradient-to-r from-primary to-secondary text-black font-black py-4 rounded-xl hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2 text-sm uppercase tracking-widest mt-2"
                  >
                    <Icon name="mdi:arrow-right" class="text-xl" />
                    Continue to Payment
                  </button>
                </form>
              </div>
            </div>

            <!-- ── STEP 2: Payment ── -->
            <div v-else key="payment">

              <!-- Shipping Summary (editable) -->
              <div class="bg-gray-50 border border-gray-100 rounded-2xl p-5 mb-5 flex items-start justify-between gap-4">
                  <div class="flex items-start gap-3">
                    <Icon name="mdi:map-marker-check" class="text-primary text-2xl mt-0.5 flex-shrink-0" />
                    <div>
                      <p class="font-black text-gray-900">{{ form.first_name }} {{ form.last_name }}</p>
                      <p class="text-sm text-gray-500 mt-0.5">{{ form.street_address }}, {{ form.city }}, {{ form.district }}</p>
                      <p class="text-sm text-gray-500">{{ form.phone }} · {{ form.email }}</p>
                    </div>
                  </div>
                <button
                  @click="step = 'shipping'"
                  class="text-xs font-bold text-primary hover:text-secondary transition-colors flex-shrink-0 mt-0.5"
                >
                  Edit
                </button>
              </div>

              <!-- Payment Method Selection -->
              <div class="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 shadow-sm">
                <h2 class="font-black text-gray-900 text-xl mb-6 flex items-center gap-3">
                  <span class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon name="mdi:cash-register" class="text-primary text-lg" />
                  </span>
                  Select Payment Method
                </h2>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <!-- Cash on Delivery -->
                  <label 
                    class="relative flex flex-col p-5 cursor-pointer rounded-2xl border-2 transition-all duration-200"
                    :class="form.payment_method == 'cod' ? 'border-primary bg-primary/5' : 'border-gray-200 bg-white hover:border-gray-300'"
                  >
                    <input type="radio" name="payment_method" value="cod" v-model="form.payment_method" class="sr-only" />
                    <div class="flex items-center justify-between mb-2">
                      <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
                          <Icon name="mdi:truck-delivery-outline" class="text-orange-600 text-xl" />
                        </div>
                        <span class="font-black text-gray-900 text-sm">Cash on Delivery</span>
                      </div>
                      <div class="w-5 h-5 rounded-full border-2 flex items-center justify-center" :class="form.payment_method === 'cod' ? 'border-primary' : 'border-gray-300'">
                        <div v-if="form.payment_method == 'cod'" class="w-2.5 h-2.5 bg-primary rounded-full"></div>
                      </div>
                    </div>
                    <p class="text-xs text-gray-500 ml-[52px]">Pay with cash upon delivery.</p>
                  </label>

                  <!-- SSLCommerz -->
                  <label 
                    class="relative flex flex-col p-5 cursor-pointer rounded-2xl border-2 transition-all duration-200"
                    :class="form.payment_method == 'sslcommerz' ? 'border-primary bg-primary/5' : 'border-gray-200 bg-white hover:border-gray-300'"
                  >
                    <input type="radio" name="payment_method" value="sslcommerz" v-model="form.payment_method" class="sr-only" />
                    <div class="flex items-center justify-between mb-2">
                      <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0a4fa0] to-[#0e88e0] flex items-center justify-center shadow-md">
                          <img src="/images/sslcommarz.png" alt="Loomino" class="h-10 w-auto object-contain rounded-xl shadow-sm" />
                        </div>
                        <span class="font-black text-gray-900 text-sm">SSLCommerz</span>
                      </div>
                      <div class="w-5 h-5 rounded-full border-2 flex items-center justify-center" :class="form.payment_method === 'sslcommerz' ? 'border-primary' : 'border-gray-300'">
                        <div v-if="form.payment_method == 'sslcommerz'" class="w-2.5 h-2.5 bg-primary rounded-full"></div>
                      </div>
                    </div>
                    <p class="text-xs text-gray-500 ml-[52px]">Pay securely online.</p>
                  </label>
                </div>

                <!-- Selected Method Info -->
                <div v-if="form.payment_method == 'sslcommerz'" class="border-2 border-dashed border-gray-200 rounded-2xl p-6 mb-6 bg-gray-50">
                  <div class="flex items-center justify-between mb-5">
                    <p class="font-black text-gray-900 text-sm">SSLCommerz Gateway</p>
                    <div class="flex items-center gap-1.5 bg-green-50 border border-green-200 rounded-full px-3 py-1">
                      <div class="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span class="text-xs font-bold text-green-600">Secured</span>
                    </div>
                  </div>
                  <p class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Accepted Payment Methods</p>
                  <div class="flex flex-wrap gap-2">
                    <div v-for="method in ['bKash', 'Nagad', 'Rocket', 'Visa', 'MasterCard', 'DBBL Nexus', 'Dutch-Bangla', 'City Bank']"
                      :key="method"
                      class="flex items-center gap-1.5 bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-bold text-gray-600 shadow-sm"
                    >
                      <Icon name="mdi:credit-card-outline" class="text-sm text-primary" />
                      {{ method }}
                    </div>
                  </div>
                </div>
                
                <div v-if="form.payment_method === 'cod'" class="border-2 border-dashed border-gray-200 rounded-2xl p-6 mb-6 bg-gray-50 flex gap-4 items-center">
                    <Icon name="mdi:information-outline" class="text-orange-400 text-2xl flex-shrink-0" />
                    <p class="text-sm text-gray-600 font-medium">Please ensure you have the exact amount in cash when the delivery agent arrives. We will call you to confirm your order.</p>
                </div>

                <!-- Amount Confirmation -->
                <div class="bg-primary/5 border border-primary/20 rounded-xl px-5 py-4 mb-6 flex items-center justify-between">
                  <div>
                    <p class="text-xs font-bold text-gray-500 uppercase tracking-wider">Total to Pay</p>
                    <p class="text-3xl font-black text-gray-900 mt-0.5">
                      ৳{{ orderTotal.toFixed(2) }}
                    </p>
                  </div>
                  <div class="flex items-center gap-2 text-gray-400">
                    <Icon name="mdi:shield-check" class="text-2xl text-primary" />
                    <div class="text-xs font-semibold leading-tight">
                      <p>100%</p>
                      <p>Protected</p>
                    </div>
                  </div>
                </div>

                <!-- Pay Button -->
                <button
                  @click="placeOrder"
                  :disabled="loading"
                  class="w-full py-4 rounded-xl font-black text-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 transition-all duration-300 hover:-translate-y-0.5 shadow-lg disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none bg-gradient-to-r from-primary to-secondary"
                >
                  <Icon v-if="loading" name="mdi:loading" class="text-xl animate-spin" />
                  <Icon v-else-if="form.payment_method == 'cod'" name="mdi:check-circle-outline" class="text-xl" />
                  <Icon v-else name="mdi:lock-outline" class="text-xl" />
                  {{ loading ? 'Processing...' : (form.payment_method == 'cod' ? 'Confirm Order' : 'Pay with SSLCommerz') }}
                </button>

                <p class="text-center text-xs text-gray-400 mt-4 flex items-center justify-center gap-1.5">
                  <Icon name="mdi:shield-check-outline" class="text-sm text-green-500" />
                  Your transaction is secure and encrypted.
                </p>
              </div>
            </div>
          </Transition>
        </div>

        <!-- ═══════════════════════════════════════════════════════════ -->
        <!-- RIGHT: Order Summary -->
        <!-- ═══════════════════════════════════════════════════════════ -->
        <aside class="w-full lg:w-[380px] flex-shrink-0 space-y-4 lg:sticky lg:top-6">
          <!-- Order Items -->
          <div class="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
            <div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 class="font-black text-gray-900 flex items-center gap-2">
                <Icon name="mdi:cart-outline" class="text-primary text-xl" />
                Order Items
              </h3>
              <span class="text-xs font-black bg-primary/10 text-primary px-2.5 py-0.5 rounded-full">
                {{ cartCount }} item{{ cartCount !== 1 ? 's' : '' }}
              </span>
            </div>

            <!-- Item List -->
            <div class="divide-y divide-gray-50 max-h-72 overflow-y-auto">
              <div
                v-for="item in cartItems"
                :key="`${item.id}-${item.variant}`"
                class="flex items-center gap-3 px-5 py-4"
              >
                <!-- Image -->
                <div class="relative flex-shrink-0">
                  <div class="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 border border-gray-100">
                    <img
                      :src="item.image || item.image_url || '/images/placeholder.webp'"
                      :alt="item.name"
                      class="w-full h-full object-cover"
                    />
                  </div>
                  <span class="absolute -top-2 -right-2 w-5 h-5 bg-primary text-black text-[10px] font-black rounded-full flex items-center justify-center shadow">
                    {{ item.quantity }}
                  </span>
                </div>
                <!-- Info -->
                <div class="flex-1 min-w-0">
                  <p class="font-bold text-gray-900 text-sm line-clamp-1">{{ item.name }}</p>
                  <p v-if="item.variant" class="text-[11px] text-gray-400 font-semibold mt-0.5">{{ item.variant }}</p>
                </div>
                <!-- Price -->
                <p class="font-black text-gray-900 text-sm flex-shrink-0">
                  ৳{{ (item.price * item.quantity).toFixed(2) }}
                </p>
              </div>
            </div>
          </div>

          <!-- Coupon Code -->
          <div class="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <h3 class="font-bold text-gray-900 mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
              <Icon name="mdi:ticket-percent-outline" class="text-primary text-xl" />
              Apply Coupon
            </h3>
            <div v-if="promoApplied" class="flex items-center justify-between bg-green-50 border border-green-200 rounded-xl px-4 py-3">
              <div class="flex items-center gap-2">
                <Icon name="mdi:check-circle" class="text-green-500 text-lg" />
                <span class="font-bold text-green-700 text-sm italic">{{ String(couponCode).toUpperCase() }}</span>
              </div>
              <button @click="removeCoupon" class="text-red-400 hover:text-red-600 transition-colors text-xs font-bold">
                Remove
              </button>
            </div>
            <div v-else class="flex gap-2">
              <input
                v-model="couponCode"
                type="text"
                placeholder="Enter coupon code"
                class="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:border-primary focus:bg-white transition-all placeholder:text-gray-400"
                @keyup.enter="applyCoupon"
              />
              <button
                @click="applyCoupon"
                class="px-5 py-3 bg-gray-900 text-white font-bold text-sm rounded-xl hover:bg-primary hover:text-black transition-all duration-200 whitespace-nowrap"
              >
                Apply
              </button>
            </div>
          </div>

          <!-- Summary Card -->
          <div class="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <h3 class="font-black text-gray-900 text-lg mb-5 flex items-center gap-2">
              <Icon name="mdi:receipt-text-outline" class="text-primary text-xl" />
              Order Summary
            </h3>

            <div class="space-y-3 mb-6">
              <div class="flex justify-between text-sm">
                <span class="text-gray-500 font-medium">Subtotal ({{ cartCount }} item{{ cartCount !== 1 ? 's' : '' }})</span>
                <span class="font-bold text-gray-900">৳{{ cartTotal.toFixed(2) }}</span>
              </div>

              <div v-if="promoApplied" class="flex justify-between text-sm">
                <span class="text-green-600 font-medium flex items-center gap-1">
                  <Icon name="mdi:tag-outline" class="text-base" />
                  Coupon Discount
                </span>
                <span class="font-bold text-green-600">-৳{{ promoDiscount.toFixed(2) }}</span>
              </div>

              <div class="flex justify-between text-sm">
                <span class="text-gray-500 font-medium flex items-center gap-1">
                  <Icon name="mdi:truck-fast-outline" class="text-base" />
                  Shipping
                </span>
                <span v-if="freeShipping" class="font-bold text-green-600">FREE</span>
                <span v-else class="font-bold text-gray-900">৳{{ SHIPPING_COST.toFixed(2) }}</span>
              </div>

              <!-- Free shipping notice -->
              <div v-if="!freeShipping" class="bg-blue-50 border border-blue-100 rounded-xl px-4 py-2.5 flex items-center gap-2">
                <Icon name="mdi:information-outline" class="text-blue-400 text-sm flex-shrink-0" />
                <p class="text-[11px] text-blue-600 font-semibold">
                  Add ৳{{ (FREE_SHIPPING_THRESHOLD - cartTotal).toFixed(2) }} more for free shipping!
                </p>
              </div>

              <div class="border-t border-dashed border-gray-200 pt-3 flex justify-between">
                <span class="font-black text-gray-900 text-base">Order Total</span>
                <span class="font-black text-primary text-xl">৳{{ orderTotal.toFixed(2) }}</span>
              </div>
            </div>

            <!-- Trust badges -->
            <div class="grid grid-cols-4 gap-2 pt-4 border-t border-gray-100">
              <div
                v-for="badge in [
                  { icon: 'mdi:shield-check-outline', label: 'Secure' },
                  { icon: 'mdi:lock-outline', label: 'SSL' },
                  { icon: 'mdi:truck-delivery-outline', label: 'Fast' },
                  { icon: 'mdi:refresh', label: 'Returns' },
                ]"
                :key="badge.label"
                class="flex flex-col items-center gap-1 text-gray-400 text-[10px] font-bold text-center"
              >
                <Icon :name="badge.icon" class="text-lg" />
                {{ badge.label }}
              </div>
            </div>
          </div>

          <!-- Back to Cart -->
          <NuxtLink
            to="/cart"
            class="flex items-center justify-center gap-2 text-sm font-bold text-gray-500 hover:text-primary transition-colors group"
          >
            <Icon name="mdi:arrow-left" class="text-lg group-hover:-translate-x-1 transition-transform" />
            Back to Cart
          </NuxtLink>
        </aside>

      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(20px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>
