<script setup lang="ts">
import links from '../data/links'
</script>

<template>
  <div class="flex flex-wrap items-center justify-center gap-4 text-sm">
    <a
      v-if="links.youtube"
      :href="links.youtube"
      target="_blank"
      rel="noopener"
      class="text-ink hover:text-terracotta"
    >
      YouTube
    </a>
    <a
      v-if="links.altervista"
      :href="links.altervista"
      target="_blank"
      rel="noopener"
      class="text-ink hover:text-terracotta"
    >
      Altervista
    </a>
    <a
      v-if="links.substack"
      :href="links.substack"
      target="_blank"
      rel="noopener"
      class="text-ink hover:text-terracotta"
    >
      Substack
    </a>
    <a
      v-if="links.email"
      :href="`mailto:${links.email}`"
      class="text-ink hover:text-terracotta"
    >
      Email
    </a>
  </div>
</template>
