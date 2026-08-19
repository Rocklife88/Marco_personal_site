<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'
import { useHead } from '@unhead/vue'
import { splitParagraph } from '../utils/postFormatting'

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
  images: string[]
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
  images: [],
  category: 'Viaggio',
  body: ['']
}

const draft = ref<BlogDraft>({ ...defaultDraft })
const saved = ref<string[]>([])

const storageKey = 'marco-blog-admin-drafts'

// --- Formatting toolbar (H2 / bold) for the body textareas ---------------

const textareaRefs = ref<(HTMLTextAreaElement | null)[]>([])
function setTextareaRef(el: Element | null, index: number) {
  textareaRefs.value[index] = (el as HTMLTextAreaElement) ?? null
}

function applyFormat(index: number, type: 'h2' | 'bold') {
  const el = textareaRefs.value[index]
  const value = draft.value.body[index] ?? ''
  const start = el?.selectionStart ?? value.length
  const end = el?.selectionEnd ?? value.length
  const selected = value.slice(start, end)

  if (type === 'bold') {
    const insertText = selected || 'testo in grassetto'
    draft.value.body[index] = value.slice(0, start) + '**' + insertText + '**' + value.slice(end)
    nextTick(() => {
      if (!el) return
      const cursor = start + 2 + insertText.length + 2
      el.focus()
      el.setSelectionRange(cursor, cursor)
    })
    return
  }

  // H2: whatever is selected (or a placeholder) becomes the paragraph's first
  // line, matching the "short first line = heading" rule the site already reads.
  const headingText = selected || 'Titolo sezione'
  const rest = (selected ? value.slice(0, start) + value.slice(end) : value).replace(/^\n+/, '')
  draft.value.body[index] = rest ? `${headingText}\n${rest}` : headingText
  nextTick(() => {
    if (!el) return
    el.focus()
    el.setSelectionRange(headingText.length, headingText.length)
  })
}

// --- Photo upload straight to the project's public/images folder ---------
// Uses the File System Access API (Chrome/Edge only) to write files directly
// to disk from the browser, with no backend/server involved.

interface FSWritable {
  write: (data: Blob) => Promise<void>
  close: () => Promise<void>
}
interface FSFileHandle {
  createWritable: () => Promise<FSWritable>
}
interface FSDirHandle {
  getFileHandle: (name: string, options?: { create?: boolean }) => Promise<FSFileHandle>
}
declare global {
  interface Window {
    showDirectoryPicker?: (options?: { id?: string; mode?: 'read' | 'readwrite' }) => Promise<FSDirHandle>
  }
}

const canSaveLocally = typeof window !== 'undefined' && 'showDirectoryPicker' in window
const imagesDirHandle = ref<FSDirHandle | null>(null)
const uploadStatus = ref('')
const uploadError = ref('')

async function pickImagesFolder() {
  uploadError.value = ''
  try {
    imagesDirHandle.value = await window.showDirectoryPicker!({ id: 'blog-images', mode: 'readwrite' })
    uploadStatus.value = 'Cartella collegata: ora puoi caricare le foto.'
  } catch {
    // The user closed the picker without choosing a folder — nothing to do.
  }
}

const diacriticsPattern = new RegExp(`[${String.fromCharCode(0x300)}-${String.fromCharCode(0x36f)}]`, 'g')

