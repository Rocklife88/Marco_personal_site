<script setup lang="ts">
import SocialLinks from '../SocialLinks.vue'
</script>

<template>
  <footer class="relative z-10 min-h-[200px] border-t border-ocra/20 bg-cream">
    <div class="mx-auto flex h-full max-w-5xl flex-col items-center justify-center gap-4 px-6 py-8 text-center">
      <SocialLinks />
      <p class="text-sm text-ink/60">
        &copy; {{ new Date().getFullYear() }} Marco Pellegrini, scrittore
      </p>
    </div>
  </footer>
</template>
