<script setup lang="ts">
const { data: sliders } = await useAPI("/frontend/v1/hero-section");

const titleFirstPart = (title: string) => {
  if (!title) return 'Welcome to';
  const parts = title.split(' ');
  return parts.length > 1 ? parts.slice(0, -1).join(' ') : '';
};
const titleLastPart = (title: string) => {
  if (!title) return 'Loomino';
  const parts = title.split(' ');
  return parts.slice(-1).join(' ');
};
</script>

<template>
  <div class="w-full relative overflow-hidden">
    <!-- Carousel -->
    <UCarousel 
      :items="sliders" 
      :autoplay="{ delay: 5000 }" 
      :loop="true" 
      :ui="{
        item: 'w-full',
        indicators: {
          wrapper: 'absolute bottom-6 left-1/2 transform -translate-x-1/2 flex justify-center gap-3 z-20',
          base: 'h-1.5 w-6 rounded-full transition-all duration-300 bg-white/20 hover:bg-white/40',
          active: 'bg-primary w-12'
        }
      }" 
      indicators 
      class="w-full h-auto"
    >
      <template #default="{ item: slide }">
        <div class="relative w-full h-[450px] lg:h-full flex items-center overflow-hidden group">
          <!-- Background Image from Slider Data -->
          <img 
            :src="slide.banner_image_url || '/images/hero1.webp'" 
            class="absolute inset-0 w-full h-[450px] lg:h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110" 
            alt="Hero Background" 
          />
          
          <!-- Modern Dynamic Overlay -->
          <div class="absolute inset-0 bg-gradient-to-r from-black/90 via-black/10 to-transparent z-10"></div>
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 z-10"></div>
          
          <!-- Grain Overlay for Texture -->
          <div class="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none z-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

          <!-- IMPROVED CONTENT SECTION - Only this part changed -->
          <div class="container mx-auto px-4 sm:px-6 relative z-20">
            <div class="flex flex-col justify-center min-h-[480px] sm:min-h-[560px] md:min-h-[640px] mx-auto">
              <div class="max-w-3xl space-y-4 sm:space-y-6 md:space-y-8">
                
                <!-- Premium Badge with Icon -->
                <div class="flex items-center gap-3 group/badge">
                  <div class="relative">
                    <div class="absolute inset-0 bg-primary/30 blur-md rounded-full"></div>
                    <div class="relative flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-2 sm:py-2.5 bg-black/40 backdrop-blur-xl rounded-full border border-primary/30">
                      <div class="relative">
                        <div class="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary animate-ping absolute"></div>
                        <div class="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary relative"></div>
                      </div>
                      <span class="text-xs sm:text-sm font-bold text-primary tracking-[0.15em] sm:tracking-[0.2em] uppercase truncate max-w-[160px] sm:max-w-none">{{ slide.sub_title || 'Featured Collection' }}</span>
                      <Icon name="mdi:flash" class="text-primary text-base sm:text-lg flex-shrink-0" />
                    </div>
                  </div>
                </div>

                <!-- Dynamic Title with Gradient Effect -->
                <div class="space-y-2 sm:space-y-3">
                  <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight">
                    <span class="relative inline-block">
                      <span class="relative z-10 text-white">{{ titleFirstPart(slide.title) }}</span>
                      <span class="absolute -bottom-2 left-0 w-full h-3 bg-primary/20 blur-md"></span>
                    </span>
                    <br />
                    <span class="relative inline-block mt-1 sm:mt-2">
                      <span class="relative z-10 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                        {{ titleLastPart(slide.title) }}
                      </span>
                      <span class="absolute -inset-1 bg-primary/10 blur-2xl"></span>
                    </span>
                  </h1>
                </div>

                <!-- Description with Quote Style -->
                <div class="relative pl-4 sm:pl-6 border-l-4 border-primary/50">
                  <p class="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 leading-relaxed max-w-xl italic line-clamp-3 sm:line-clamp-none">
                    "{{ slide.short_description || 'Discover Amazing Products with Premium Quality' }}"
                  </p>
                  <div class="absolute -left-1 top-0 w-1 h-8 bg-primary rounded-full"></div>
                </div>

                <!-- Action Buttons with Modern Design -->
                <div class="flex flex-wrap gap-3 sm:gap-5 pt-4 sm:pt-8">
                  <NuxtLink to="/products" class="group/btn">
                    <button class="relative px-5 sm:px-8 py-3 sm:py-4 bg-primary text-black font-bold rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-[0_0_30px_rgba(248,213,67,0.5)] text-sm sm:text-base">
                      <span class="relative z-10 flex items-center gap-2 sm:gap-3">
                        Shop Now
                        <Icon name="mdi:arrow-right" class="text-lg sm:text-xl transition-transform duration-300 group-hover/btn:translate-x-1" />
                      </span>
                      <div class="absolute inset-0 bg-white transform translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
                    </button>
                  </NuxtLink>
                  
                  <a v-if="slide.Video_url" :href="slide.Video_url" target="_blank" class="group/btn2 relative px-5 sm:px-8 py-3 sm:py-4 bg-transparent text-white font-bold rounded-xl sm:rounded-2xl border border-white/20 overflow-hidden backdrop-blur-sm hover:border-white/40 transition-all text-sm sm:text-base inline-flex items-center gap-2 sm:gap-3">
                    <Icon name="mdi:play-circle-outline" class="text-lg sm:text-xl text-primary flex-shrink-0" />
                    <span>Watch Video</span>
                    <div class="absolute inset-0 bg-white/10 transform -translate-x-full group-hover/btn2:translate-x-0 transition-transform duration-300"></div>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- Enhanced Floating Elements -->
          <div class="absolute bottom-12 right-12 hidden xl:flex items-center gap-6 z-20">
            <!-- Animated Scroll Indicator -->
            <div class="flex flex-col items-center gap-3">
              <span class="text-xs font-mono text-white/40 tracking-[0.3em] uppercase rotate-180 vertical-text">Explore</span>
              <div class="w-px h-20 bg-gradient-to-b from-primary to-transparent relative overflow-hidden">
                <div class="absolute inset-0 bg-primary animate-scroll-line"></div>
              </div>
            </div>
            
            <!-- Mouse Icon with Pulse -->
            <div class="relative">
              <div class="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-ping"></div>
              <div class="relative w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center backdrop-blur-sm">
                <Icon name="mdi:mouse" class="text-primary text-xl" />
              </div>
            </div>
          </div>

          <!-- Slide Counter with Progress -->
          <div class="absolute top-4 sm:top-12 right-4 sm:right-12 z-20 flex items-center gap-2 sm:gap-4">
            <span class="text-2xl sm:text-5xl font-black text-white/10">{{ String(slide.order_number || slide.id || 1).padStart(2, '0') }}</span>
            <div class="w-8 sm:w-20 h-px bg-primary/30"></div>
            <span class="text-[10px] sm:text-xs font-mono text-white/40 tracking-wider">{{ String(sliders?.length || 0).padStart(2, '0') }}</span>
          </div>

        </div>
      </template>
    </UCarousel>
  </div>
</template>

<style scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scrollLine {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(200%);
  }
}

.animate-fade-in-up {
  opacity: 0;
  animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.animate-scroll-line {
  animation: scrollLine 2s infinite;
}

.vertical-text {
  writing-mode: vertical-rl;
  text-orientation: mixed;
}

.delay-\[200ms\] { animation-delay: 0.2s; }
.delay-\[400ms\] { animation-delay: 0.4s; }
.delay-\[600ms\] { animation-delay: 0.6s; }
.delay-\[800ms\] { animation-delay: 0.8s; }

/* Modern text effects */
.tracking-tight {
  letter-spacing: -0.02em;
}

/* Glass morphism */
.backdrop-blur-xl {
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

/* Custom hover effects */
.group:hover .group-hover\:scale-110 {
  transform: scale(1.1);
}

/* Gradient text support */
.bg-gradient-to-r {
  background-size: 200% auto;
}


@media (min-width: 768px) {
  .md\:min-h-\[700px\] {
    min-height: 700px;
  }
}

@media (min-width: 1024px) {
  .lg\:min-h-\[800px\] {
    min-height: 800px;
  }
}
</style>