function sanitizeFilename(name: string) {
  const dot = name.lastIndexOf('.')
  const base = dot > 0 ? name.slice(0, dot) : name
  const ext = dot > 0 ? name.slice(dot).toLowerCase() : ''
  const cleanBase = base
    .toLowerCase()
    .normalize('NFD')
    .replace(diacriticsPattern, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
  return `${cleanBase || 'foto'}${ext}`
}

async function saveFileToProject(file: File): Promise<string> {
  if (!imagesDirHandle.value) throw new Error('Collega prima la cartella immagini del progetto.')
  const filename = `${Date.now()}-${sanitizeFilename(file.name)}`
  const fileHandle = await imagesDirHandle.value.getFileHandle(filename, { create: true })
  const writable = await fileHandle.createWritable()
  await writable.write(file)
  await writable.close()
  return `/images/blog-import/${filename}`
}

async function onCoverFileChange(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  input.value = ''
  if (!file) return

  uploadError.value = ''
  try {
    draft.value.image = await saveFileToProject(file)
    uploadStatus.value = `Copertina salvata in ${draft.value.image}`
  } catch (err) {
    uploadError.value = err instanceof Error ? err.message : 'Errore nel salvataggio della foto.'
  }
}

async function onGalleryFilesChange(event: Event) {
  const input = event.target as HTMLInputElement
  const files = Array.from(input.files ?? [])
  input.value = ''
  if (!files.length) return

  uploadError.value = ''
  let added = 0
  for (const file of files) {
    try {
      draft.value.images.push(await saveFileToProject(file))
      added += 1
    } catch (err) {
      uploadError.value = err instanceof Error ? err.message : 'Errore nel salvataggio di una foto.'
      break
    }
  }
  if (added) uploadStatus.value = `${added} foto aggiunte alla galleria.`
}

function removeGalleryImage(index: number) {
  draft.value.images.splice(index, 1)
}

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
  const cover = draft.value.image || '/images/placeholder.jpg'
  const gallery = [cover, ...draft.value.images.filter(Boolean)]
  return JSON.stringify(
    {
      slug: draft.value.slug || slugify(draft.value.title),
      title: draft.value.title,
      excerpt: draft.value.excerpt,
      region: draft.value.region,
      publishedAt: draft.value.publishedAt,
      readTime: draft.value.readTime,
      image: cover,
      images: gallery,
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
      <p class="mt-3 text-ink/70">Editor semplice, senza backend. Tutto resta in locale e può essere esportato in JSON o copiato in un file.</p>
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

        <div class="rounded-2xl border border-ink/10 bg-cream/60 p-4">
          <label class="mb-2 block text-sm font-medium text-ink">Foto</label>

          <p v-if="!canSaveLocally" class="mb-3 rounded-xl bg-ocra/10 px-3 py-2 text-xs text-ink/70">
            Il tuo browser non supporta il salvataggio diretto dei file (funziona solo su Chrome/Edge desktop). Puoi comunque scrivere a mano il percorso dell'immagine qui sotto, dopo aver copiato il file in <code>public/images/blog-import/</code>.
          </p>

          <div v-if="canSaveLocally" class="mb-3 flex flex-wrap items-center gap-3">
            <button type="button" @click="pickImagesFolder" class="rounded-full border border-accent/30 bg-accent/5 px-3 py-1.5 text-xs font-medium text-accent">
              {{ imagesDirHandle ? 'Cambia cartella immagini' : 'Collega cartella "public/images/blog-import"' }}
            </button>
            <span v-if="imagesDirHandle" class="text-xs text-ink/50">Cartella collegata ✓</span>
          </div>
          <p v-if="uploadStatus" class="mb-3 text-xs text-accent">{{ uploadStatus }}</p>
          <p v-if="uploadError" class="mb-3 text-xs text-red-600">{{ uploadError }}</p>

          <div class="mb-4">
            <label class="mb-1 block text-xs font-medium text-ink/70">Copertina</label>
            <div class="flex flex-wrap items-center gap-3">
              <img v-if="draft.image" :src="draft.image" alt="Copertina" class="h-16 w-24 rounded-lg object-cover" />
              <input
                v-if="canSaveLocally"
                type="file"
                accept="image/*"
                :disabled="!imagesDirHandle"
                @change="onCoverFileChange"
                class="text-xs text-ink/70 file:mr-3 file:rounded-full file:border-0 file:bg-accent file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-white disabled:opacity-40"
              />
            </div>
            <input v-model="draft.image" class="mt-2 w-full rounded-2xl border border-ink/10 bg-cream px-4 py-3 text-sm outline-none focus:border-accent" placeholder="/images/blog-import/xxx.jpg o https://..." />
          </div>

          <div>
            <label class="mb-1 block text-xs font-medium text-ink/70">Galleria (foto nel corpo dell'articolo)</label>
            <input
              v-if="canSaveLocally"
              type="file"
              accept="image/*"
              multiple
              :disabled="!imagesDirHandle"
              @change="onGalleryFilesChange"
              class="mb-3 text-xs text-ink/70 file:mr-3 file:rounded-full file:border-0 file:bg-accent file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-white disabled:opacity-40"
            />
            <div v-if="draft.images.length" class="flex flex-wrap gap-2">
              <div v-for="(src, i) in draft.images" :key="src + i" class="group relative">
                <img :src="src" alt="" class="h-16 w-16 rounded-lg object-cover" />
                <button type="button" @click="removeGalleryImage(i)" class="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-ink text-[10px] text-white opacity-80 hover:opacity-100">✕</button>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div class="mb-3 flex items-center justify-between">
            <label class="block text-sm font-medium text-ink">Contenuto</label>
            <button type="button" @click="addParagraph" class="rounded-full border border-accent/30 bg-accent/5 px-3 py-1.5 text-xs font-medium text-accent">+ paragrafo</button>
          </div>

          <div v-for="(_, index) in draft.body" :key="index" class="mb-4 rounded-2xl border border-ink/10 bg-cream/60 p-3">
            <div class="mb-2 flex items-center justify-between">
              <div class="flex items-center gap-1.5">
                <button type="button" @click="applyFormat(index, 'h2')" title="Rendi la selezione un titolo H2" class="rounded-lg border border-ink/10 bg-white px-2 py-1 text-xs font-bold text-ink/70 hover:border-accent hover:text-accent">H2</button>
                <button type="button" @click="applyFormat(index, 'bold')" title="Grassetto" class="rounded-lg border border-ink/10 bg-white px-2 py-1 text-xs font-bold italic text-ink/70 hover:border-accent hover:text-accent">B</button>
                <span class="ml-1 text-xs text-ink/40">Paragrafo {{ index + 1 }}</span>
              </div>
              <button v-if="draft.body.length > 1" type="button" @click="removeParagraph(index)" class="text-xs text-ink/50 hover:text-red-600">Rimuovi</button>
            </div>

            <textarea
              :ref="(el) => setTextareaRef(el as Element | null, index)"
              v-model="draft.body[index]"
              rows="4"
              class="w-full rounded-2xl border border-ink/10 bg-white px-4 py-3 outline-none focus:border-accent"
              :placeholder="`Paragrafo ${index + 1}. Seleziona del testo e premi H2 o B, oppure scrivi **grassetto** a mano.`"
            />

            <div v-if="draft.body[index].trim()" class="mt-2 rounded-xl bg-white/70 px-3 py-2">
              <p class="mb-1 text-[10px] font-medium uppercase tracking-[0.15em] text-ink/40">Anteprima</p>
              <template v-for="(sub, si) in splitParagraph(draft.body[index])" :key="si">
                <p v-if="sub.kind === 'h2'" class="text-base font-bold text-ink">{{ sub.text }}</p>
                <p v-else-if="sub.kind === 'quote'" class="border-l-2 border-accent/40 pl-2 text-sm italic text-ink/70">{{ sub.text }}</p>
                <p v-else class="text-sm text-ink/70" v-html="sub.html"></p>
              </template>
            </div>
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
