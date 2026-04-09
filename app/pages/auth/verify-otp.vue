<template>
  <div class="min-h-screen bg-background flex items-center justify-center px-4 py-8 md:py-16 relative overflow-hidden">
    <!-- Decorative blobs -->
    <div class="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
    <div class="absolute bottom-0 right-0 w-[400px] h-[400px] bg-secondary/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />

    <div class="w-full max-w-md relative z-10">
      <div class="text-center mb-4">
        <NuxtLink to="/" class="inline-flex flex-col items-center gap-2 group">
          <img src="/images/logo1.png" alt="Loomino" class="h-20 w-auto object-contain rounded-lg" />
          <span class="text-xs font-semibold uppercase tracking-widest text-gray-400 group-hover:text-primary transition-colors">Your Fashion Destination</span>
        </NuxtLink>
      </div>

      <div class="bg-white/80 backdrop-blur-xl border border-white shadow-2xl rounded-3xl p-6 sm:p-8 md:p-10">
        <h1 class="text-2xl font-black text-center text-gray-900 mb-1">Verify OTP</h1>
        <p class="text-sm text-gray-500 text-center mb-8">Enter the OTP sent to your email</p>

        <UForm ref="login-form" :schema="schema" :state="state" @submit="onSubmit" class="space-y-6">
          <UFormField label="OTP" name="otp" size="lg" description="We'll never share your email with anyone else.">
            <UInput
              v-model="state.otp"
              placeholder="Enter OTP"
              icon="mdi:shield-check-outline"
              size="xl"
              class="w-full"
              variant="subtle"
            />
          </UFormField>

          <UButton
            type="submit"
            loading-auto
            block
            size="xl"
            class="bg-gradient-to-r from-primary to-secondary text-black font-black py-4 rounded-xl hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 uppercase tracking-widest"
          >
            Verify OTP
          </UButton>
        </UForm>

        <!-- Divider -->
        <div class="flex items-center gap-3 my-7">
          <div class="h-px flex-1 bg-gray-200" />
          <span class="text-xs font-bold text-gray-400 uppercase tracking-wider">or</span>
          <div class="h-px flex-1 bg-gray-200" />
        </div>

        <p class="text-center text-sm text-gray-500">
          Back to Login?
          <NuxtLink to="/auth/login" class="font-black text-gray-900 hover:text-primary transition-colors">
            Login Now →
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

<script setup lang="ts">
import { object, string, type InferType } from "yup";
import type { FormSubmitEvent } from "#ui/types";
import { useEmailStore } from "~/stores/emailStore";

const toast = useToast();
const { $api } = useNuxtApp();
const formRef = useTemplateRef("login-form");
const emailStore = useEmailStore();

useSeoMeta({
  title: "OTP Verification",
});
definePageMeta({
  title: "OTP Verification",
});

const schema = object({
  otp: string().required("OTP Field is Required"),
});

type Schema = InferType<typeof schema>;

const state = reactive({
  email: emailStore?.email,
  otp: undefined,
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  formRef.value?.clear();
  try {
    const response: any = await $api("/customer/check-otp", {
      method: "POST",
      body: event.data,
    });

    toast.add({
      title: "Success",
      description: response.message || "OTP Checked Successfully",
    });

    emailStore.setEmail(event.data.email);
    navigateTo('/auth/update-password');
  } catch (err: any) {
    const error = useApiError(err);
    if (error.isValidationError) {
      formRef.value?.setErrors(error.bag);
      return;
    }
    toast.add({
      title: "Error",
      description: "Failed to Check OTP!",
      color: "error",
    });
  }
}
</script>

<style></style>
