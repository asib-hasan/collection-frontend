<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { object, string, boolean, ref as yupRef, type InferType } from 'yup';
import type { FormSubmitEvent } from '#ui/types';

definePageMeta({ layout: 'guest', middleware: 'guest' });
useHead({ title: 'Create Account – Loomino' });

const auth = useAuthStore();
const toast = useToast();

const schema = object({
  name: string().required('Full name is required'),
  email: string().email('Invalid email').required('Email is required'),
  phone: string().min(11, 'Phone number must be at least 11 digits').required('Phone number is required'),
  password: string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  confirmPassword: string().oneOf([yupRef('password')], 'Passwords must match').required('Please confirm your password'),
  agree: boolean().oneOf([true], 'You must agree to the terms and privacy policy').required(),
});

type Schema = InferType<typeof schema>;

const state = reactive({
  name: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  agree: false,
});

const form = ref();
const loading = ref(false);
const showPassword = ref(false);
const showConfirm = ref(false);

const passwordStrength = computed(() => {
  const p = state.password;
  if (!p) return 0;
  let score = 0;
  if (p.length >= 8) score++;
  if (/[A-Z]/.test(p)) score++;
  if (/[0-9]/.test(p)) score++;
  if (/[^A-Za-z0-9]/.test(p)) score++;
  return score;
});

const strengthLabel = computed(() => ['', 'Weak', 'Fair', 'Good', 'Strong'][passwordStrength.value]);
const strengthColor = computed(() => ['', 'bg-red-500', 'bg-yellow-400', 'bg-blue-400', 'bg-green-500'][passwordStrength.value]);

