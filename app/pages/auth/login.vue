<script setup>
import { ref, reactive } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { useRouter } from 'vue-router';

useHead({ title: "Sign In - CCollection" });

const authStore = useAuthStore();
const router = useRouter();

const loading = ref(false);
const errorMsg = ref('');
const fieldErrors = ref({});

const loginForm = reactive({
  email: '',
  password: ''
});

const handleLogin = async () => {
  try {
    loading.value = true;
    errorMsg.value = '';
    fieldErrors.value = {};
    
    // Mocking the login for now to jump straight to the dashboard
    authStore.$patch({
      loggedIn: true,
      accessToken: 'mock_token_123',
      user: {
        id: 1,
        name: 'Guest User',
        email: loginForm.email || 'guest@ccollection.com',
        phone: '+1 234 567 8900',
        avatar: null
      }
    });
    
    router.push('/dashboard'); 
  } catch (err) {
    if (err.response?.data?.errors) {
      fieldErrors.value = err.response.data.errors;
    } else {
      errorMsg.value = err.data?.message || err.message || 'Invalid credentials. Please try again.';
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
      <div class="text-center mb-10">
        <img src="/images/logo-transparent.png" alt="CCollection Logo" class="h-16 mx-auto mb-4 object-contain mix-blend-multiply" />
        <p class="font-jost text-gray-500 text-sm tracking-widest uppercase">Sign In to Your Account</p>
      </div>

      <!-- General Error Message -->
      <Transition name="fade">
        <div v-if="errorMsg" class="mb-6 p-4 rounded bg-red-50 border border-red-100 text-red-600 text-sm font-jost flex items-start gap-3">
          <span class="iconify mt-0.5 shrink-0" data-icon="lucide:alert-circle"></span>
          <span>{{ errorMsg }}</span>
        </div>
      </Transition>

      <form @submit.prevent="handleLogin" class="space-y-6">
        
        <div class="form-group">
          <label class="block font-jost text-[11px] font-medium tracking-widest uppercase text-gray-500 mb-2">Email Address *</label>
          <input 
            v-model="loginForm.email" 
            type="email" 
            required 
            class="minimal-input w-full"
          />
          <p v-if="fieldErrors.email" class="text-xs text-red-500 mt-1.5">{{ fieldErrors.email[0] }}</p>
        </div>

        <div class="form-group">
          <div class="flex justify-between items-center mb-2">
            <label class="block font-jost text-[11px] font-medium tracking-widest uppercase text-gray-500">Password *</label>
            <NuxtLink to="/auth/forgot-password" class="font-jost text-xs text-gray-400 hover:text-[#d4929f] transition-colors">Forgot Password?</NuxtLink>
          </div>
          <input 
            v-model="loginForm.password" 
            type="password" 
            required 
            class="minimal-input w-full"
          />
          <p v-if="fieldErrors.password" class="text-xs text-red-500 mt-1.5">{{ fieldErrors.password[0] }}</p>
        </div>

        <button type="submit" :disabled="loading" class="cc-btn w-full mt-8 group">
          <span v-if="!loading" class="flex items-center justify-center gap-2">
            SIGN IN
          </span>
          <span v-else class="flex items-center justify-center gap-2">
            <span class="iconify animate-spin" data-icon="lucide:loader-2"></span>
            PROCESSING...
          </span>
        </button>

        <div class="text-center mt-6">
          <p class="font-jost text-sm text-gray-500">
            Don't have an account? 
            <NuxtLink to="/auth/register" class="text-[#111] font-medium hover:text-[#d4929f] transition-colors">Create one</NuxtLink>
          </p>
        </div>
      </form>
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

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
