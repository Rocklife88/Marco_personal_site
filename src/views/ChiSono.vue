<script setup lang="ts">
import { useHead } from '@unhead/vue'

useHead({
  title: 'Chi sono — Marco Pellegrini, scrittore',
  meta: [
    {
      name: 'description',
      content:
        'Marco Pellegrini, scrittore lucchese classe 1988: dal debutto con 17:17 al viaggio in Italia, tra romanzi, memoir e radici toscane.'
    }
  ]
})
</script>

<template>
  <div class="mx-auto max-w-3xl px-6 py-16">
    <h1 class="mb-6 text-3xl font-semibold text-ink">Chi sono</h1>
    <div class="flex flex-col gap-4 leading-relaxed text-ink/80">
      <p>
        Sono Marco Pellegrini, scrittore lucchese classe 1988. Scrivo da quando,
        poco più che trentenne, ho sentito il bisogno di mettere ordine in una
        vita che stava cambiando: da lì sono nati i libri, uno via l'altro, tutti
        con lo stesso filo conduttore — il ritorno, in qualche forma, alle
        proprie radici toscane.
      </p>
      <p>
        Ho esordito nel 2020 con <router-link to="/libri/17-17" class="text-terracotta hover:underline">17:17</router-link>
        (Argento Vivo Edizioni), un romanzo a doppio punto di vista nato da un
        incontro immaginato su un traghetto per l'Elba. È seguito nel 2021
        <router-link to="/libri/quello-che-resta" class="text-terracotta hover:underline">Quello che resta</router-link>
        (Porto Seguro Editore), ambientato tra le colline di Montecarlo, vicino
        Lucca. Nel 2022 ho raccontato l'Italia vista con i miei occhi in
        <router-link to="/libri/emozioni-ditalia" class="text-terracotta hover:underline">Emozioni d'Italia</router-link>,
        nato dal trasferimento a Verona per lavoro. Nel 2025 è uscito il mio
        romanzo più maturo,
        <router-link to="/libri/in-un-giorno-qualunque" class="text-terracotta hover:underline">In un giorno qualunque</router-link>.
      </p>
      <p>
        Parallelamente alla scrittura, porto avanti
        <router-link to="/su-e-giu-per-litalia" class="text-terracotta hover:underline">Su e giù per l'Italia</router-link>,
        un progetto di viaggio e racconto attraverso le regioni italiane, tra
        video e diario di bordo.
      </p>
      <p>
        Nei miei libri tornano spesso gli stessi temi: il coraggio di ricominciare,
        la Toscana come paesaggio dell'anima, la musica — Springsteen su tutti —
        come colonna sonora costante. Scrivo storie sentimentali e introspettive,
        con qualche tocco di realismo magico e uno sguardo che resta, nonostante
        tutto, radicato nella realtà.
      </p>
    </div>
  </div>
</template>
