<script setup lang="ts">
import SocialLinks from '../SocialLinks.vue'
</script>

<template>
  <footer class="relative z-10 border-t border-ocra/20 bg-cream">
    <div class="mx-auto flex max-w-5xl flex-col items-center justify-center gap-3 px-6 py-6 text-center">
      <SocialLinks />
      <p class="text-sm text-ink/60">
        &copy; {{ new Date().getFullYear() }} Marco Pellegrini, scrittore
      </p>
    </div>
  </footer>
</template>
