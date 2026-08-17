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
          Scrivo da sempre, da quando ero all'asilo, molto prima di sapere cosa significasse davvero scrivere,
          prima ancora di chiedermi se ne sarebbe mai uscito qualcosa di serio. Sono cresciuto a Lucca, e da lì non
          mi sono mai davvero mosso, nemmeno quando ho iniziato a girare l'Italia in lungo e in largo: perché in
          fondo, ho capito col tempo, si scrive sempre dello stesso posto — quello che ci si porta dentro. Nel 2020
          ho pubblicato il mio primo romanzo,
          <router-link to="/libri/17-17" class="font-medium text-accent hover:underline">17:17</router-link>
          — due sconosciuti che si scontrano sul ponte di un traghetto, ognuno a modo suo in cerca di rimettere
          insieme una vita spezzata — ed è un tema a cui continuo a tornare, in
          <router-link to="/libri/quello-che-resta" class="font-medium text-accent hover:underline">Quello che resta</router-link>
          come in <router-link to="/libri/in-un-giorno-qualunque" class="font-medium text-accent hover:underline">In un giorno qualunque</router-link>:
          persone sorprese in un punto di svolta, in bilico tra quello che ci si aspetta da loro e quello che
          sentono davvero di volere. Poi c'è stato un sabato di marzo del 2020, chiuso in una mansarda a Verona con
          le finestre spalancate su una città deserta, e il bisogno improvviso di riportare a galla la bellezza di
          tutti i viaggi fatti fino ad allora: da lì sono nati
          <router-link to="/libri/emozioni-ditalia" class="font-medium text-accent hover:underline">Emozioni d'Italia</router-link>
          e, insieme, <router-link to="/su-e-giu-per-litalia" class="font-medium text-accent hover:underline">Su e giù per l'Italia</router-link>,
          il progetto che porto avanti con il magazine
          <a href="https://www.lordinario.it/luoghi/emozioni-ditalia-1-omaggio-a-lucca/" target="_blank" rel="noopener" class="font-medium text-accent hover:underline">L'Ordinario</a>.
          Quello che ci trovi non è mai una guida: sono strade, persone e atmosfere raccontate perché chi legge
          possa riconoscersi — e magari, per un momento, guardare il posto in cui vive con occhi nuovi.
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
