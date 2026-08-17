<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { Compass, BookOpen, ArrowRight } from '@lucide/vue'
import books from '../data/books'
import posts from '../data/blog'
import { getCategory } from '../data/categoryMap'
import links from '../data/links'
import BookCard from '../components/BookCard.vue'
import BrandIcon from '../components/BrandIcon.vue'
import VideoEmbed from '../components/VideoEmbed.vue'
import LoquisLogo from '../components/icons/LoquisLogo.vue'

const latestBook = [...books].sort((a, b) => b.anno - a.anno)[0]
const featuredPosts = [...posts].sort((a, b) => Number(b.publishedAt) - Number(a.publishedAt)).slice(0, 3)

const sameAs = [links.youtube, links.spotify, links.loquis].filter(Boolean)

useHead({
  title: 'Marco Pellegrini, scrittore — viaggi, parole e Italia',
  meta: [
    {
      name: 'description',
      content:
        'Marco Pellegrini racconta l’Italia attraverso romanzi, storytelling e un viaggio emozionale tra luoghi, persone e ricordi.'
    }
  ],
  script: [
    {
      type: 'application/ld+json' as 'application/json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Marco Pellegrini',
        jobTitle: 'Scrittore',
        birthDate: '1988',
        birthPlace: 'Lucca, Italia',
        url: 'https://marcopellegrini.vercel.app/',
        sameAs
      })
    }
  ]
})
</script>

