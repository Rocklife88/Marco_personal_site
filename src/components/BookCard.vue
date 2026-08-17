<script setup lang="ts">
import { ref } from 'vue'
import type { Book } from '../data/books'

const props = withDefaults(defineProps<{ book: Book; coverOnly?: boolean }>(), { coverOnly: false })

const imageFailed = ref(false)
</script>

<template>
  <router-link
    :to="`/libri/${book.slug}`"
    class="card group flex flex-col overflow-hidden shadow-[0_12px_30px_rgba(33,26,22,0.08)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_rgba(33,26,22,0.16)]"
  >
    <div
      class="relative w-full overflow-hidden bg-gradient-to-br from-terracotta/15 to-ocra/15"
      :class="coverOnly ? 'aspect-[3/4]' : 'aspect-[2/3]'"
    >
      <div class="absolute inset-y-0 left-0 w-1.5 bg-black/10" />
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
        <span class="font-sans text-xs uppercase tracking-wide text-ink/40">Marco Pellegrini</span>
        <span class="font-semibold text-ink">{{ book.titolo }}</span>
      </div>
    </div>
    <div v-if="!coverOnly" class="flex flex-1 flex-col gap-1 p-4">
      <h3 class="font-display font-semibold leading-snug text-ink group-hover:text-accent">
        {{ book.titolo }}
      </h3>
      <p class="font-sans text-sm text-ink/55">{{ book.anno }} &middot; {{ book.editore }}</p>
    </div>
  </router-link>
</template>
