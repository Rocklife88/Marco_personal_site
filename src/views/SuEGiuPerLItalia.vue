<script setup lang="ts">
import { useHead } from '@unhead/vue'
import links from '../data/links'

useHead({
  title: 'Su e giù per l\'Italia — Marco Pellegrini, scrittore',
  meta: [
    {
      name: 'description',
      content: 'Su e giù per l\'Italia: il progetto di viaggio di Marco Pellegrini attraverso le regioni italiane, tra video e racconti.'
    }
  ]
})
</script>

<template>
  <div class="mx-auto max-w-3xl px-6 py-16">
    <h1 class="mb-6 text-3xl font-semibold text-ink">Su e giù per l'Italia</h1>
    <div class="flex flex-col gap-4 leading-relaxed text-ink/80">
      <p>
        Un viaggio attraverso l'Italia, regione dopo regione, nato dalla stessa
        urgenza che ha dato forma a <router-link to="/libri/emozioni-ditalia" class="text-terracotta hover:underline">Emozioni d'Italia</router-link>:
        raccontare i luoghi attraverso le emozioni che lasciano, più che
        attraverso le cartoline.
      </p>
      <p>
        Il racconto del percorso continua sul blog e sul canale YouTube del
        progetto.
      </p>
      <div class="flex flex-wrap gap-3 pt-2">
        <a
          v-if="links.youtube"
          :href="links.youtube"
          target="_blank"
          rel="noopener"
          class="rounded-md bg-terracotta px-4 py-2 text-sm font-medium text-white hover:bg-terracotta-dark"
        >
          Guarda su YouTube
        </a>
        <a
          v-if="links.altervista"
          :href="links.altervista"
          target="_blank"
          rel="noopener"
          class="rounded-md border border-terracotta px-4 py-2 text-sm font-medium text-terracotta hover:bg-terracotta/10"
        >
          Leggi il blog
        </a>
      </div>
    </div>
  </div>
</template>
