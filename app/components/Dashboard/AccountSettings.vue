<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue';
import { useNuxtApp, navigateTo } from '#app';

const authStore = useAuthStore();
const toast = useToast();

const { data: userData, refresh } = await useAPI<any>(
  `/frontend/v1/customer/${(authStore.user as any)?.id}`
);

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
    await $api(`/frontend/v1/customer/${(authStore.user as any)?.id}`, {
      method: "POST",
      params: { _method: "PUT" },
      body: {
        name: form.value.name,
        phone: form.value.phone,
        email: form.value.email
      },
    });

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

    const payload = {
      old_password: passwordForm.value.current_password,
      new_password: passwordForm.value.password,
      new_password_confirmation: passwordForm.value.password_confirmation,
    };

    await $api(`/frontend/v1/customer/${(authStore.user as any)?.id}`, {
      method: "POST",
      params: { _method: "PUT" },
      body: payload,
    });

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
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
      <div class="flex items-center gap-3">
        <div class="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Icon name="ph:gear-duotone" class="text-primary text-2xl" />
        </div>
        <div>
          <h2 class="text-2xl font-black text-gray-900">Account Settings</h2>
          <p class="text-sm text-gray-500 font-medium mt-0.5">Manage your personal details and security preferences.</p>
        </div>
      </div>
    </div>

    <div class="space-y-12">
      <!-- Profile Information Section -->
      <section>
        <div class="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
          <Icon name="ph:user-circle-bold" class="text-primary text-xl" />
          <h3 class="text-lg font-black text-gray-900 uppercase tracking-widest">Personal Information</h3>
        </div>

        <form @submit.prevent="updateProfile" class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <div class="space-y-2">
            <label class="block text-[10px] font-black text-gray-900 uppercase tracking-widest">Full Name</label>
            <div class="relative">
              <Icon name="ph:user" class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input v-model="form.name" type="text"
                class="w-full pl-11 pr-4 py-3.5 rounded-xl border-2 border-gray-100 focus:border-primary focus:ring-4 focus:ring-primary/10 text-sm font-bold bg-white outline-none transition-all placeholder-gray-400" />
            </div>
          </div>

          <div class="space-y-2">
            <label class="block text-[10px] font-black text-gray-900 uppercase tracking-widest leading-loose flex justify-between items-center mr-1">
              <span>Email Address</span>
              <button 
                type="button" 
                @click="isEmailEditable = !isEmailEditable"
                class="text-[10px] text-primary hover:underline font-black uppercase tracking-widest"
              >
                {{ isEmailEditable ? 'Cancel' : 'Change Email' }}
              </button>
            </label>
            <div class="relative">
              <Icon name="ph:envelope" class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                v-model="form.email" 
                type="email" 
                :disabled="!isEmailEditable"
                class="w-full pl-11 pr-4 py-3.5 rounded-xl border-2 transition-all outline-none text-sm font-bold"
                :class="!isEmailEditable ? 'bg-gray-50 border-gray-100 text-gray-500 cursor-not-allowed' : 'bg-white border-primary focus:ring-4 focus:ring-primary/10 text-gray-900'"
              />
            </div>
          </div>

          <div class="space-y-2">
            <label class="block text-[10px] font-black text-gray-900 uppercase tracking-widest">Phone Number</label>
            <div class="relative">
              <Icon name="ph:phone" class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input v-model="form.phone" type="tel"
                class="w-full pl-11 pr-4 py-3.5 rounded-xl border-2 border-gray-100 focus:border-primary focus:ring-4 focus:ring-primary/10 text-sm font-bold bg-white outline-none transition-all placeholder-gray-400" />
            </div>
          </div>

          <div class="md:col-span-2 flex justify-end mt-4">
            <button type="submit" :disabled="loading || !hasFormChanges"
              class="px-8 py-3.5 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-black uppercase tracking-widest shadow-lg shadow-primary/30 hover:shadow-xl active:scale-95 transition-all text-xs disabled:opacity-50 disabled:scale-100 flex items-center gap-2">
              <Icon v-if="loading" name="ph:spinner-gap" class="animate-spin text-base" />
              <Icon v-else name="ph:floppy-disk-back-fill" class="text-base" />
              {{ loading ? 'Saving...' : 'Save Profile Changes' }}
            </button>
          </div>
        </form>
      </section>

      <!-- Security Section -->
      <section>
        <div class="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
          <Icon name="ph:lock-key-bold" class="text-primary text-xl" />
          <h3 class="text-lg font-black text-gray-900 uppercase tracking-widest">Security &amp; Password</h3>
        </div>

        <form @submit.prevent="updatePassword"
          class="bg-gray-50 p-6 md:p-8 rounded-3xl border border-gray-100 max-w-2xl">

          <div class="space-y-5">
            <div class="space-y-2">
              <label class="block text-[10px] font-black text-gray-900 uppercase tracking-widest">Current
                Password</label>
              <div class="relative">
                <Icon name="ph:lock" class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input v-model="passwordForm.current_password" :type="showCurrentPassword ? 'text' : 'password'"
                  required
                  class="w-full pl-11 pr-12 py-3.5 rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 text-sm font-bold bg-white outline-none transition-all" />
                <button type="button" @click="showCurrentPassword = !showCurrentPassword"
                  class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors">
                  <Icon :name="showCurrentPassword ? 'ph:eye-slash-bold' : 'ph:eye-bold'" class="text-lg" />
                </button>
              </div>
            </div>

            <div class="space-y-2">
              <label class="block text-[10px] font-black text-gray-900 uppercase tracking-widest">New Password</label>
              <div class="relative">
                <Icon name="ph:lock-key" class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input v-model="passwordForm.password" :type="showNewPassword ? 'text' : 'password'" required
                  minlength="8"
                  class="w-full pl-11 pr-12 py-3.5 rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 text-sm font-bold bg-white outline-none transition-all" />
                <button type="button" @click="showNewPassword = !showNewPassword"
                  class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors">
                  <Icon :name="showNewPassword ? 'ph:eye-slash-bold' : 'ph:eye-bold'" class="text-lg" />
                </button>
              </div>
            </div>

            <div class="space-y-2">
              <label class="block text-[10px] font-black text-gray-900 uppercase tracking-widest">Confirm New
                Password</label>
              <div class="relative">
                <Icon name="ph:check-square-offset" class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input v-model="passwordForm.password_confirmation" :type="showConfirmPassword ? 'text' : 'password'"
                  required minlength="8"
                  class="w-full pl-11 pr-12 py-3.5 rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 text-sm font-bold bg-white outline-none transition-all" />
                <button type="button" @click="showConfirmPassword = !showConfirmPassword"
                  class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors">
                  <Icon :name="showConfirmPassword ? 'ph:eye-slash-bold' : 'ph:eye-bold'" class="text-lg" />
                </button>
              </div>

              <p v-if="passwordForm.password_confirmation" class="text-[10px] font-black uppercase tracking-widest mt-1"
                :class="passwordsMatch ? 'text-green-500' : 'text-red-500'">
                <Icon :name="passwordsMatch ? 'ph:check-circle-fill' : 'ph:x-circle-fill'" class="mb-0.5 inline" />
                {{ passwordsMatch ? 'Passwords match' : 'Passwords do not match' }}
              </p>
            </div>
          </div>

          <div class="mt-8">
            <button type="submit" :disabled="passwordLoading || !passwordsMatch || !passwordForm.current_password"
              class="w-full sm:w-auto px-8 py-3.5 bg-gray-900 text-white rounded-xl font-black uppercase tracking-widest shadow-lg hover:shadow-xl hover:bg-gray-800 active:scale-95 transition-all text-xs disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-2">
              <Icon v-if="passwordLoading" name="ph:spinner-gap" class="animate-spin text-base" />
              <Icon v-else name="ph:shield-check-fill" class="text-base" />
              {{ passwordLoading ? 'Updating...' : 'Update Password' }}
            </button>
          </div>
        </form>
      </section>

    </div>
  </div>
</template>
