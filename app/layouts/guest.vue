<script setup>
</script>
<template>
    <div class="w-full relative">
        <header>
            <Header />
        </header>
        <main class="pt-16 lg:pt-0">
            <slot />
        </main>
        <footer>
            <Footer />
        </footer>
    </div>
</template>
<style scoped></style>
