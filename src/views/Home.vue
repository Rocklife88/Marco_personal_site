<script setup lang="ts">
import { useHead } from '@unhead/vue'
import books from '../data/books'
import BookCard from '../components/BookCard.vue'

const latestBook = [...books].sort((a, b) => b.anno - a.anno)[0]

useHead({
  title: 'Marco Pellegrini, scrittore — romanzi e memoir di viaggio',
  meta: [
    {
      name: 'description',
      content:
        'Marco Pellegrini, scrittore lucchese classe 1988. Romanzi e memoir di viaggio: 17:17, Quello che resta, Emozioni d\'Italia, In un giorno qualunque.'
    }
  ]
})
</script>

<template>
  <div class="mx-auto max-w-5xl px-6 py-16">
    <section class="flex flex-col gap-4">
      <h1 class="text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
        Marco Pellegrini, scrittore
      </h1>
      <p class="max-w-2xl text-lg leading-relaxed text-ink/70">
        Romanzi e memoir di viaggio nati in Toscana. Storie di ritorni, radici e
        incontri che cambiano la vita — dal debutto di 17:17 all'ultimo romanzo,
        In un giorno qualunque.
      </p>
      <router-link
        to="/libri"
        class="w-fit rounded-md bg-terracotta px-5 py-2.5 text-sm font-medium text-white hover:bg-terracotta-dark"
      >
        Scopri i libri
      </router-link>
    </section>

    <section v-if="latestBook" class="mt-16">
      <h2 class="mb-4 text-xl font-semibold text-ink">Ultimo libro</h2>
      <div class="max-w-xs">
        <BookCard :book="latestBook" />
      </div>
    </section>

    <section class="mt-16">
      <h2 class="mb-4 text-xl font-semibold text-ink">Tutti i libri</h2>
      <div class="grid grid-cols-2 gap-6 sm:grid-cols-4">
        <BookCard v-for="book in books" :key="book.slug" :book="book" />
      </div>
    </section>

    <section class="mt-16 rounded-lg border border-ocra/20 bg-white p-8">
      <h2 class="mb-2 text-xl font-semibold text-ink">Su e giù per l'Italia</h2>
      <p class="text-ink/70">
        Un viaggio attraverso l'Italia, regione dopo regione, tra video e racconti.
      </p>
      <router-link
        to="/su-e-giu-per-litalia"
        class="mt-4 inline-block text-sm font-medium text-terracotta hover:underline"
      >
        Scopri il progetto &rarr;
      </router-link>
    </section>
  </div>
</template>
