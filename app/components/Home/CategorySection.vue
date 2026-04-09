<template>
    <section class="py-12 sm:py-16 md:py-20 bg-white">
        <div class="container mx-auto px-4">
            <h2 class="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 md:mb-16 text-gray-900 tracking-wide uppercase">
                Shop by Categories
            </h2>
           
            <!-- Container for category cards -->
            <UCarousel :items="categories" auto-scroll :loop="true" arrows indicators :ui="{
                item: 'basis-1/2 md:basis-1/3 lg:basis-1/5 ps-0 pe-0 h-[300px] sm:h-[350px] lg:h-[400px]',
                container: 'flex gap-0'
            }" class="w-full rounded-lg overflow-hidden shadow-lg">
                <template #default="{ item: category }">
                    <CategoryCard :category="category" class="w-full h-full" />
                </template>
            </UCarousel>
        </div>
    </section>
</template>

<script setup>
const { data: categories } = await useAPI("/frontend/v1/category");
</script>