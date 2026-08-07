<script setup lang="ts">
import Nav from './Nav.vue'
</script>

<template>
  <header class="sticky top-0 z-10 border-b border-ocra/20 bg-cream/80 backdrop-blur">
    <div class="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-4">
      <router-link to="/" class="text-lg font-semibold tracking-tight text-ink transition hover:text-terracotta">
        Marco Pellegrini
      </router-link>
      <Nav />
    </div>
  </header>
</template>
