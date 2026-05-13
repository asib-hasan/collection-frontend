<script setup>
const campaign = {
  image: '/images/image53.webp',
  alt: 'Evening Campaign',
  title: 'The Evening Gala',
  description: 'Draped in sophistication. Step out in our exclusive gala-ready collection designed to make endless impressions.',
  link: '/products',
  linkText: 'DISCOVER MORE'
}
</script>

<template>
   <section class="campaign-banner">
      <div class="campaign-bg">
         <img :src="campaign.image" :alt="campaign.alt" />
      </div>
      <div class="campaign-overlay"></div>
      <div class="campaign-text text-left">
         <h2>{{ campaign.title }}</h2>
         <p>{{ campaign.description }}</p>
         <div class="mt-4">
            <NuxtLink :to="campaign.link" class="cc-btn primary">{{ campaign.linkText }}</NuxtLink>
         </div>
      </div>
   </section>
</template>