async function onRegister(event: FormSubmitEvent<Schema>) {
  loading.value = true;
  try {
    await auth.register(event.data);
    toast.add({ title: 'Account Created!', description: 'Welcome to Loomino 🎉', color: 'success' });
    navigateTo('/dashboard');
  } catch (err: any) {
    const error = useApiError(err);
    if (error.isValidationError) {
      form.value?.setErrors(error.bag);
    } else {
      toast.add({
        title: "Registration Failed",
        description: err.data?.message || "Something went wrong. Please try again.",
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
  <div class="min-h-screen bg-background flex items-center justify-center px-4 py-16 relative overflow-hidden">

    <!-- Decorative blobs -->
    <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none" />
    <div class="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/20 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2 pointer-events-none" />

    <div class="w-full max-w-md relative z-10">

      <!-- Logo / brand -->
      <div class="text-center mb-4">
        <NuxtLink to="/" class="inline-flex flex-col items-center gap-2 group">
          <img
              src="/images/logo1.png"
              alt="Loomino"
              class="h-20 w-auto object-contain rounded-lg"
            />
          <span class="text-xs font-semibold uppercase tracking-widest text-gray-400 group-hover:text-primary transition-colors">Your Fashion Destination</span>
        </NuxtLink>
      </div>

      <!-- Card -->
      <div class="bg-white/95 backdrop-blur-3xl rounded-[2rem] shadow-2xl overflow-hidden border border-white p-6 sm:p-8 pt-8 sm:pt-10">

        <h1 class="text-2xl font-black text-center text-gray-900 mb-1">Create an account</h1>
        <p class="text-sm text-gray-500 text-center mb-8">Join thousands of happy shoppers</p>

        <UForm ref="form" :schema="schema" :state="state" @submit="onRegister" class="space-y-6">
          <UFormField label="Full Name" name="name" size="lg">
            <UInput
              v-model="state.name"
              type="text"
              placeholder="Your full name"
              icon="mdi:account-outline"
              size="xl"
              class="w-full"
              variant="subtle"
            />
          </UFormField>

          <UFormField label="Email" name="email" size="lg">
            <UInput
              v-model="state.email"
              type="email"
              placeholder="you@example.com"
              icon="mdi:email-outline"
              size="xl"
              class="w-full"
              variant="subtle"
            />
          </UFormField>

          <UFormField label="Phone" name="phone" size="lg">
            <UInput
              v-model="state.phone"
              type="tel"
              placeholder="01xxxxxxxxx"
              icon="mdi:phone-outline"
              size="xl"
              class="w-full"
              variant="subtle"
            />
          </UFormField>

          <UFormField label="Password" name="password" size="lg">
            <UInput
              v-model="state.password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Min. 8 characters"
              icon="mdi:lock-outline"
              size="xl"
              class="w-full"
              variant="subtle"
            >
              <template #trailing>
                <UButton
                  color="neutral"
                  variant="ghost"
                  :icon="showPassword ? 'mdi:eye-off-outline' : 'mdi:eye-outline'"
                  @click="showPassword = !showPassword"
                  class="mr-1"
                />
              </template>
            </UInput>
            
            <template v-if="state.password" #help>
              <div class="space-y-1.5 mt-2">
                <div class="flex gap-1">
                  <div
                    v-for="i in 4" :key="i"
                    class="h-1 flex-1 rounded-full transition-all duration-300"
                    :class="i <= passwordStrength ? strengthColor : 'bg-gray-200'"
                  />
                </div>
                <span class="text-[10px] font-bold uppercase tracking-wider" :class="{
                  'text-red-500': passwordStrength == 1,
                  'text-yellow-500': passwordStrength == 2,
                  'text-blue-500': passwordStrength == 3,
                  'text-green-600': passwordStrength == 4,
                }">{{ strengthLabel }} password</span>
              </div>
            </template>
          </UFormField>

          <UFormField label="Confirm Password" name="confirmPassword" size="lg">
            <UInput
              v-model="state.confirmPassword"
              :type="showConfirm ? 'text' : 'password'"
              placeholder="Re-enter password"
              :icon="state.confirmPassword
                ? state.confirmPassword == state.password ? 'mdi:lock-check-outline' : 'mdi:lock-check-outline'
                : 'mdi:lock-check-outline'"
              size="xl"
              class="w-full"
              variant="subtle"
              :color="state.confirmPassword 
                ? (state.confirmPassword == state.password ? 'success' : 'error') 
                : 'neutral'"
            >
              <template #trailing>
                <UButton
                  color="neutral"
                  variant="ghost"
                  :icon="showConfirm ? 'mdi:eye-off-outline' : 'mdi:eye-outline'"
                  @click="showConfirm = !showConfirm"
                  class="mr-1"
                />
              </template>
            </UInput>
          </UFormField>

          <UFormField name="agree">
            <label class="flex items-start gap-3 cursor-pointer group">
              <div
                class="mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200"
                :class="state.agree ? 'bg-primary border-primary' : 'border-gray-300 group-hover:border-primary'"
                @click="state.agree = !state.agree"
              >
                <Icon v-if="state.agree" name="mdi:check-bold" class="text-black text-sm" />
              </div>
              <span class="text-sm text-gray-500 leading-relaxed">
                I agree to the
                <NuxtLink to="/terms" class="font-bold text-gray-800 hover:text-primary transition-colors">Terms of Service</NuxtLink>
                and
                <NuxtLink to="/privacy" class="font-bold text-gray-800 hover:text-primary transition-colors">Privacy Policy</NuxtLink>
              </span>
            </label>
          </UFormField>

          <UButton
            type="submit"
            :loading="loading"
            block
            size="xl"
            class="bg-gradient-to-r from-primary to-secondary text-black font-black py-4 rounded-xl hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 uppercase tracking-widest"
          >
            Create Account
          </UButton>
        </UForm>

        <!-- Divider -->
        <div class="flex items-center gap-3 my-7">
          <div class="h-px flex-1 bg-gray-200" />
          <span class="text-xs font-bold text-gray-400 uppercase tracking-wider">or</span>
          <div class="h-px flex-1 bg-gray-200" />
        </div>

        <!-- Login link -->
        <p class="text-center text-sm text-gray-500">
          Already have an account?
          <NuxtLink to="/auth/login" class="font-black text-gray-900 hover:text-primary transition-colors">
            Sign in →
          </NuxtLink>
        </p>

      </div>

      <!-- Footer note -->
      <p class="text-center text-xs text-gray-400 mt-6">
        By continuing, you agree to our
        <NuxtLink to="/terms" class="underline hover:text-primary">Terms</NuxtLink>
        &
        <NuxtLink to="/privacy" class="underline hover:text-primary">Privacy Policy</NuxtLink>
      </p>

    </div>
  </div>
</template>
