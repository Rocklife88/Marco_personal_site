<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '@unhead/vue'
import books from '../data/books'
import BookDetail from '../components/BookDetail.vue'

const route = useRoute()

const book = computed(() =>
  books.find((b) => b.slug === route.params.slug)
)

useHead({
  title: computed(() =>
    book.value
      ? `${book.value.titolo} — Marco Pellegrini, scrittore`
      : 'Libro non trovato — Marco Pellegrini'
  ),
  meta: [
    {
      name: 'description',
      content: computed(() => book.value?.sinossi ?? '')
    }
  ],
  script: computed(() =>
    book.value
      ? [
          {
            type: 'application/ld+json' as 'application/json',
            innerHTML: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Book',
              name: book.value.titolo,
              author: {
                '@type': 'Person',
                name: 'Marco Pellegrini'
              },
              datePublished: String(book.value.anno),
              publisher: book.value.editore,
              description: book.value.sinossi,
              image: book.value.copertina,
              url: `https://marcopellegrini.vercel.app/libri/${book.value.slug}`
            })
          }
        ]
      : []
  )
})
</script>

<template>
  <BookDetail v-if="book" :book="book" />
  <div v-else class="mx-auto max-w-3xl px-6 py-16 text-center">
    <p class="text-ink/70">Libro non trovato.</p>
    <router-link to="/libri" class="mt-4 inline-block text-accent hover:underline">
      Torna ai libri
    </router-link>
  </div>
</template>
