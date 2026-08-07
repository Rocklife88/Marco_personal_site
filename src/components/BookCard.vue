<script setup lang="ts">
import type { Book } from '../data/books'

defineProps<{ book: Book }>()
</script>

<template>
  <router-link
    :to="`/libri/${book.slug}`"
    class="group flex flex-col overflow-hidden rounded-lg border border-ocra/20 bg-white transition hover:shadow-lg"
  >
    <img
      :src="book.copertina"
      :alt="`Copertina di ${book.titolo}`"
      class="aspect-[2/3] w-full object-cover"
      loading="lazy"
    />
    <div class="flex flex-1 flex-col gap-1 p-4">
      <h3 class="font-semibold text-ink group-hover:text-terracotta">
        {{ book.titolo }}
      </h3>
      <p class="text-sm text-ink/60">{{ book.anno }} &middot; {{ book.editore }}</p>
    </div>
  </router-link>
</template>
