<script setup>
</script>

<template>
  <footer class="cc-footer">
    <div class="footer-top">
      <div class="cc-footer-col">
        <img src="/images/logo-dark.png" alt="CCollection" class="footer-logo" style="mix-blend-mode: multiply;" />
        <p class="mt-4">Your premier destination for luxury dresses and unforgettable styles.</p>
      </div>
      <div class="cc-footer-col">
        <h4>SHOP</h4>
        <NuxtLink to="/">Prom Dresses</NuxtLink>
        <NuxtLink to="/">Homecoming</NuxtLink>
        <NuxtLink to="/">Evening Gowns</NuxtLink>
        <NuxtLink to="/">Wedding Dresses</NuxtLink>
      </div>
      <div class="cc-footer-col">
        <h4>ABOUT</h4>
        <NuxtLink to="/">Our Story</NuxtLink>
        <NuxtLink to="/">Store Locator</NuxtLink>
        <NuxtLink to="/">Careers</NuxtLink>
      </div>
      <div class="cc-footer-col">
        <h4>SUPPORT</h4>
        <NuxtLink to="/">Contact Us</NuxtLink>
        <NuxtLink to="/">Shipping & Returns</NuxtLink>
        <NuxtLink to="/">FAQ</NuxtLink>
        <NuxtLink to="/">Size Guide</NuxtLink>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© {{ new Date().getFullYear() }} CCollection. All rights reserved.</p>
      <p>
        Developed by <a href="https://creativetechpark.com/" target="_blank"
          style="color: #666; font-weight: 500; transition: color 0.3s;" onmouseover="this.style.color='#111'"
          onmouseout="this.style.color='#666'">Creative Tech Park</a>.
      </p>
    </div>
  </footer>
</template>

<style scoped>
.cc-footer {
  background-color: #fcfcfc;
  border-top: 1px solid #f0f0f0;
  padding: 60px 40px 20px;
  margin-top: 80px;
  font-family: 'Jost', sans-serif;
}

.footer-top {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1fr;
  gap: 40px;
  max-width: 1400px;
  margin: 0 auto;
  padding-bottom: 50px;
}

.cc-footer-col h4 {
  font-family: 'Cinzel', serif;
  font-size: 16px;
  margin-bottom: 25px;
  letter-spacing: 1px;
  color: #111;
}

.cc-footer-col p {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 20px;
}

.cc-footer-col a {
  display: block;
  text-decoration: none;
  color: #555;
  font-size: 14px;
  margin-bottom: 12px;
  transition: color 0.3s ease;
}

.footer-logo {
  height: 60px;
  object-fit: contain;
  opacity: 0.8;
  mix-blend-mode: multiply;
}

.mt-4 {
  margin-top: 15px;
}

.cc-footer-col a:hover {
  color: #111;
  text-decoration: underline;
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
  padding-top: 20px;
  border-top: 1px solid #e1e1e1;
  font-size: 12px;
  color: #888;
}

@media (max-width: 1024px) {
  .cc-footer {
    padding: 40px 20px 20px;
    margin-top: 40px;
  }

  .footer-top {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .footer-top {
    grid-template-columns: 1fr;
  }

  .footer-bottom {
    flex-direction: column;
    gap: 15px;
  }
}
</style>
