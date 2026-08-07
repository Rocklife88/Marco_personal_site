<script setup lang="ts">
import { useHead } from '@unhead/vue'
import links from '../data/links'

useHead({
  title: 'Blog — Marco Pellegrini, scrittore',
  meta: [
    {
      name: 'description',
      content: 'Articoli e riflessioni di Marco Pellegrini su scrittura, viaggi e libri.'
    }
  ]
})
</script>

<template>
  <div class="mx-auto max-w-3xl px-6 py-16">
    <h1 class="mb-6 text-3xl font-semibold text-ink">Blog</h1>
    <p class="leading-relaxed text-ink/80">
      Scrivo regolarmente su Substack, con qualche articolo di viaggio anche sul
      blog di "Su e giù per l'Italia". I contenuti restano lì, per non
      duplicarli: qui trovi i link diretti.
    </p>
    <div class="mt-6 flex flex-wrap gap-3">
      <a
        v-if="links.substack"
        :href="links.substack"
        target="_blank"
        rel="noopener"
        class="rounded-md bg-terracotta px-4 py-2 text-sm font-medium text-white hover:bg-terracotta-dark"
      >
        Leggi su Substack
      </a>
      <a
        v-if="links.altervista"
        :href="links.altervista"
        target="_blank"
        rel="noopener"
        class="rounded-md border border-terracotta px-4 py-2 text-sm font-medium text-terracotta hover:bg-terracotta/10"
      >
        Blog di viaggio
      </a>
    </div>
  </div>
</template>
