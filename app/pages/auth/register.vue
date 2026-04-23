<script setup>
import { ref, reactive } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { useRouter } from 'vue-router';

useHead({ title: "Create Account - CCollection" });

const authStore = useAuthStore();
const router = useRouter();

const step = ref(1);
const loading = ref(false);
const errorMsg = ref('');
const fieldErrors = ref({});

const registerForm = reactive({
  email: '',
  name: '',
  phone: '',
  password: '',
  password_confirmation: ''
});

const otpInput = ref('');
const MOCK_OTP = '12345';

const nextStep = () => {
  errorMsg.value = '';
  fieldErrors.value = {};
  
  if (step.value === 1) {
    if (!registerForm.email) {
      fieldErrors.value = { email: ['Email address is required.'] };
      return;
    }
    // Simulate sending OTP
    loading.value = true;
    setTimeout(() => {
      loading.value = false;
      step.value = 2;
    }, 800);
  } else if (step.value === 2) {
    if (otpInput.value !== MOCK_OTP) {
      errorMsg.value = 'Invalid OTP code. For this demo, please use 12345.';
      return;
    }
    loading.value = true;
    setTimeout(() => {
      loading.value = false;
      step.value = 3;
    }, 500);
  }
};

const handleRegister = async () => {
  try {
    loading.value = true;
    errorMsg.value = '';
    fieldErrors.value = {};
    const payload = {
      ...registerForm,
      phone: registerForm.phone.startsWith('+880') ? registerForm.phone : `+880${registerForm.phone.replace(/^0+/, '')}`
    };
    await authStore.register(payload);
    router.push('/');
  } catch (err) {
    if (err.response?.data?.errors) {
      fieldErrors.value = err.response.data.errors;
    } else if (err.data?.errors) {
      fieldErrors.value = err.data.errors;
    } else {
      errorMsg.value = err.data?.message || err.message || 'Registration failed. Please try again.';
    }
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="auth-page min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#fbfaf8]">
    <div class="w-full max-w-lg bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8 sm:p-10 animate-fade-in-up relative overflow-hidden">
      
      <!-- Minimalist Header -->
      <div class="text-center mb-8">
        <img src="/images/logo-transparent.png" alt="CCollection Logo" class="h-16 mx-auto mb-4 object-contain mix-blend-multiply" />
        <p class="font-jost text-gray-500 text-sm tracking-widest uppercase">
          <span v-if="step === 1">Create Account</span>
          <span v-else-if="step === 2">Verify Email</span>
          <span v-else>Complete Profile</span>
        </p>
      </div>

      <!-- Step Indicator -->
      <div class="flex items-center justify-center mb-10 space-x-4">
        <div class="flex items-center">
          <div :class="['w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-colors', step >= 1 ? 'bg-[#d4929f] text-white' : 'bg-gray-100 text-gray-400']">1</div>
        </div>
        <div :class="['h-px w-8 transition-colors', step >= 2 ? 'bg-[#d4929f]' : 'bg-gray-200']"></div>
        <div class="flex items-center">
          <div :class="['w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-colors', step >= 2 ? 'bg-[#d4929f] text-white' : 'bg-gray-100 text-gray-400']">2</div>
        </div>
        <div :class="['h-px w-8 transition-colors', step >= 3 ? 'bg-[#d4929f]' : 'bg-gray-200']"></div>
        <div class="flex items-center">
          <div :class="['w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-colors', step >= 3 ? 'bg-[#d4929f] text-white' : 'bg-gray-100 text-gray-400']">3</div>
        </div>
      </div>

      <!-- General Error Message -->
      <Transition name="fade">
        <div v-if="errorMsg" class="mb-6 p-4 rounded bg-red-50 border border-red-100 text-red-600 text-sm font-jost flex items-start gap-3">
          <span class="iconify mt-0.5 shrink-0" data-icon="lucide:alert-circle"></span>
          <span>{{ errorMsg }}</span>
        </div>
      </Transition>

      <div class="relative min-h-[220px]">
        <Transition name="slide-fade" mode="out-in">
          
          <!-- Step 1: Email -->
          <div v-if="step === 1" key="step1">
            <form @submit.prevent="nextStep" class="space-y-6">
              <div class="form-group">
                <label class="block font-jost text-[11px] font-medium tracking-widest uppercase text-gray-500 mb-2">Email Address *</label>
                <input 
                  v-model="registerForm.email" 
                  type="email" 
                  required 
                  class="minimal-input w-full"
                  placeholder="Enter your email"
                />
                <p v-if="fieldErrors.email" class="text-xs text-red-500 mt-1.5">{{ fieldErrors.email[0] }}</p>
              </div>

              <button type="submit" :disabled="loading" class="cc-btn w-full mt-8 group">
                <span v-if="!loading" class="flex items-center justify-center gap-2">
                  CONTINUE
                </span>
                <span v-else class="flex items-center justify-center gap-2">
                  <span class="iconify animate-spin" data-icon="lucide:loader-2"></span>
                  SENDING OTP...
                </span>
              </button>
            </form>
          </div>

          <!-- Step 2: Verify OTP -->
          <div v-else-if="step === 2" key="step2">
            <form @submit.prevent="nextStep" class="space-y-6">
              <div class="text-center mb-6">
                <p class="text-sm text-gray-500 font-jost">We sent a verification code to <br><strong class="text-[#111]">{{ registerForm.email }}</strong></p>
              </div>
              <div class="form-group">
                <label class="block font-jost text-[11px] font-medium tracking-widest uppercase text-gray-500 mb-2 text-center">Enter 5-digit OTP *</label>
                <input 
                  v-model="otpInput" 
                  type="text" 
                  maxlength="5"
                  required 
                  class="minimal-input w-full text-center tracking-[0.5em] text-lg font-semibold"
                  placeholder="12345"
                />
              </div>

              <div class="flex gap-3 mt-8">
                <button type="button" @click="step = 1" class="cc-btn outline w-1/3 text-center !px-0">
                  BACK
                </button>
                <button type="submit" :disabled="loading" class="cc-btn w-2/3 group">
                  <span v-if="!loading" class="flex items-center justify-center gap-2">
                    VERIFY
                  </span>
                  <span v-else class="flex items-center justify-center gap-2">
                    <span class="iconify animate-spin" data-icon="lucide:loader-2"></span>
                    VERIFYING...
                  </span>
                </button>
              </div>
            </form>
          </div>

          <!-- Step 3: Registration Info -->
          <div v-else-if="step === 3" key="step3">
            <form @submit.prevent="handleRegister" class="space-y-5">
              <div class="form-group">
                <label class="block font-jost text-[11px] font-medium tracking-widest uppercase text-gray-500 mb-2">Full Name *</label>
                <input 
                  v-model="registerForm.name" 
                  type="text" 
                  required 
                  class="minimal-input w-full"
                />
                <p v-if="fieldErrors.name" class="text-xs text-red-500 mt-1.5">{{ fieldErrors.name[0] }}</p>
              </div>

              <div class="form-group">
                <label class="block font-jost text-[11px] font-medium tracking-widest uppercase text-gray-500 mb-2">Phone Number *</label>
                <div class="flex">
                  <span class="inline-flex items-center px-4 rounded-l border border-r-0 border-[#e5e7eb] bg-gray-50 text-[#111] font-jost text-[15px]">
                    +880
                  </span>
                  <input 
                    v-model="registerForm.phone" 
                    type="tel" 
                    required 
                    class="minimal-input w-full"
                    style="border-top-left-radius: 0; border-bottom-left-radius: 0;"
                    placeholder="1XXXXXXXXX"
                  />
                </div>
                <p v-if="fieldErrors.phone" class="text-xs text-red-500 mt-1.5">{{ fieldErrors.phone[0] }}</p>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div class="form-group">
                  <label class="block font-jost text-[11px] font-medium tracking-widest uppercase text-gray-500 mb-2">Password *</label>
                  <input 
                    v-model="registerForm.password" 
                    type="password" 
                    required 
                    class="minimal-input w-full"
                  />
                  <p v-if="fieldErrors.password" class="text-xs text-red-500 mt-1.5">{{ fieldErrors.password[0] }}</p>
                </div>

                <div class="form-group">
                  <label class="block font-jost text-[11px] font-medium tracking-widest uppercase text-gray-500 mb-2">Confirm Password *</label>
                  <input 
                    v-model="registerForm.password_confirmation" 
                    type="password" 
                    required 
                    class="minimal-input w-full"
                  />
                </div>
              </div>

              <div class="flex gap-3 mt-8">
                <button type="submit" :disabled="loading" class="cc-btn w-full group">
                  <span v-if="!loading" class="flex items-center justify-center gap-2">
                    COMPLETE REGISTRATION
                  </span>
                  <span v-else class="flex items-center justify-center gap-2">
                    <span class="iconify animate-spin" data-icon="lucide:loader-2"></span>
                    PROCESSING...
                  </span>
                </button>
              </div>
            </form>
          </div>
        </Transition>
      </div>

      <div class="text-center mt-6 pt-6 border-t border-gray-100" v-if="step === 1">
        <p class="font-jost text-sm text-gray-500">
          Already have an account? 
          <NuxtLink to="/auth/login" class="text-[#111] font-medium hover:text-[#d4929f] transition-colors">Sign in</NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>

/* Minimalist Inputs */
.minimal-input {
  background-color: #fff;
  border: 1px solid #e5e7eb;
  color: #111;
  padding: 14px 16px;
  border-radius: 4px;
  font-family: 'Jost', sans-serif;
  font-size: 15px;
  transition: all 0.3s ease;
  outline: none;
}

.minimal-input:focus {
  border-color: #d4929f;
  box-shadow: 0 0 0 1px #d4929f;
}

/* Primary Button */
.cc-btn {
  background-color: #d4929f;
  color: #fff;
  border: 1px solid #d4929f;
  padding: 16px 24px;
  font-size: 13px;
  letter-spacing: 2px;
  font-weight: 500;
  text-transform: uppercase;
  font-family: 'Jost', sans-serif;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 4px;
}

.cc-btn:hover:not(:disabled) {
  background-color: transparent;
  color: #d4929f;
}

.cc-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.cc-btn.outline {
  background-color: transparent;
  color: #111;
  border-color: #e5e7eb;
}

.cc-btn.outline:hover:not(:disabled) {
  border-color: #d4929f;
  color: #d4929f;
}

/* Animations */
.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
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

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}
.slide-fade-leave-active {
  transition: all 0.2s ease-in;
}
.slide-fade-enter-from {
  transform: translateX(10px);
  opacity: 0;
}
.slide-fade-leave-to {
  transform: translateX(-10px);
  opacity: 0;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
