<script setup lang="ts">
import { computed, ref } from 'vue'
import { ExternalLink } from '@lucide/vue'
import type { Book } from '../data/books'
import videos, { channelUrl } from '../data/videos'
import VideoEmbed from './VideoEmbed.vue'

const props = defineProps<{ book: Book }>()

const imageFailed = ref(false)

const stores = [
  { key: 'ibs', label: 'IBS' },
  { key: 'amazon', label: 'Amazon' },
  { key: 'mondadori', label: 'Mondadori' },
  { key: 'feltrinelli', label: 'Feltrinelli' }
] as const

const availableStores = stores
  .map((store) => ({ ...store, url: props.book.linkStore[store.key] }))
  .filter((store) => store.url)

const bookVideos = computed(() =>
  videos
    .filter((video) => video.title.toLowerCase().includes(props.book.titolo.toLowerCase()))
    .map((video) => video.id)
)
</script>

<template>
  <article class="mx-auto max-w-5xl px-6 py-12">
    <div class="card flex flex-col gap-8 p-6 sm:p-8 lg:flex-row">
      <div class="aspect-[2/3] w-full max-w-xs self-start overflow-hidden rounded-[22px] bg-gradient-to-br from-terracotta/15 to-ocra/15 shadow">
        <img
          v-if="!imageFailed"
          :src="book.copertina"
          :alt="`Copertina di ${props.book.titolo}`"
          class="h-full w-full object-cover"
          @error="imageFailed = true"
        />
        <div v-else class="flex h-full w-full flex-col items-center justify-center gap-2 p-4 text-center">
          <span class="text-xs uppercase tracking-wide text-ink/40">Marco Pellegrini</span>
          <span class="font-semibold text-ink">{{ book.titolo }}</span>
        </div>
      </div>

      <div class="flex flex-1 flex-col gap-5">
        <div>
          <p class="eyebrow mb-3">Libro</p>
          <h1 class="text-3xl font-semibold text-ink sm:text-4xl">{{ book.titolo }}</h1>
          <p class="mt-2 text-sm text-ink/60">
            {{ book.anno }} &middot; {{ book.editore }}
            <span v-if="book.esordio"> &middot; romanzo d'esordio</span>
          </p>
        </div>

        <p class="text-lg leading-relaxed text-ink/80">{{ book.sinossi }}</p>

        <div v-if="availableStores.length" class="flex flex-wrap gap-3 pt-2">
          <a
            v-for="store in availableStores"
            :key="store.key"
            :href="store.url"
            target="_blank"
            rel="noopener"
            class="btn btn-primary"
          >
            Acquista su {{ store.label }} <ExternalLink :size="14" />
          </a>
        </div>

        <div class="rounded-2xl border border-ink/5 bg-ink/[0.02] p-4">
          <div class="mb-3 flex items-center justify-between gap-3">
            <p class="font-sans text-sm font-medium text-ink">Guarda anche</p>
            <a
              :href="channelUrl"
              target="_blank"
              rel="noopener"
              class="link-arrow"
            >
              Canale YouTube <ExternalLink :size="14" />
            </a>
          </div>

          <div v-if="bookVideos.length" class="grid gap-4 md:grid-cols-3">
            <a
              v-for="videoId in bookVideos"
              :key="videoId"
              :href="`https://www.youtube.com/watch?v=${videoId}`"
              target="_blank"
              rel="noopener"
              class="block overflow-hidden rounded-xl border border-ink/5 bg-white transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <VideoEmbed :youtube-id="videoId" :title="`${book.titolo} video`" />
            </a>
          </div>

          <div v-else class="text-sm text-ink/60">
            Scopri i racconti, i viaggi e i video del canale su YouTube.
          </div>
        </div>
      </div>
    </div>
  </article>
</template>
