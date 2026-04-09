<script setup lang="ts">
const { data: testimonials } = await useAPI("/frontend/v1/get-testimonials");
</script>

<template>
  <section class="w-full relative overflow-hidden bg-white pt-12">
    <!-- Section Header -->
    <div class="container mx-auto mb-8 sm:mb-12 px-4 text-center relative z-20">
      <h2
        class="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight uppercase mb-4"
      >
        What Our Clients Say
      </h2>
      <div
        class="w-24 h-1.5 bg-primary mx-auto rounded-full mb-6 relative overflow-hidden"
      >
        <div class="absolute inset-0 bg-white/50 animate-pulse"></div>
      </div>
      <p class="text-sm sm:text-base text-gray-500 max-w-2xl mx-auto">
        Don't just take our word for it. Read the experiences of our valued
        customers and discover the true Loomino quality.
      </p>
    </div>

    <!-- Carousel Matching HeroSection -->
    <div class="w-full relative overflow-hidden pb-12">
      <UCarousel
        :items="testimonials"
        :autoplay="{ delay: 5000 }"
        :loop="true"
        :ui="{
          item: 'w-full',
          indicators: {
            wrapper:
              'absolute bottom-8 left-1/2 transform -translate-x-1/2 flex justify-center gap-3 z-30',
            base: 'h-1.5 w-6 rounded-full transition-all duration-300 bg-white/30 hover:bg-white/50',
            active: 'bg-primary w-12',
          },
        }"
        indicators
        class="w-full h-auto"
      >
        <template #default="{ item: slide }">
          <div
            class="relative w-full h-full flex items-center justify-center overflow-hidden group py-12 sm:py-16 md:py-20 min-h-[400px] sm:min-h-[500px] md:min-h-[600px] rounded-2xl sm:rounded-[3rem] mx-auto max-w-[95%]"
          >
            <!-- Background Image from Slider Data -->
            <img
              :src="slide.bg_image_url"
              class="absolute inset-0 w-full h-full object-cover transition-transform duration-[3000ms] group-hover:scale-105"
              alt="Testimonial Background"
            />

            <!-- Modern Dynamic Overlay -->
            <div
              class="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/90 z-10 transition-colors duration-500"
            ></div>
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/20 z-10"
            ></div>

            <!-- Grain Overlay for Texture -->
            <div
              class="absolute inset-0 opacity-[0.25] mix-blend-overlay pointer-events-none z-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"
            ></div>

            <!-- Content Section -->
            <div
              class="container mx-auto px-4 sm:px-6 md:px-8 relative z-20 w-full"
            >
              <div
                class="max-w-4xl mx-auto flex flex-col items-center text-center"
              >
                <!-- Premium Badge matching HeroSection style -->
                <div
                  class="flex items-center gap-3 mb-5 sm:mb-8 group/badge animate-fade-in-up"
                >
                  <div class="relative">
                    <div
                      class="absolute inset-0 bg-primary/20 blur-md rounded-full"
                    ></div>
                    <div
                      class="relative flex items-center gap-2 px-4 sm:px-6 py-1.5 sm:py-2 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300"
                    >
                      <Icon
                        name="mdi:star-circle"
                        class="text-primary text-base sm:text-xl"
                      />
                      <span
                        class="text-[10px] sm:text-xs font-bold text-white tracking-[0.15em] sm:tracking-[0.2em] uppercase"
                        >Verified Review</span
                      >
                    </div>
                  </div>
                </div>

                <!-- Star Rating inside beautiful glassmorphism box -->
                <div
                  class="flex gap-1.5 sm:gap-2 mb-5 sm:mb-8 animate-fade-in-up delay-[200ms]"
                >
                  <Icon
                    v-for="i in 5"
                    :key="i"
                    name="mdi:star"
                    class="text-lg sm:text-xl md:text-2xl transition-colors duration-300"
                    :class="
                      Number(slide.rating || 5) >= i
                        ? 'text-primary drop-shadow-[0_0_12px_rgba(248,213,67,0.8)]'
                        : 'text-white/20'
                    "
                  />
                </div>

                <!-- Dynamic Title with Gradient Effect / Quote -->
                <div
                  class="w-full relative px-6 sm:px-10 md:px-16 mb-8 sm:mb-10 animate-fade-in-up delay-[400ms]"
                >
                  <Icon
                    name="mdi:format-quote-open"
                    class="text-3xl sm:text-5xl text-primary/40 absolute -top-6 sm:-top-8 left-0 sm:-left-2 drop-shadow-lg"
                  />
                  <h3
                    class="text-base sm:text-xl md:text-2xl text-white font-light italic leading-relaxed md:leading-snug drop-shadow-xl z-20 relative"
                  >
                    "{{ slide.massage }}"
                  </h3>
                  <Icon
                    name="mdi:format-quote-close"
                    class="text-3xl sm:text-5xl text-primary/40 absolute -bottom-6 sm:-bottom-8 right-0 sm:-right-2 drop-shadow-lg z-10"
                  />
                </div>

                <!-- Action Button style modified for User Info -->
                <div
                  class="flex items-center gap-3 sm:gap-5 mt-4 sm:mt-4 group/author animate-fade-in-up delay-[600ms]"
                >
                  <div
                    class="relative w-12 h-12 sm:w-16 sm:h-16 rounded-full border-[3px] border-primary overflow-hidden shadow-[0_0_20px_rgba(248,213,67,0.4)] transition-transform duration-500 group-hover/author:scale-110 group-hover/author:rotate-3 flex-shrink-0"
                  >
                    <img
                      :src="slide.image_url"
                      class="w-full h-full object-cover"
                      :alt="slide.name"
                    />
                    <!-- Glow effect inside -->
                    <div
                      class="absolute inset-0 border-[4px] border-black/20 rounded-full mix-blend-overlay"
                    ></div>
                  </div>
                  <div
                    class="text-left bg-black/40 backdrop-blur-md px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl border border-white/10 relative overflow-hidden group-hover/author:border-primary/50 transition-colors duration-300"
                  >
                    <div
                      class="absolute inset-0 bg-white/5 opacity-0 group-hover/author:opacity-100 transition-opacity duration-300"
                    ></div>
                    <h4
                      class="text-base sm:text-lg font-bold text-white tracking-wider relative z-10"
                    >
                      {{ slide.name }}
                    </h4>
                    <p
                      class="text-primary text-[10px] sm:text-xs w-full uppercase tracking-[0.15em] font-semibold mt-0.5 sm:mt-1 relative z-10"
                    >
                      {{ slide.designation }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </UCarousel>
    </div>
  </section>
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

.animate-fade-in-up {
  opacity: 0;
  animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.delay-\[200ms\] {
  animation-delay: 0.2s;
}
.delay-\[400ms\] {
  animation-delay: 0.4s;
}
.delay-\[600ms\] {
  animation-delay: 0.6s;
}
</style>
