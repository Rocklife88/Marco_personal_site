<script setup lang="ts">
import { computed, ref } from 'vue'
import { useHead } from '@unhead/vue'

useHead({
  title: 'Admin — Marco Pellegrini',
  meta: [{ name: 'robots', content: 'noindex, nofollow' }]
})

interface BlogDraft {
  title: string
  slug: string
  excerpt: string
  region: string
  publishedAt: string
  readTime: string
  image: string
  category: string
  body: string[]
}

const defaultDraft: BlogDraft = {
  title: '',
  slug: '',
  excerpt: '',
  region: 'Italia',
  publishedAt: '2026',
  readTime: '4 min lettura',
  image: '',
  category: 'Viaggio',
  body: ['']
}

const draft = ref<BlogDraft>({ ...defaultDraft })
const saved = ref<string[]>([])

const storageKey = 'marco-blog-admin-drafts'

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

function updateSlug() {
  if (!draft.value.slug || draft.value.slug !== slugify(draft.value.title)) {
    draft.value.slug = slugify(draft.value.title)
  }
}

function addParagraph() {
  draft.value.body.push('')
}

function removeParagraph(index: number) {
  draft.value.body.splice(index, 1)
  if (draft.value.body.length === 0) draft.value.body = ['']
}

function exportDraft() {
  const item: BlogDraft = {
    ...draft.value,
    slug: draft.value.slug || slugify(draft.value.title),
    body: draft.value.body.filter((p) => p.trim().length > 0)
  }

  const list = JSON.parse(localStorage.getItem(storageKey) || '[]') as BlogDraft[]
  const next = [item, ...list]
  localStorage.setItem(storageKey, JSON.stringify(next))
  saved.value = next.map((entry) => entry.slug)
}

function loadSaved() {
  const list = JSON.parse(localStorage.getItem(storageKey) || '[]') as BlogDraft[]
  saved.value = list.map((entry) => entry.slug)
  if (list.length > 0) {
    draft.value = { ...list[0] }
  }
}

const previewCode = computed(() => {
  const body = draft.value.body.filter((p) => p.trim().length > 0)
  return JSON.stringify(
    {
      slug: draft.value.slug || slugify(draft.value.title),
      title: draft.value.title,
      excerpt: draft.value.excerpt,
      region: draft.value.region,
      publishedAt: draft.value.publishedAt,
      readTime: draft.value.readTime,
      image: draft.value.image || '/images/placeholder.jpg',
      sourceUrl: `https://suegiuperlitalia.altervista.org/${draft.value.slug || slugify(draft.value.title)}/`,
      body
    },
    null,
    2
  )
})

loadSaved()
</script>

