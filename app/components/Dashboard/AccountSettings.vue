<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue';
import { useNuxtApp, navigateTo } from '#app';

const authStore = useAuthStore();
const toast = useToast();

const userData = ref({
  name: "Alexander Pierce",
  email: "alexander.pierce@example.com",
  phone: "+1 234 567 8900",
});

const user = computed(() => userData.value || {});

const loading = ref(false);
const passwordLoading = ref(false);

const showCurrentPassword = ref(false);
const showNewPassword = ref(false);
const showConfirmPassword = ref(false);

const form = ref({
  name: "",
  email: "",
  phone: "",
});

const initialForm = ref({ ...form.value });

const passwordForm = ref({
  current_password: "",
  password: "",
  password_confirmation: "",
});

// Initialize form with user data
onMounted(() => {
  if (user.value) {
    form.value.name = user.value.name || "";
    form.value.email = user.value.email || "";
    form.value.phone = user.value.phone || "";
    initialForm.value = { ...form.value };
  }
});

const isEmailEditable = ref(false);

const passwordsMatch = computed(() =>
  passwordForm.value.password === passwordForm.value.password_confirmation && passwordForm.value.password.length > 0
);

const hasFormChanges = computed(() => {
  return form.value.name !== initialForm.value.name ||
    form.value.phone !== initialForm.value.phone ||
    form.value.email !== initialForm.value.email;
});

const updateProfile = async () => {
  const { $api } = useNuxtApp();
  try {
    loading.value = true;
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast.add({
      title: "Success",
      description: "Profile updated successfully!",
      color: "primary"
    });
    initialForm.value = { ...form.value };

  } catch (error: any) {
    toast.add({
      title: "Error",
      description: error.data?.message || "Failed to update profile",
      color: "error"
    });
  } finally {
    loading.value = false;
  }
};

const updatePassword = async () => {
  const { $api } = useNuxtApp();
  try {
    passwordLoading.value = true;

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast.add({
      title: "Success",
      description: "Password changed successfully! Please login again.",
      color: "primary"
    });

    Object.assign(passwordForm.value, {
      current_password: "",
      password: "",
      password_confirmation: "",
    });

    await authStore.logout();
    navigateTo("/auth/login");

  } catch (error: any) {
    toast.add({
      title: "Error",
      description: error.data?.message || "Failed to change password",
      color: "error"
    });
  } finally {
    passwordLoading.value = false;
  }
};
</script>

