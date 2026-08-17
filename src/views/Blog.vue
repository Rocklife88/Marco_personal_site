<script setup lang="ts">
import { computed, ref } from 'vue'
import { useHead } from '@unhead/vue'
import { MapPin, Clock, ArrowRight, ChevronDown } from '@lucide/vue'
import posts from '../data/blog'
import { getCategory, getUniqueCategories } from '../data/categoryMap'

const categories = getUniqueCategories(posts)
const selectedCategory = ref('Tutte')

const sortedPosts = [...posts].sort((a, b) => Number(b.publishedAt) - Number(a.publishedAt))

const filteredPosts = computed(() => {
  if (selectedCategory.value === 'Tutte') {
    return sortedPosts
  }

  return sortedPosts.filter((post) => getCategory(post) === selectedCategory.value)
})

useHead({
  title: 'Blog — Marco Pellegrini, scrittore',
  meta: [
    {
      name: 'description',
      content: 'Il blog di Marco Pellegrini: viaggi emozionali tra regioni italiane, luoghi, ricordi e storie che restano.'
    }
  ]
})
</script>

<template>
  <div class="mx-auto max-w-6xl px-6 py-16">
    <header class="mb-12 max-w-3xl">
      <p class="eyebrow mb-3"><MapPin :size="15" /> Blog</p>
      <h1 class="text-4xl font-semibold tracking-tight text-ink sm:text-5xl">Viaggi in Italia, tra ricordi e emozioni</h1>
      <p class="mt-4 text-lg leading-relaxed text-ink/75">
        Racconti e itinerari nati per strada, non a tavolino: la parte più vera del mio archivio di viaggio,
        raccolta qui in un unico posto.
      </p>
    </header>

    <div class="mb-8">
      <label for="category-select" class="sr-only">Filtra per categoria</label>
      <div class="relative inline-block">
        <select
          id="category-select"
          v-model="selectedCategory"
          class="appearance-none rounded-full border border-ink/10 bg-surface py-2 pl-4 pr-9 text-sm font-medium text-ink transition focus:outline-none"
        >
          <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
        </select>
        <ChevronDown :size="14" class="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-ink/50" />
      </div>
    </div>

    <div class="grid gap-8 lg:grid-cols-2">
      <router-link
        v-for="post in filteredPosts"
        :key="post.slug"
        :to="`/blog/${post.slug}`"
        class="card group block overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-lg"
      >
        <img :src="post.image" :alt="post.title" class="h-64 w-full object-cover" />
        <div class="p-6">
          <div class="mb-3 flex items-center gap-2 font-sans text-xs uppercase tracking-[0.16em] text-ink/50">
            <MapPin :size="13" /> <span>{{ getCategory(post) }}</span>
            <span class="text-ink/30">·</span>
            <span>{{ post.publishedAt }}</span>
          </div>
          <h2 class="text-2xl font-semibold tracking-tight text-ink">{{ post.title }}</h2>
          <p class="mt-4 text-base leading-relaxed text-ink/70">{{ post.excerpt }}</p>
          <div class="mt-5 flex items-center justify-between border-t border-ink/5 pt-4 font-sans text-sm text-ink/60">
            <span class="inline-flex items-center gap-1.5"><Clock :size="14" /> {{ post.readTime }}</span>
            <span class="link-arrow">Leggi l'articolo <ArrowRight :size="14" /></span>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>
