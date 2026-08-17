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
      content: 'Su e giù per l\'Italia: un viaggio verso dentro, tra strade poco battute e storie poco raccontate, per innamorarsi della bellezza del nostro paese.'
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
        Viaggiare non è mai banale. Ti ricorda che hai due occhi per vedere il mondo, un palato fatto apposta per
        scoprire nuovi sapori, orecchie che sanno restituirti un pascolo di montagna o lo sciabordio del mare anche
        solo chiudendo gli occhi. Mi vedo in movimento da quando ho ricordi: curioso, deciso a scoprire le storie
        dei posti in cui abito, che visito, di cui mi innamoro.
      </p>
    </header>

    <div class="mt-12 max-w-3xl space-y-5 text-lg leading-relaxed text-ink/75">
      <p>
        Questo progetto è nato così: alla soglia dei trent'anni, con parecchi viaggi alle spalle e — complice la
        pandemia — gli occhi spalancati per la prima volta, in maniera più profonda, sul paese straordinario che
        abito. L'Italia è immensa, infinita, eppure si perde tra le pieghe di un mappamondo. Come diceva mio nonno,
        toscano: <span class="font-display italic">"nelle botti piccine ci sta il vino buono."</span>
      </p>
      <p>
        Da lì ho iniziato un viaggio inverso. Ho smesso di viaggiare fuori e ho cominciato a viaggiare dentro — verso
        le strade poco battute, le storie poco raccontate, gli anfratti dimenticati. Perdermi per ritrovare strade,
        certezze, idee nuove. Lo scopo di questo blog, di questo canale, è uno solo: prendervi per mano e farvi
        innamorare della bellezza.
      </p>
    </div>

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
          <span class="link-arrow">Iscriviti al canale e guarda i video <ArrowRight :size="14" /></span>
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
          <span class="link-arrow">Ascolta su Loquis <ArrowRight :size="14" /></span>
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
