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
      <p class="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-terracotta">Chi sono</p>
      <h1 class="text-4xl font-semibold tracking-tight text-ink sm:text-5xl">Le storie ci dicono chi siamo.</h1>
    </header>

    <div class="max-w-3xl space-y-5 text-lg leading-relaxed text-ink/75">
      <p>
        Scrivere un libro è come partire per uno di quei viaggi che non pianifichi: quelli che non hanno
        aspettative e che, proprio per questo, finiscono per cambiarti la vita. Non ho mai avuto mappe, riferimenti
        o bussole per orientarmi in una storia — ho sempre pensato che tracciare perimetri, colorare ambienti, dare
        forma a personaggi ed emozioni non fosse compito mio, ma della pagina.
      </p>
      <p>
        Mi chiamo Marco Pellegrini, sono nato a Lucca, e da qualche anno provo a raccontare le persone, i luoghi e
        le idee che meritano attenzione: a volte in un romanzo, a volte in un progetto di viaggio. Mi interessano
        le realtà artigianali, la cultura locale, tutto ciò che resiste al tempo con autenticità — credo che le
        parole, se usate bene, sappiano restituire dignità anche al dettaglio più piccolo.
      </p>
      <p>
        Dal 2020 ho pubblicato quattro libri: <router-link to="/libri/17-17" class="font-medium text-terracotta hover:underline">17:17</router-link>,
        <router-link to="/libri/quello-che-resta" class="font-medium text-terracotta hover:underline">Quello che resta</router-link>,
        <router-link to="/libri/emozioni-ditalia" class="font-medium text-terracotta hover:underline">Emozioni d’Italia</router-link>
        e <router-link to="/libri/in-un-giorno-qualunque" class="font-medium text-terracotta hover:underline">In un giorno qualunque</router-link>.
        Parallelamente porto avanti <router-link to="/su-e-giu-per-litalia" class="font-medium text-terracotta hover:underline">Su e giù per l’Italia</router-link>,
        un progetto fatto di viaggi, video e racconti: il tentativo di restituire quello che la nostra penisola sa
        mettere dentro il cuore di chi la attraversa.
      </p>
      <p>
        Ho imparato che una voce, per essere forte, deve essere solo tua. Puoi giocare con lo stile, con le parole,
        stendere sul filo una bella storia — ma è quando trovi la tua voce che inizi davvero a viaggiare. Ed è lì
        che, ogni volta, ricomincio.
      </p>
    </div>
  </div>
</template>