<template>
  <div class="mx-auto max-w-6xl px-6 py-16">
    <section class="hero-gradient relative overflow-hidden rounded-[32px] border border-ink/5 px-6 py-10 shadow-[0_30px_80px_rgba(33,26,22,0.08)] sm:px-10 lg:px-12">
      <div class="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p class="eyebrow mb-4"><Compass :size="15" /> Scrittore · storie in viaggio</p>
          <h1 class="max-w-xl text-4xl font-semibold tracking-tight text-ink sm:text-5xl lg:text-6xl">
            Scrivere è come partire per un viaggio che non pianifichi.
          </h1>
          <p class="mt-5 max-w-2xl text-lg leading-relaxed text-ink/70">
            Libri e viaggi si somigliano: nessuno dei due si lascia davvero pianificare. Prendono entrambi pieghe
            impreviste e ti portano dove non immaginavi. Davanti a una pagina bianca non ho mai avuto mappe né
            bussole — solo la fiducia che la storia sappia da sola dove andare. Scrivo romanzi, racconto luoghi,
            cerco nei dettagli le storie che meritano di restare.
          </p>
          <div class="mt-8 flex flex-wrap gap-3">
            <router-link to="/blog" class="btn btn-primary">
              <BookOpen :size="16" /> Leggi il blog
            </router-link>
            <a v-if="links.youtube" :href="links.youtube" target="_blank" rel="noopener" class="btn btn-outline">
              <BrandIcon name="youtube" :size="16" /> Iscriviti al canale
            </a>
          </div>
        </div>

        <div class="relative">
          <div class="overflow-hidden rounded-[28px] border border-surface/60 bg-surface/70 p-3 shadow-[0_24px_60px_rgba(33,26,22,0.12)] backdrop-blur-sm">
            <img
              src="https://mpcopy.wordpress.com/wp-content/uploads/2021/12/74534330_10211782845525349_8983003998860607488_n.jpg"
              alt="Marco Pellegrini"
              class="h-[420px] w-full rounded-[20px] object-cover object-center"
            />
          </div>
        </div>
      </div>
    </section>

    <section class="mt-16">
      <div class="mb-5 flex items-end justify-between gap-4">
        <h2 class="text-2xl font-semibold tracking-tight text-ink">I canali del viaggio</h2>
      </div>
      <div class="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div class="card overflow-hidden p-3">
          <VideoEmbed youtube-id="IJOZ17Kpo90" title="In un giorno qualunque — Estratto" />
        </div>
        <div class="card p-6">
          <LoquisLogo :size="36" class="mb-3" />
          <h3 class="text-2xl font-semibold text-ink">Su e giù per l'Italia</h3>
          <p class="mt-3 text-base leading-relaxed text-ink/70">
            Le storie che non stanno in un libro le racconto qui, a voce alta: un viaggio nell’Italia che incontro
            strada facendo, tra luoghi, atmosfere e ricordi.
          </p>
          <a v-if="links.loquis" :href="links.loquis" target="_blank" rel="noopener" class="btn btn-primary mt-6">
            Apri il canale Loquis
          </a>
        </div>
      </div>
    </section>

    <section class="mt-16">
      <div class="mb-5 flex items-end justify-between gap-4">
        <h2 class="text-2xl font-semibold tracking-tight text-ink">Ultime riflessioni dal blog</h2>
        <router-link to="/blog" class="link-arrow">Vedi tutti <ArrowRight :size="14" /></router-link>
      </div>
      <div class="grid gap-6 md:grid-cols-3">
        <router-link
          v-for="post in featuredPosts"
          :key="post.slug"
          :to="`/blog/${post.slug}`"
          class="card block overflow-hidden transition hover:-translate-y-1 hover:shadow-lg"
        >
          <img :src="post.image" :alt="post.title" class="h-52 w-full object-cover" />
          <div class="p-5">
            <p class="mb-2 font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-terracotta">{{ getCategory(post) }}</p>
            <h3 class="text-xl font-semibold leading-snug text-ink">{{ post.title }}</h3>
            <p class="mt-3 text-sm leading-relaxed text-ink/70">{{ post.excerpt }}</p>
          </div>
        </router-link>
      </div>
    </section>

    <section class="mx-auto mt-20 max-w-2xl text-center">
      <p class="font-display text-2xl italic leading-snug text-ink sm:text-3xl">
        “Vale per tutto, anche per la voce che decidi di avere come autore. Non può essere autentica e forte se non è la tua.”
      </p>
      <p class="eyebrow mt-4 justify-center text-ink/40">— dal mio taccuino</p>
    </section>

    <section v-if="latestBook" class="card mt-20 p-6 sm:p-8">
      <div class="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div class="max-w-xl">
          <p class="eyebrow mb-2"><BookOpen :size="15" /> Ultimo libro</p>
          <h2 class="text-3xl font-semibold tracking-tight text-ink">{{ latestBook.titolo }}</h2>
          <p class="mt-3 text-base leading-relaxed text-ink/70">{{ latestBook.sinossi }}</p>
        </div>
        <div class="max-w-xs w-full">
          <BookCard :book="latestBook" />
        </div>
      </div>
    </section>

    <section class="mt-16">
      <div class="mb-5 flex items-end justify-between gap-4">
        <h2 class="text-2xl font-semibold tracking-tight text-ink">I miei libri</h2>
        <router-link to="/libri" class="link-arrow">Vedi catalogo <ArrowRight :size="14" /></router-link>
      </div>
      <div class="-mx-6 flex snap-x gap-5 overflow-x-auto px-6 pb-2">
        <BookCard
          v-for="book in books"
          :key="book.slug"
          :book="book"
          class="w-32 shrink-0 snap-start sm:w-40"
        />
      </div>
    </section>

    <section class="mt-16 rounded-[28px] border border-terracotta/10 bg-gradient-to-br from-terracotta/10 via-cream to-ocra/10 p-8">
      <p class="eyebrow mb-2"><Compass :size="15" /> Progetto</p>
      <h2 class="text-3xl font-semibold tracking-tight text-ink">Su e giù per l'Italia</h2>
      <p class="mt-4 max-w-2xl text-base leading-relaxed text-ink/75">
        Nessun itinerario deciso a tavolino: solo regioni, storie e luoghi attraversati come vengono, nei dettagli,
        nelle persone e nelle atmosfere. Qui il respiro dello sguardo diventa racconto.
      </p>
      <router-link to="/su-e-giu-per-litalia" class="link-arrow mt-6">
        Scopri il progetto <ArrowRight :size="14" />
      </router-link>
    </section>
  </div>
</template>
