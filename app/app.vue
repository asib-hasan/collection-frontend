<template>
  <div>
    <NuxtLoadingIndicator />
    <NuxtRouteAnnouncer />
    <UApp>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UApp>
  </div>
</template>

<script setup>
const cartStore = useCartStore();
const wishlistStore = useWishlistStore();
onMounted(() => {
  cartStore.initCart();
  wishlistStore.initWishlist();
});
const settings = useState('config', () => null)
await callOnce(async () => {
  const data = await useAPI("/settings")
   settings.value = data?.data ?? null
})
</script>

<style>
@import "tailwindcss";
@import "@nuxt/ui";
/* @import url("https://fonts.googleapis.com/css2?family=Momo+Trust+Display&family=Quicksand:wght@300..700&family=Raleway:ital,wght@0,100..900;1,100..900&family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&display=swap"); */


@theme {
  --color-primary: #F8D543;
  --color-secondary: #B8970D;
  --color-background: #ecf0f3;
}

/* .font-nikosh {
  font-family: "nikosh", serif !important;
} */



/* Hide browser scrollbar completely */
::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for Firefox */
* {
  scrollbar-width: none;
}

/* Hide scrollbar for IE and Edge */
body {
  -ms-overflow-style: none;
  position: relative;
}
</style>
