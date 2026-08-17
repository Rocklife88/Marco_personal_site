<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { Film } from '@lucide/vue'
import videos, { channelUrl } from '../data/videos'
import links from '../data/links'
import BrandIcon from '../components/BrandIcon.vue'
import LoquisLogo from '../components/icons/LoquisLogo.vue'
import VideoEmbed from '../components/VideoEmbed.vue'

useHead({ title: 'Il mio canale — Marco Pellegrini' })
</script>

<template>
  <div class="mx-auto max-w-6xl px-6 py-16">
    <header class="mb-8">
      <p class="eyebrow mb-3"><Film :size="15" /> Canale</p>
      <h1 class="text-3xl font-semibold text-ink">Il mio canale</h1>
      <p class="mt-3 text-base text-ink/75">I video e gli audio di Su e giù per l'Italia, raccolti in un solo posto: il lato in movimento delle storie che scrivo.</p>
    </header>

    <section class="grid gap-8 lg:grid-cols-2">
      <div class="card overflow-hidden p-3">
        <VideoEmbed :youtube-id="videos[0].id" :title="videos[0].title" />
        <div class="mt-4 flex gap-3 px-1 pb-1">
          <a :href="channelUrl" target="_blank" rel="noopener" class="btn btn-primary">
            <BrandIcon name="youtube" :size="16" monochrome class="text-white" /> Apri su YouTube
          </a>
          <a v-if="links.loquis" :href="links.loquis" target="_blank" rel="noopener" class="btn btn-outline">
            <LoquisLogo :size="16" /> Apri su Loquis
          </a>
        </div>
      </div>

      <div>
        <h2 class="mb-4 text-xl font-semibold text-ink">Ultimi video</h2>
        <div class="grid gap-4 md:grid-cols-1">
          <a
            v-for="v in videos"
            :key="v.id"
            :href="v.url"
            target="_blank"
            rel="noopener"
            class="card block overflow-hidden transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            <VideoEmbed :youtube-id="v.id" :title="v.title" />
            <div class="p-3">
              <div class="text-sm font-medium text-ink">{{ v.title }}</div>
            </div>
          </a>
        </div>
      </div>
    </section>
  </div>
</template>
