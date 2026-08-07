<script setup lang="ts">
import { ref } from 'vue'
import type { Book } from '../data/books'

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
</script>

<template>
  <article class="mx-auto flex max-w-3xl flex-col gap-8 px-6 py-12 sm:flex-row">
    <div class="aspect-[2/3] w-full max-w-xs self-start overflow-hidden rounded-lg bg-gradient-to-br from-terracotta/15 to-ocra/15 shadow">
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
    <div class="flex flex-1 flex-col gap-4">
      <div>
        <h1 class="text-3xl font-semibold text-ink">{{ book.titolo }}</h1>
        <p class="text-sm text-ink/60">
          {{ book.anno }} &middot; {{ book.editore }}
          <span v-if="book.esordio"> &middot; romanzo d'esordio</span>
        </p>
      </div>
      <p class="leading-relaxed text-ink/80">{{ book.sinossi }}</p>
      <div v-if="availableStores.length" class="flex flex-wrap gap-3 pt-2">
        <a
          v-for="store in availableStores"
          :key="store.key"
          :href="store.url"
          target="_blank"
          rel="noopener"
          class="rounded-md bg-terracotta px-4 py-2 text-sm font-medium text-white hover:bg-terracotta-dark"
        >
          Acquista su {{ store.label }}
        </a>
      </div>
    </div>
  </article>
</template>
