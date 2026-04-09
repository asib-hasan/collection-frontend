<script setup>
const route = useRoute();
const { $api } = useNuxtApp();
const {
  data: page,
  pending,
  error,
} = await useAPI(`/frontend/v1/get-custom-page/${route.params.slug}`);
if (process.client) {
  window.scrollTo(0, 0);
}
</script>
<template>
  <AppLayout>
    <section>
      <div class="container mx-auto flex p-2 lg:p-10">
        <div v-if="pending" class="text-center w-full">Loading...</div>
        <div v-else-if="error" class="text-center text-red-500 w-full">
          <div class="flex items-center justify-center bg-gray-50 p-4">
            <div class="text-center">
              <Icon
                name="mdi:alert-circle-outline"
                class="text-6xl text-red-500 mb-4"
              />
              <h1 class="text-3xl font-bold mb-4">Page Not Found</h1>
              <p class="text-gray-600 mb-8 max-w-md">
                The page you are looking for does not exist.
              </p>
              <UButton
                color="primary"
                size="xl"
                @click="() => navigateTo('/', { replace: true })"
              >
                Go Back Home
              </UButton>
            </div>
          </div>
        </div>
        <div
          v-else
          class="container mx-auto  p-5 bg-white shadow-lg editor_data"
          v-html="page?.content"
        />
      </div>
    </section>
  </AppLayout>
</template>
