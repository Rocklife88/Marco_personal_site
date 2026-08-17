<script setup lang="ts">
import { Mail } from '@lucide/vue'
import links from '../data/links'
import BrandIcon from './BrandIcon.vue'
import LoquisLogo from './icons/LoquisLogo.vue'
</script>

<template>
  <div class="flex flex-wrap items-center justify-center gap-5 text-sm font-sans font-medium">
    <a
      v-if="links.youtube"
      :href="links.youtube"
      target="_blank"
      rel="noopener"
      class="inline-flex items-center gap-2 text-ink/75 transition hover:text-terracotta"
    >
      <BrandIcon name="youtube" :size="16" /> YouTube
    </a>
    <a
      v-if="links.loquis"
      :href="links.loquis"
      target="_blank"
      rel="noopener"
      class="inline-flex items-center gap-2 text-ink/75 transition hover:text-terracotta"
    >
      <LoquisLogo :size="16" /> Loquis
    </a>
    <a
      v-if="links.spotify"
      :href="links.spotify"
      target="_blank"
      rel="noopener"
      class="inline-flex items-center gap-2 text-ink/75 transition hover:text-terracotta"
    >
      <BrandIcon name="spotify" :size="16" /> Spotify
    </a>
    <a
      v-if="links.email"
      :href="`mailto:${links.email}`"
      class="inline-flex items-center gap-2 text-ink/75 transition hover:text-terracotta"
    >
      <Mail :size="16" /> Email
    </a>
  </div>
</template>