<template>
  <div class="h-full flex flex-col">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 pb-4 border-b border-gray-100">
      <div class="flex items-center gap-4">
        <div class="w-10 h-10 flex items-center justify-center border border-gray-200 text-[#111]">
          <Icon name="mdi:account-outline" class="text-xl" />
        </div>
        <div>
          <h2 class="font-cinzel text-2xl tracking-widest text-[#111] uppercase">Account Settings</h2>
          <p class="font-jost text-[13px] text-gray-500 tracking-wide mt-1">Manage your personal details and security preferences.</p>
        </div>
      </div>
    </div>

    <div class="space-y-16 max-w-3xl">
      <!-- Profile Information Section -->
      <section>
        <div class="flex items-center gap-3 mb-8">
          <h3 class="font-cinzel text-lg tracking-widest text-[#111] uppercase">Personal Information</h3>
          <div class="flex-1 h-px bg-gray-100"></div>
        </div>

        <form @submit.prevent="updateProfile" class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
          <div class="space-y-3">
            <label class="block font-jost text-[11px] font-medium tracking-[2px] text-[#111] uppercase">Full Name</label>
            <div class="relative">
              <input v-model="form.name" type="text"
                class="w-full bg-transparent border-b border-gray-300 py-3 font-jost text-[15px] text-[#111] focus:outline-none focus:border-[#d4929f] transition-colors rounded-none px-0 placeholder-gray-400" placeholder="Your name" />
            </div>
          </div>

          <div class="space-y-3">
            <label class="flex justify-between items-center font-jost text-[11px] font-medium tracking-[2px] text-[#111] uppercase">
              <span>Email Address</span>
              <button 
                type="button" 
                @click="isEmailEditable = !isEmailEditable"
                class="text-[#d4929f] hover:text-[#111] transition-colors underline decoration-transparent hover:decoration-[#111] underline-offset-4"
              >
                {{ isEmailEditable ? 'Cancel' : 'Change' }}
              </button>
            </label>
            <div class="relative">
              <input 
                v-model="form.email" 
                type="email" 
                :disabled="!isEmailEditable"
                class="w-full bg-transparent border-b py-3 font-jost text-[15px] focus:outline-none transition-colors rounded-none px-0"
                :class="!isEmailEditable ? 'border-gray-200 text-gray-400 cursor-not-allowed' : 'border-gray-300 text-[#111] focus:border-[#d4929f]'"
              />
            </div>
          </div>

          <div class="space-y-3">
            <label class="block font-jost text-[11px] font-medium tracking-[2px] text-[#111] uppercase">Phone Number</label>
            <div class="relative">
              <input v-model="form.phone" type="tel"
                class="w-full bg-transparent border-b border-gray-300 py-3 font-jost text-[15px] text-[#111] focus:outline-none focus:border-[#d4929f] transition-colors rounded-none px-0 placeholder-gray-400" placeholder="Your phone" />
            </div>
          </div>

          <div class="md:col-span-2 flex justify-start mt-4">
            <button type="submit" :disabled="loading || !hasFormChanges"
              class="px-10 py-4 bg-[#111] text-white font-jost text-[12px] font-medium tracking-[2px] uppercase border border-[#111] hover:bg-transparent hover:text-[#111] transition-colors disabled:opacity-30 disabled:hover:bg-[#111] disabled:hover:text-white flex items-center gap-3">
              <Icon v-if="loading" name="mdi:loading" class="animate-spin text-base" />
              {{ loading ? 'Saving...' : 'Save Changes' }}
            </button>
          </div>
        </form>
      </section>

      <!-- Security Section -->
      <section>
        <div class="flex items-center gap-3 mb-8">
          <h3 class="font-cinzel text-lg tracking-widest text-[#111] uppercase">Security &amp; Password</h3>
          <div class="flex-1 h-px bg-gray-100"></div>
        </div>

        <form @submit.prevent="updatePassword" class="space-y-8">

          <div class="space-y-3">
            <label class="block font-jost text-[11px] font-medium tracking-[2px] text-[#111] uppercase">Current Password</label>
            <div class="relative max-w-md">
              <input v-model="passwordForm.current_password" :type="showCurrentPassword ? 'text' : 'password'" required
                class="w-full bg-transparent border-b border-gray-300 py-3 font-jost text-[15px] text-[#111] focus:outline-none focus:border-[#d4929f] transition-colors rounded-none px-0 pr-10" />
              <button type="button" @click="showCurrentPassword = !showCurrentPassword"
                class="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#111] transition-colors">
                <Icon :name="showCurrentPassword ? 'mdi:eye-off-outline' : 'mdi:eye-outline'" class="text-lg" />
              </button>
            </div>
          </div>

          <div class="space-y-3">
            <label class="block font-jost text-[11px] font-medium tracking-[2px] text-[#111] uppercase">New Password</label>
            <div class="relative max-w-md">
              <input v-model="passwordForm.password" :type="showNewPassword ? 'text' : 'password'" required minlength="8"
                class="w-full bg-transparent border-b border-gray-300 py-3 font-jost text-[15px] text-[#111] focus:outline-none focus:border-[#d4929f] transition-colors rounded-none px-0 pr-10" />
              <button type="button" @click="showNewPassword = !showNewPassword"
                class="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#111] transition-colors">
                <Icon :name="showNewPassword ? 'mdi:eye-off-outline' : 'mdi:eye-outline'" class="text-lg" />
              </button>
            </div>
          </div>

          <div class="space-y-3">
            <label class="block font-jost text-[11px] font-medium tracking-[2px] text-[#111] uppercase">Confirm New Password</label>
            <div class="relative max-w-md">
              <input v-model="passwordForm.password_confirmation" :type="showConfirmPassword ? 'text' : 'password'" required minlength="8"
                class="w-full bg-transparent border-b border-gray-300 py-3 font-jost text-[15px] text-[#111] focus:outline-none focus:border-[#d4929f] transition-colors rounded-none px-0 pr-10" />
              <button type="button" @click="showConfirmPassword = !showConfirmPassword"
                class="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#111] transition-colors">
                <Icon :name="showConfirmPassword ? 'mdi:eye-off-outline' : 'mdi:eye-outline'" class="text-lg" />
              </button>
            </div>

            <p v-if="passwordForm.password_confirmation" class="font-jost text-[11px] tracking-[1px] uppercase mt-2"
              :class="passwordsMatch ? 'text-green-600' : 'text-red-500'">
              {{ passwordsMatch ? 'Passwords match' : 'Passwords do not match' }}
            </p>
          </div>

          <div class="mt-8">
            <button type="submit" :disabled="passwordLoading || !passwordsMatch || !passwordForm.current_password"
              class="px-10 py-4 bg-[#111] text-white font-jost text-[12px] font-medium tracking-[2px] uppercase border border-[#111] hover:bg-transparent hover:text-[#111] transition-colors disabled:opacity-30 disabled:hover:bg-[#111] disabled:hover:text-white flex items-center gap-3">
              <Icon v-if="passwordLoading" name="mdi:loading" class="animate-spin text-base" />
              {{ passwordLoading ? 'Updating...' : 'Update Password' }}
            </button>
          </div>
        </form>
      </section>

    </div>
  </div>
</template>
