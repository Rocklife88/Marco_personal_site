<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '@unhead/vue'
import { ArrowLeft, MapPin, Clock } from '@lucide/vue'
import posts from '../data/blog'
import { getCategory } from '../data/categoryMap'

type Block = { type: 'text'; text: string; lede: boolean } | { type: 'image'; src: string }
type SubBlock = { kind: 'h2'; text: string } | { kind: 'quote'; text: string } | { kind: 'p'; html: string }

const route = useRoute()
const post = computed(() => posts.find((item) => item.slug === route.params.slug))

// Body paragraphs are plain strings written by hand in src/data/blog.ts. A short
// first line with no closing punctuation reads as a section title (the original
// source used real headings there); a line wrapped in quotes reads as a pull quote.
// `**bold**` can be used inline anywhere to emphasise a phrase.
function isHeadingLine(line: string) {
  if (line.length > 60) return false
  if (/[.!?,;]$/.test(line)) return false
  if (/^(https?:\/\/|fonte:)/i.test(line)) return false
  return true
}

function isQuoteLine(line: string) {
  return /^["“].+["”]$/.test(line)
}

function escapeHtml(text: string) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function renderInline(text: string) {
  return escapeHtml(text).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
}

function splitParagraph(text: string): SubBlock[] {
  const lines = text.split('\n').map((line) => line.trim()).filter(Boolean)
  return lines.map((line, index) => {
    if (isQuoteLine(line)) return { kind: 'quote', text: line }
    if (index === 0 && isHeadingLine(line)) return { kind: 'h2', text: line }
    return { kind: 'p', html: renderInline(line) }
  })
}

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
      <div class="mb-4 flex flex-wrap items-center gap-3">
        <span class="tag"><MapPin :size="12" /> {{ getCategory(post) }}</span>
        <span class="font-sans text-xs uppercase tracking-[0.18em] text-ink/50">{{ post.publishedAt }}</span>
        <span class="text-ink/30">·</span>
        <span class="inline-flex items-center gap-1.5 font-sans text-xs uppercase tracking-[0.18em] text-ink/50"><Clock :size="13" /> {{ post.readTime }}</span>
      </div>
      <h1 class="text-4xl font-semibold tracking-tight text-ink sm:text-5xl">{{ post.title }}</h1>
    </header>

    <div class="mb-8 flex max-h-[520px] items-center justify-center overflow-hidden rounded-[28px] bg-ink/[0.03] shadow-[0_24px_70px_rgba(33,26,22,0.12)]">
      <img :src="post.image" :alt="post.title" class="max-h-[520px] w-full object-contain" />
    </div>

    <article class="max-w-none text-ink/80">
      <template v-for="(block, index) in contentBlocks" :key="index">
        <p
          v-if="block.type === 'text' && block.lede"
          class="text-xl leading-relaxed text-ink/80"
          v-html="renderInline(block.text)"
        ></p>
        <template v-else-if="block.type === 'text'">
          <template v-for="(sub, subIndex) in splitParagraph(block.text)" :key="subIndex">
            <h2
              v-if="sub.kind === 'h2'"
              class="mb-4 mt-10 text-2xl font-semibold tracking-tight text-ink sm:text-3xl"
            >
              {{ sub.text }}
            </h2>
            <blockquote
              v-else-if="sub.kind === 'quote'"
              class="my-6 border-l-2 border-accent/40 pl-5 font-display text-xl italic leading-snug text-ink/70"
            >
              {{ sub.text }}
            </blockquote>
            <p v-else class="mt-5 text-lg leading-relaxed text-ink/75" v-html="sub.html"></p>
          </template>
        </template>
        <div
          v-else
          class="my-8 flex max-h-[420px] items-center justify-center overflow-hidden rounded-[24px] bg-ink/[0.03] shadow-[0_20px_50px_rgba(33,26,22,0.1)] sm:max-h-[480px]"
        >
          <img
            :src="block.src"
            :alt="post.title"
            loading="lazy"
            class="max-h-[420px] w-full object-contain sm:max-h-[480px]"
          />
        </div>
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
