<script setup lang="ts">
import { useHead } from '@unhead/vue'
import links from '../data/links'

useHead({
  title: 'Su e giù per l\'Italia — Marco Pellegrini, scrittore',
  meta: [
    {
      name: 'description',
      content: 'Su e giù per l\'Italia: il progetto di viaggio di Marco Pellegrini attraverso le regioni italiane, tra video su YouTube e podcast su Spotify.'
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
        Il racconto del percorso continua sul canale YouTube e sul podcast,
        disponibile anche su Spotify.
      </p>
    </div>

    <div class="mt-8 grid gap-4 sm:grid-cols-2">
      <a
        v-if="links.youtube"
        :href="links.youtube"
        target="_blank"
        rel="noopener"
        class="flex flex-col gap-1 rounded-xl border border-ocra/20 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"
      >
        <span class="text-xs uppercase tracking-wide text-ink/50">YouTube</span>
        <span class="font-semibold text-ink">Su e giù per l'Italia con Marco</span>
        <span class="mt-1 text-sm text-terracotta">Guarda i video &rarr;</span>
      </a>
      <a
        v-if="links.spotify"
        :href="links.spotify"
        target="_blank"
        rel="noopener"
        class="flex flex-col gap-1 rounded-xl border border-ocra/20 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"
      >
        <span class="text-xs uppercase tracking-wide text-ink/50">Spotify / Podcast</span>
        <span class="font-semibold text-ink">Su e giù per l'Italia</span>
        <span class="mt-1 text-sm text-terracotta">Ascolta il podcast &rarr;</span>
      </a>
      <a
        v-if="links.altervista"
        :href="links.altervista"
        target="_blank"
        rel="noopener"
        class="flex flex-col gap-1 rounded-xl border border-ocra/20 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg sm:col-span-2"
      >
        <span class="text-xs uppercase tracking-wide text-ink/50">Blog</span>
        <span class="font-semibold text-ink">Il diario del viaggio</span>
        <span class="mt-1 text-sm text-terracotta">Leggi il blog &rarr;</span>
      </a>
    </div>
  </div>
</template>
