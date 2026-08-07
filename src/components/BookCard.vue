<script setup lang="ts">
import { ref } from 'vue'
import type { Book } from '../data/books'

const props = defineProps<{ book: Book }>()

const imageFailed = ref(false)
</script>

<template>
  <router-link
    :to="`/libri/${book.slug}`"
    class="group flex flex-col overflow-hidden rounded-xl border border-ocra/20 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
  >
    <div class="aspect-[2/3] w-full overflow-hidden bg-gradient-to-br from-terracotta/15 to-ocra/15">
      <img
        v-if="!imageFailed"
        :src="book.copertina"
        :alt="`Copertina di ${props.book.titolo}`"
        class="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        loading="lazy"
        @error="imageFailed = true"
      />
      <div
        v-else
        class="flex h-full w-full flex-col items-center justify-center gap-2 p-4 text-center"
      >
        <span class="text-xs uppercase tracking-wide text-ink/40">Marco Pellegrini</span>
        <span class="font-semibold text-ink">{{ book.titolo }}</span>
      </div>
    </div>
    <div class="flex flex-1 flex-col gap-1 p-4">
      <h3 class="font-semibold text-ink group-hover:text-terracotta">
        {{ book.titolo }}
      </h3>
      <p class="text-sm text-ink/60">{{ book.anno }} &middot; {{ book.editore }}</p>
    </div>
  </router-link>
</template>
