<script setup lang="ts">
// Page Meta
useHead({
  title: 'About Us | Loomino',
  meta: [
    { name: 'description', content: 'Learn more about our story, mission, and the team behind Loomino.' }
  ]
})

const values = [
  {
    title: 'Uncompromising Quality',
    description: 'Every stitch, every fabric, and every detail is carefully selected to ensure our pieces stand the test of time.',
    icon: 'ph:diamond-bold',
    color: 'from-blue-400 to-primary'
  },
  {
    title: 'Sustainable Practices',
    description: 'We are committed to eco-friendly production methods and sustainable sourcing to protect our planet.',
    icon: 'ph:leaf-bold',
    color: 'from-green-400 to-emerald-500'
  },
  {
    title: 'Customer First',
    description: 'Your satisfaction is our priority. We offer unmatched support and seamless shopping experiences.',
    icon: 'ph:heart-bold',
    color: 'from-red-400 to-rose-500'
  },
  {
    title: 'Innovative Design',
    description: 'We constantly push boundaries, blending classic silhouettes with modern, forward-thinking aesthetics.',
    icon: 'ph:lightbulb-bold',
    color: 'from-yellow-400 to-orange-500'
  }
]

const { data: teamResponse } = await useAPI("/frontend/v1/get-team-members");
const { data: counterResponse } = await useAPI("/frontend/v1/get-counters");
const team = computed(() => {
  return teamResponse.value?.data || teamResponse.value || [];
});
const counters = computed(() => {
  return counterResponse.value?.data || counterResponse.value || [];
});
</script>

