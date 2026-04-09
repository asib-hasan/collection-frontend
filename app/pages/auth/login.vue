<script setup lang="ts">
import { ref, reactive } from 'vue';
import { object, string, type InferType } from 'yup';
import type { FormSubmitEvent } from '#ui/types';

definePageMeta({ layout: "guest", middleware: "guest" });
useHead({ title: "Login – Loomino" });

const auth = useAuthStore();
const toast = useToast();

const schema = object({
  email: string().email("Invalid email").required("Email is required"),
  password: string().required("Password is required"),
});

type Schema = InferType<typeof schema>;

const state = reactive({
  email: '',
  password: '',
});

const form = ref();
const loading = ref(false);
const showPassword = ref(false);

async function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true;
  try {
    await auth.login(event.data);
    toast.add({ title: 'Welcome back!', color: 'success' });
    navigateTo('/dashboard');
  } catch (err: any) {
    const error = useApiError(err);
    if (error.isValidationError) {
      form.value?.setErrors(error.bag);
    } else {
      toast.add({
        title: "Login Failed",
        description: err.data?.message || "Invalid email or password.",
        icon: "i-mdi:alert-circle",
        color: 'error'
      });
    }
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="min-h-screen bg-background flex items-center justify-center px-4 py-8 md:py-16 relative overflow-hidden">
    <!-- Decorative blobs -->
    <div
      class="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
    <div
      class="absolute bottom-0 right-0 w-[400px] h-[400px] bg-secondary/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />

    <div class="w-full max-w-md relative z-10">
      <div class="text-center mb-4">
        <NuxtLink to="/" class="inline-flex flex-col items-center gap-2 group">
          <img src="/images/logo1.png" alt="Loomino" class="h-20 w-auto object-contain rounded-lg" />
          <span
            class="text-xs font-semibold uppercase tracking-widest text-gray-400 group-hover:text-primary transition-colors">Your
            Fashion Destination</span>
        </NuxtLink>
      </div>

      <div class="bg-white/80 backdrop-blur-xl border border-white shadow-2xl rounded-3xl p-6 sm:p-8 md:p-10">
        <h1 class="text-2xl font-black text-center text-gray-900 mb-1">Welcome back</h1>
        <p class="text-sm text-gray-500 text-center mb-8">Sign in to continue shopping</p>

        <UForm ref="form" :schema="schema" :state="state" @submit="onSubmit" class="space-y-6">
          <UFormField label="Email" name="email" size="lg">
            <UInput v-model="state.email" type="email" placeholder="you@example.com" icon="mdi:email-outline" size="xl"
              class="w-full" variant="subtle" />
          </UFormField>

          <UFormField label="Password" name="password" size="lg"
            :ui="{ label: 'w-full flex items-center justify-between' }">
            <template #label>
              <span>Password</span>
              <NuxtLink to="/auth/forget-password"
                class="text-xs font-semibold text-primary hover:text-secondary transition-colors">
                Forgot password?
              </NuxtLink>
            </template>
            <UInput v-model="state.password" :type="showPassword ? 'text' : 'password'" placeholder="••••••••"
              icon="mdi:lock-outline" size="xl" class="w-full" variant="subtle">
              <template #trailing>
                <UButton color="neutral" variant="ghost"
                  :icon="showPassword ? 'mdi:eye-off-outline' : 'mdi:eye-outline'" @click="showPassword = !showPassword"
                  class="mr-1" />
              </template>
            </UInput>
          </UFormField>

          <UButton type="submit" :loading="loading" block size="xl"
            class="bg-linear-to-r from-primary to-secondary text-black font-black py-4 rounded-xl hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 uppercase tracking-widest">
            Sign In
          </UButton>
        </UForm>

        <!-- Divider -->
        <div class="flex items-center gap-3 my-7">
          <div class="h-px flex-1 bg-gray-200" />
          <span class="text-xs font-bold text-gray-400 uppercase tracking-wider">or</span>
          <div class="h-px flex-1 bg-gray-200" />
        </div>

        <!-- Register link -->
        <p class="text-center text-sm text-gray-500">
          Don't have an account?
          <NuxtLink to="/auth/register" class="font-black text-gray-900 hover:text-primary transition-colors">
            Create one →
          </NuxtLink>
        </p>
      </div>

      <!-- Footer note -->
      <p class="text-center text-xs text-gray-400 mt-6">
        By continuing, you agree to our
        <NuxtLink to="/terms" class="underline hover:text-primary">Terms</NuxtLink> &
        <NuxtLink to="/privacy" class="underline hover:text-primary">Privacy Policy</NuxtLink>
      </p>
    </div>
  </div>
</template>
