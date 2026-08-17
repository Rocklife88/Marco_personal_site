<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '@unhead/vue'
import { ArrowLeft, MapPin, Clock } from '@lucide/vue'
import posts from '../data/blog'
import { getCategory } from '../data/categoryMap'

type Block = { type: 'text'; text: string; lede: boolean } | { type: 'image'; src: string }

const route = useRoute()
const post = computed(() => posts.find((item) => item.slug === route.params.slug))

// The first image is already shown as the article hero; the rest of the
// gallery is distributed evenly through the body so the piece reads like
// the original photo-journal rather than a wall of text.
const contentBlocks = computed<Block[]>(() => {
  const paragraphs = post.value?.body ?? []
  const gallery = (post.value?.images ?? []).slice(1)

  const blocks: Block[] = []
  const gap = gallery.length ? Math.max(1, Math.ceil(paragraphs.length / (gallery.length + 1))) : Infinity
  let imgIndex = 0

  paragraphs.forEach((text, index) => {
    blocks.push({ type: 'text', text, lede: index === 0 })
    if ((index + 1) % gap === 0 && imgIndex < gallery.length) {
      blocks.push({ type: 'image', src: gallery[imgIndex] })
      imgIndex += 1
    }
  })

  while (imgIndex < gallery.length) {
    blocks.push({ type: 'image', src: gallery[imgIndex] })
    imgIndex += 1
  }

  return blocks
})

useHead({
  title: computed(() => post.value ? `${post.value.title} — Marco Pellegrini` : 'Articolo non trovato'),
  meta: [
    {
      name: 'description',
      content: computed(() => post.value ? post.value.excerpt : 'Articolo non trovato')
    }
  ]
})
</script>

<template>
  <div v-if="post" class="mx-auto max-w-4xl px-6 py-16">
    <div class="mb-8">
      <router-link to="/blog" class="link-arrow"><ArrowLeft :size="14" /> Torna al diario</router-link>
    </div>

    <header class="mb-10">
      <div class="mb-4 flex flex-wrap items-center gap-3 font-sans text-xs uppercase tracking-[0.18em] text-ink/50">
        <span class="inline-flex items-center gap-1.5"><MapPin :size="13" /> {{ getCategory(post) }}</span>
        <span class="text-ink/30">·</span>
        <span>{{ post.publishedAt }}</span>
        <span class="text-ink/30">·</span>
        <span class="inline-flex items-center gap-1.5"><Clock :size="13" /> {{ post.readTime }}</span>
      </div>
      <h1 class="text-4xl font-semibold tracking-tight text-ink sm:text-5xl">{{ post.title }}</h1>
    </header>

    <img :src="post.image" :alt="post.title" class="mb-8 h-[420px] w-full rounded-[28px] object-cover shadow-[0_24px_70px_rgba(33,26,22,0.12)]" />

    <article class="prose prose-lg max-w-none text-ink/80">
      <template v-for="(block, index) in contentBlocks" :key="index">
        <p
          v-if="block.type === 'text'"
          class="leading-relaxed text-ink/75"
          :class="block.lede ? 'text-xl leading-relaxed' : 'mt-6 text-lg'"
        >
          {{ block.text }}
        </p>
        <img
          v-else
          :src="block.src"
          :alt="post.title"
          loading="lazy"
          class="my-8 h-72 w-full rounded-[24px] object-cover shadow-[0_20px_50px_rgba(33,26,22,0.1)] sm:h-96"
        />
      </template>
    </article>

    <div v-if="post.sourceUrl" class="mt-10 border-t border-ink/5 pt-8 text-sm text-ink/60">
      <span>Fonte:</span>
      <a :href="post.sourceUrl" target="_blank" rel="noopener" class="ml-2 font-medium text-accent hover:underline">
        articolo originale
      </a>
    </div>
  </div>

  <div v-else class="mx-auto max-w-3xl px-6 py-24 text-center">
    <p class="eyebrow justify-center">404</p>
    <h1 class="mt-4 text-4xl font-semibold text-ink">Articolo non trovato</h1>
    <p class="mt-4 text-lg text-ink/70">L'articolo che stai cercando non è disponibile.</p>
    <router-link to="/blog" class="btn btn-primary mt-8">
      Torna al diario
    </router-link>
  </div>
</template>
