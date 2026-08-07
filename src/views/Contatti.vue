<script setup lang="ts">
import { useHead } from '@unhead/vue'
import links from '../data/links'
import SocialLinks from '../components/SocialLinks.vue'

useHead({
  title: 'Contatti — Marco Pellegrini, scrittore',
  meta: [
    {
      name: 'description',
      content: 'Contatta Marco Pellegrini, scrittore: email e social.'
    }
  ]
})
</script>

<template>
  <div class="mx-auto max-w-3xl px-6 py-16">
    <h1 class="mb-6 text-3xl font-semibold text-ink">Contatti</h1>
    <p class="leading-relaxed text-ink/80">
      Per informazioni su presentazioni, eventi o collaborazioni, scrivimi.
    </p>
    <p v-if="links.email" class="mt-4">
      <a :href="`mailto:${links.email}`" class="text-terracotta hover:underline">
        {{ links.email }}
      </a>
    </p>
    <div class="mt-8">
      <SocialLinks />
    </div>
  </div>
</template>
