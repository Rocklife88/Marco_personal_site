<script setup lang="ts">
import Header from './components/layout/Header.vue'
import Footer from './components/layout/Footer.vue'
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <Header />
    <main class="flex-1">
      <router-view />
    </main>
    <Footer />
  </div>
</template>