<template>
  <div class="bg-gray-50 min-h-screen">
    
    <!-- ── Page Header ─────────────────────────────────────────────── -->
    <div class="relative py-16 md:py-20 border-b border-gray-100 overflow-hidden">
      <img
        src="/images/bg-01.png"
        alt="About Us Banner"
        class="absolute inset-0 w-full h-full object-cover z-0"
      />
      <div class="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent z-10" />
      <div class="container mx-auto px-4 relative z-20 flex flex-col items-start">
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 tracking-tight uppercase mb-3 drop-shadow-sm">
          About Us
        </h1>
        <div class="w-16 sm:w-20 h-1.5 bg-primary rounded-full mb-5 shadow-md" />
        <p class="text-sm sm:text-base text-gray-600 font-medium mb-6 max-w-lg leading-relaxed">
          Redefining Modern Elegance. We believe fashion is more than clothing—it’s an expression of identity. Join us on our journey.
        </p>
        <div class="flex flex-wrap items-center gap-2 text-sm sm:text-base text-gray-600 font-medium">
          <NuxtLink to="/" class="hover:text-primary transition-colors flex-shrink-0">Home</NuxtLink>
          <Icon name="mdi:chevron-right" class="text-gray-400 flex-shrink-0" />
          <span class="text-gray-900 flex-1 min-w-0 truncate">About</span>
        </div>
      </div>
    </div>

    <!-- ── Our Story Section ── -->
    <section class="py-12 md:py-20 lg:py-32 relative overflow-hidden">
      <!-- Decorative Elements -->
      <div class="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      <div class="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>

      <div class="container mx-auto px-4 relative z-10">
        <div class="flex flex-col lg:flex-row items-center gap-8 md:gap-12 lg:gap-20">
          
          <!-- Image Collage -->
          <div class="w-full lg:w-1/2 relative">
            <div class="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl z-10 border border-gray-100 group">
              <img src="https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=1171&q=80" alt="Our Story" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div class="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent"></div>
            </div>
            
            <!-- Floating Stat Box -->
            <div class="absolute -bottom-6 sm:-bottom-8 -right-2 sm:-right-8 lg:-right-12 bg-white rounded-2xl sm:rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 p-3 sm:p-6 lg:p-8 z-20 max-w-[170px] sm:max-w-[200px] md:max-w-[240px] animate-bounce-slow">
              <div class="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-3 sm:mb-4 shadow-lg shadow-primary/30">
                <Icon name="ph:rocket-launch-bold" class="text-xl sm:text-2xl text-white" />
              </div>
              <h3 class="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 mb-1">2014</h3>
              <p class="text-[10px] sm:text-xs md:text-sm font-bold text-gray-400 uppercase tracking-widest leading-tight">The year our journey began</p>
            </div>
          </div>

          <!-- Text Content -->
          <div class="w-full lg:w-1/2 mt-10 lg:mt-0">
            <h2 class="text-2xl sm:text-3xl md:text-5xl font-black text-gray-900 leading-tight mb-5 sm:mb-6">
              Born from a passion for <br class="hidden sm:block"/><span class="text-primary italic">exceptional craft.</span>
            </h2>
            <div class="w-16 sm:w-20 h-1.5 bg-gradient-to-r from-primary to-secondary rounded-full mb-6 sm:mb-8 shadow-sm"></div>
            
            <div class="space-y-4 sm:space-y-6 text-gray-600 text-base sm:text-lg leading-relaxed">
              <p>
                What started as a small boutique in the heart of the design district has grown into a global destination for contemporary fashion. Loomino was founded on a simple premise: everyone deserves access to meticulously crafted, beautifully designed clothing without the exorbitant luxury markup.
              </p>
              <p>
                We spend months sourcing the finest materials from around the world. We partner with ethical factories that treat their workers fairly. And we iterate endlessly on fits and silhouettes until they are absolutely perfect.
              </p>
            </div>

            <div class="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div class="flex items-center gap-3 sm:gap-4">
                <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                  <Icon name="ph:scissors-bold" class="text-xl sm:text-2xl text-orange-500" />
                </div>
                <span class="font-bold text-gray-900 text-sm md:text-base">Master Tailoring</span>
              </div>
              <div class="flex items-center gap-3 sm:gap-4">
                <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-purple-50 flex items-center justify-center shrink-0">
                  <Icon name="ph:globe-hemisphere-west-bold" class="text-xl sm:text-2xl text-purple-500" />
                </div>
                <span class="font-bold text-gray-900 text-sm md:text-base">Global Shipping</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- ── Stats Section ── -->
    <section class="py-10 md:py-16 bg-gray-900 relative overflow-hidden">
      <!-- Tech pattern -->
      <div class="absolute inset-0 opacity-5"
        style="background-image: radial-gradient(circle at 2px 2px, white 1px, transparent 0); background-size: 32px 32px;">
      </div>
      
      <div class="container mx-auto px-4 relative z-10">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-4 md:gap-8 lg:gap-12 lg:divide-x divide-gray-800">
          <div v-for="stat in counters" :key="stat.label" class="text-center px-2 sm:px-4">
            <div class="w-12 h-12 sm:w-16 sm:h-16 mx-auto rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 sm:mb-6">
              <Icon :name="stat.icon" class="text-2xl sm:text-3xl text-secondary drop-shadow-[0_0_15px_rgba(17,227,227,0.5)]" />
            </div>
            <h3 class="text-2xl sm:text-4xl md:text-5xl font-black text-white mb-2">{{ stat.value }}</h3>
            <p class="text-[10px] sm:text-xs md:text-sm font-bold text-white/50 uppercase tracking-widest">{{ stat.label }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Why Choose Us (Core Values) ── -->
    <section class="py-12 md:py-20 lg:py-32 bg-gray-50 relative">
      <div class="container mx-auto px-4">
        
        <div class="text-center max-w-3xl mx-auto mb-10 md:mb-16 lg:mb-24">
          <span class="text-primary font-black uppercase tracking-widest text-xs sm:text-sm mb-3 sm:mb-4 block">Our Philosophy</span>
          <h2 class="text-2xl sm:text-3xl md:text-5xl font-black text-gray-900 mb-4 sm:mb-6 tracking-tight">
            Built on core values that define everything we do
          </h2>
          <p class="text-gray-500 text-base sm:text-lg px-2">We don't just sell clothes, we provide a lifestyle built on trust, quality, and mutual respect.</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 xl:gap-8">
          <div v-for="(val, index) in values" :key="index" 
            class="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-lg shadow-gray-200/30 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 group relative overflow-hidden">
            
            <!-- Hover Gradient Background -->
            <div :class="`absolute inset-0 bg-gradient-to-br ${val.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`"></div>
            
            <div :class="`w-16 h-16 rounded-2xl bg-gradient-to-br ${val.color} flex items-center justify-center mb-8 shadow-md transform group-hover:rotate-12 transition-transform duration-500 relative z-10`">
              <Icon :name="val.icon" class="text-2xl text-white" />
            </div>
            
            <h3 class="text-xl font-black text-gray-900 mb-4 relative z-10">{{ val.title }}</h3>
            <p class="text-gray-500 leading-relaxed relative z-10">{{ val.description }}</p>
          </div>
        </div>

      </div>
    </section>

    <!-- ── Our Team Section ── -->
    <section class="py-12 md:py-20 lg:py-32 bg-white border-t border-gray-100">
      <div class="container mx-auto px-4">
        
        <div class="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 md:gap-8 mb-10 md:mb-16 lg:mb-20">
          <div class="max-w-2xl">
            <span class="text-secondary font-black uppercase tracking-widest text-xs sm:text-sm mb-3 sm:mb-4 block">The Minds Behind The Brand</span>
            <h2 class="text-2xl sm:text-3xl md:text-5xl font-black text-gray-900 tracking-tight">
              Meet our passionate team of creatives
            </h2>
          </div>
          <button class="w-full md:w-auto px-8 py-3.5 sm:py-4 rounded-xl border-2 border-gray-900 text-gray-900 font-black uppercase tracking-widest hover:bg-gray-900 hover:text-white transition-colors duration-300 text-xs sm:text-sm whitespace-nowrap text-center">
            Join Our Team
          </button>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8">
          <div v-for="member in team" :key="member.id || member.name" class="group cursor-pointer">
            <!-- Image Card -->
            <div class="relative rounded-3xl overflow-hidden aspect-[3/4] mb-6 shadow-md border border-gray-100">
              <img :src="member.image_url || member.image" :alt="member.name" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter group-hover:brightness-110" />
              
              <!-- Social Overlay -->
              <div class="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                <div class="flex gap-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <a v-if="member.facebook_link" :href="member.facebook_link" target="_blank" class="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-primary transition-colors hover:scale-110">
                    <Icon name="uil:facebook-f" class="text-lg" />
                  </a>
                  <a v-if="member.twitter_link" :href="member.twitter_link" target="_blank" class="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-primary transition-colors hover:scale-110">
                    <Icon name="uil:twitter-alt" class="text-lg" />
                  </a>
                  <a v-if="member.linkedin_link" :href="member.linkedin_link" target="_blank" class="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-primary transition-colors hover:scale-110">
                    <Icon name="uil:linkedin" class="text-lg" />
                  </a>
                  <a v-if="member.youtube_link" :href="member.youtube_link" target="_blank" class="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-primary transition-colors hover:scale-110">
                    <Icon name="uil:youtube" class="text-lg" />
                  </a>
                </div>
              </div>
            </div>
            
            <h3 class="text-xl font-black text-gray-900 mb-1 group-hover:text-primary transition-colors">{{ member.name }}</h3>
            <p class="text-primary font-bold text-sm uppercase tracking-wider mb-3">{{ member.designation || member.role }}</p>
            <div class="text-gray-500 text-sm leading-relaxed line-clamp-3 team-bio" v-html="member.short_description || member.bio"></div>
          </div>
        </div>

      </div>
    </section>

  </div>
</template>

<style scoped>
.animate-bounce-slow {
  animation: bounceSlow 3s ease-in-out infinite;
}

@keyframes bounceSlow {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
}
</style>
