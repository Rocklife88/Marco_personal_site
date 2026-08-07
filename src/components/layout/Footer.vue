<script setup lang="ts">
import SocialLinks from '../SocialLinks.vue'
</script>

<template>
  <footer class="border-t border-ocra/20 bg-cream">
    <div class="mx-auto flex max-w-5xl flex-col items-center gap-4 px-6 py-8 text-center">
      <SocialLinks />
      <p class="text-sm text-ink/60">
        &copy; {{ new Date().getFullYear() }} Marco Pellegrini, scrittore
      </p>
    </div>
  </footer>
</template>