<template>
  <div class="mx-auto max-w-7xl px-6 py-16">
    <header class="mb-10 text-center">
      <p class="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-accent">Admin</p>
      <h1 class="text-4xl font-semibold tracking-tight text-ink">Nuovo articolo blog</h1>
      <p class="mt-3 text-ink/70">Editor semplice, senza backend. Tutto resta in locale e può essere esportato in JSON o copiado in un file.</p>
    </header>

    <div class="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
      <div class="space-y-6 rounded-[28px] border border-ink/5 bg-white p-6 shadow-[0_20px_50px_rgba(33,26,22,0.05)]">
        <div>
          <label class="mb-2 block text-sm font-medium text-ink">Titolo</label>
          <input v-model="draft.title" @input="updateSlug" class="w-full rounded-2xl border border-ink/10 bg-cream px-4 py-3 outline-none focus:border-accent" placeholder="Titolo dell'articolo" />
        </div>

        <div>
          <label class="mb-2 block text-sm font-medium text-ink">Slug</label>
          <input v-model="draft.slug" class="w-full rounded-2xl border border-ink/10 bg-cream px-4 py-3 outline-none focus:border-accent" placeholder="slug-articolo" />
        </div>

        <div>
          <label class="mb-2 block text-sm font-medium text-ink">Abstract / Excerpt</label>
          <textarea v-model="draft.excerpt" rows="3" class="w-full rounded-2xl border border-ink/10 bg-cream px-4 py-3 outline-none focus:border-accent" placeholder="Breve intro del post" />
        </div>

        <div class="grid gap-4 sm:grid-cols-2">
          <div>
            <label class="mb-2 block text-sm font-medium text-ink">Regione</label>
            <input v-model="draft.region" class="w-full rounded-2xl border border-ink/10 bg-cream px-4 py-3 outline-none focus:border-accent" placeholder="Toscana" />
          </div>
          <div>
            <label class="mb-2 block text-sm font-medium text-ink">Anno</label>
            <input v-model="draft.publishedAt" class="w-full rounded-2xl border border-ink/10 bg-cream px-4 py-3 outline-none focus:border-accent" placeholder="2026" />
          </div>
          <div>
            <label class="mb-2 block text-sm font-medium text-ink">Tempo lettura</label>
            <input v-model="draft.readTime" class="w-full rounded-2xl border border-ink/10 bg-cream px-4 py-3 outline-none focus:border-accent" placeholder="4 min lettura" />
          </div>
          <div>
            <label class="mb-2 block text-sm font-medium text-ink">Categoria</label>
            <input v-model="draft.category" class="w-full rounded-2xl border border-ink/10 bg-cream px-4 py-3 outline-none focus:border-accent" placeholder="Viaggio" />
          </div>
        </div>

        <div>
          <label class="mb-2 block text-sm font-medium text-ink">URL immagine</label>
          <input v-model="draft.image" class="w-full rounded-2xl border border-ink/10 bg-cream px-4 py-3 outline-none focus:border-accent" placeholder="/images/blog-import/xxx.jpg o https://..." />
        </div>

        <div>
          <div class="mb-3 flex items-center justify-between">
            <label class="block text-sm font-medium text-ink">Contenuto</label>
            <button type="button" @click="addParagraph" class="rounded-full border border-accent/30 bg-accent/5 px-3 py-1.5 text-xs font-medium text-accent">+ paragrafo</button>
          </div>

          <div v-for="(_, index) in draft.body" :key="index" class="mb-3 flex gap-3">
            <textarea v-model="draft.body[index]" rows="4" class="w-full rounded-2xl border border-ink/10 bg-cream px-4 py-3 outline-none focus:border-accent" :placeholder="`Paragrafo ${index + 1}`" />
            <button v-if="draft.body.length > 1" type="button" @click="removeParagraph(index)" class="self-start rounded-full border border-ink/10 px-2 py-1 text-xs text-ink/60">Rimuovi</button>
          </div>
        </div>

        <div class="flex flex-wrap gap-3">
          <button type="button" @click="exportDraft" class="rounded-full bg-accent px-5 py-3 text-sm font-medium text-white hover:bg-accent-dark">Salva in locale</button>
          <router-link to="/blog" class="rounded-full border border-ink/10 bg-white px-5 py-3 text-sm font-medium text-ink hover:text-accent">Vedi blog</router-link>
        </div>
      </div>

      <div class="rounded-[28px] border border-ink/5 bg-white p-6 shadow-[0_20px_50px_rgba(33,26,22,0.05)]">
        <h2 class="text-xl font-semibold text-ink">Anteprima JSON</h2>
        <pre class="mt-4 max-h-[640px] overflow-auto rounded-2xl bg-[#1f1a17] p-4 text-xs leading-6 text-[#f5e9de]">{{ previewCode }}</pre>

        <div v-if="saved.length" class="mt-6 border-t border-ink/5 pt-5">
          <p class="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-ink/50">Salvati</p>
          <ul class="space-y-2 text-sm text-ink/70">
            <li v-for="item in saved.slice(0, 8)" :key="item">{{ item }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
