<script setup lang="ts">
import { useHead } from '@unhead/vue'
import books from '../data/books'
import BookCard from '../components/BookCard.vue'

useHead({
  title: 'Libri — Marco Pellegrini, scrittore',
  meta: [
    {
      name: 'description',
      content: 'I libri di Marco Pellegrini: 17:17, Quello che resta, Emozioni d\'Italia, In un giorno qualunque.'
    }
  ]
})
</script>

<template>
  <div class="mx-auto max-w-5xl px-6 py-16">
    <h1 v-reveal class="mb-8 text-3xl font-semibold text-ink">I miei libri</h1>
    <div class="grid grid-cols-2 gap-6 sm:grid-cols-4">
      <BookCard v-for="book in books" :key="book.slug" v-reveal :book="book" />
    </div>
  </div>
</template>
