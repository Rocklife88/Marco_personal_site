<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { Compass, ArrowRight } from '@lucide/vue'
import links from '../data/links'
import BrandIcon from '../components/BrandIcon.vue'
import LoquisLogo from '../components/icons/LoquisLogo.vue'
import VideoEmbed from '../components/VideoEmbed.vue'

useHead({
  title: 'Su e giù per l\'Italia — Marco Pellegrini, scrittore',
  meta: [
    {
      name: 'description',
      content: 'Su e giù per l\'Italia: viaggio nelle emozioni tra luoghi, paesaggi, storie e ricordi dell\'Italia vista da Marco Pellegrini.'
    }
  ]
})
</script>

<template>
  <div class="mx-auto max-w-5xl px-6 py-16">
    <header class="max-w-3xl">
      <p class="eyebrow mb-3"><Compass :size="15" /> Progetto</p>
      <h1 class="text-4xl font-semibold tracking-tight text-ink sm:text-5xl">Su e giù per l'Italia</h1>
      <p class="mt-5 text-lg leading-relaxed text-ink/75">
        Un viaggio nelle emozioni, tra luoghi, sensazioni e storie. Anche qui vale la regola che uso per i libri:
        nessuna mappa, nessun itinerario deciso a tavolino. L'Italia non la racconto come una guida, ma come un
        respiro — fatto di luce, suoni, abitudini, persone, ricordi e piccole meraviglie che lasciano il segno.
      </p>
    </header>

    <div class="card mt-10 overflow-hidden p-3">
      <VideoEmbed youtube-id="EAZ2kvbesiI" title="Racconti dal canale — Su e giù per l'Italia" />
    </div>

    <div class="mt-8 grid gap-4 sm:grid-cols-2">
      <a
        v-if="links.youtube"
        :href="links.youtube"
        target="_blank"
        rel="noopener"
        class="card flex items-center gap-4 p-6 transition hover:-translate-y-1 hover:shadow-lg"
      >
        <BrandIcon name="youtube" :size="32" class="shrink-0" />
        <span class="flex flex-col gap-1">
          <span class="font-semibold text-ink">Su e giù per l'Italia con Marco</span>
          <span class="link-arrow">Guarda i video <ArrowRight :size="14" /></span>
        </span>
      </a>
      <a
        v-if="links.loquis"
        :href="links.loquis"
        target="_blank"
        rel="noopener"
        class="card flex items-center gap-4 p-6 transition hover:-translate-y-1 hover:shadow-lg"
      >
        <LoquisLogo :size="32" class="shrink-0" />
        <span class="flex flex-col gap-1">
          <span class="font-semibold text-ink">Loquis · canale ufficiale</span>
          <span class="link-arrow">Esplora il viaggio <ArrowRight :size="14" /></span>
        </span>
      </a>
      <a
        v-if="links.spotify"
        :href="links.spotify"
        target="_blank"
        rel="noopener"
        class="card flex items-center gap-4 p-6 transition hover:-translate-y-1 hover:shadow-lg sm:col-span-2"
      >
        <BrandIcon name="spotify" :size="32" class="shrink-0" />
        <span class="flex flex-col gap-1">
          <span class="font-semibold text-ink">Su e giù per l'Italia · il podcast</span>
          <span class="link-arrow">Ascolta su Spotify <ArrowRight :size="14" /></span>
        </span>
      </a>
    </div>
  </div>
</template>
