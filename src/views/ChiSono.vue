<script setup lang="ts">
import { useHead } from '@unhead/vue'

useHead({
  title: 'Chi sono — Marco Pellegrini, scrittore',
  meta: [
    {
      name: 'description',
      content:
        'Marco Pellegrini: scrittore, storyteller e narratore di luoghi. Romanzi, memoir e racconti di viaggio tra Toscana e Italia.'
    }
  ]
})
</script>

<template>
  <div class="mx-auto max-w-4xl px-6 py-16">
    <header class="mb-10">
      <p class="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-accent">Chi sono</p>
      <h1 class="text-4xl font-semibold tracking-tight text-ink sm:text-5xl">Le storie ci dicono chi siamo.</h1>
    </header>

    <div class="grid gap-10 lg:grid-cols-[1.3fr_0.9fr] lg:items-start">
      <div class="space-y-5 text-lg leading-relaxed text-ink/75">
        <p>
          Scrivo da sempre — da quando ero all'asilo, molto prima che mi passasse per la testa di pubblicare
          qualcosa. Sono di Lucca, e ho esordito nel 2020 con
          <router-link to="/libri/17-17" class="font-medium text-accent hover:underline">17:17</router-link>,
          due sconosciuti che si scontrano sul ponte di un traghetto e scoprono di stare cercando, ognuno a modo suo,
          di rimettere insieme una vita spezzata. È un tema a cui torno spesso: persone sorprese in un punto di
          svolta, in bilico tra quello che ci si aspetta da loro e quello che sentono davvero di volere. Lo ritrovo in
          <router-link to="/libri/quello-che-resta" class="font-medium text-accent hover:underline">Quello che resta</router-link>,
          e di nuovo in <router-link to="/libri/in-un-giorno-qualunque" class="font-medium text-accent hover:underline">In un giorno qualunque</router-link>.
        </p>
        <p>
          Da una mansarda a Verona, durante il lockdown del marzo 2020, sono nati
          <router-link to="/libri/emozioni-ditalia" class="font-medium text-accent hover:underline">Emozioni d'Italia</router-link>
          e <router-link to="/su-e-giu-per-litalia" class="font-medium text-accent hover:underline">Su e giù per l'Italia</router-link>,
          il progetto che porto avanti insieme al magazine
          <a href="https://www.lordinario.it/luoghi/emozioni-ditalia-1-omaggio-a-lucca/" target="_blank" rel="noopener" class="font-medium text-accent hover:underline">L'Ordinario</a>,
          per cui scrivo e fotografo i luoghi d'Italia nella rubrica Luoghi. Quello che ci trovi non è una guida:
          sono strade, persone e atmosfere raccontate perché tu possa riconoscerti — e magari ritrovare la voglia
          di partire, o semplicemente guardare il posto in cui vivi con occhi nuovi.
        </p>
        <p>
          Ho imparato che una voce, per essere forte, deve essere solo tua. Puoi giocare con lo stile, con le parole,
          stendere sul filo una bella storia — ma è quando trovi la tua voce che inizi davvero a viaggiare. Ed è lì
          che, ogni volta, ricomincio.
        </p>
      </div>

      <div class="lg:sticky lg:top-24">
        <img
          src="/images/blog-import/marco-2.jpg"
          alt="Marco Pellegrini tra le Dolomiti"
          class="w-full rounded-[28px] object-cover shadow-[0_20px_50px_rgba(33,26,22,0.12)]"
        />
        <p class="mt-3 text-sm text-ink/50">Tra le Dolomiti, durante uno dei viaggi di Su e giù per l'Italia.</p>
      </div>
    </div>
  </div>
</template>
