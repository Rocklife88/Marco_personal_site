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
          A volte mi chiedo come sarebbe la mia vita senza l'urgenza che provo di immaginare personaggi, infilzare
          assieme parole, raccontare storie, sensazioni, emozioni. Mi chiedo come sarebbe se nonni particolarmente
          amorevoli non mi avessero iniziato alla dimensione del viaggio, della scoperta, instillando in me una sana
          necessità di meraviglia.
        </p>
        <p>
          La responsabilità delle parole che hanno finito per aggrumarsi in alcune risme di carta che portano il mio
          nome impresso su una copertina va ricercata in questi due aspetti: nei libri e nei viaggi. La musica è
          venuta dopo, diventando parte indissolubile di un trio che rappresenta il nucleo solido di quello che mi
          caratterizza. Un libro, in un mio ricordo, lo trovo sempre — così come un albero, un prato, un tramonto.
        </p>
        <p class="font-display text-2xl italic leading-snug text-ink">
          Scrivere aiuta anche un po' a vivere. A vivere meglio, a essere più consapevoli, a farsi le domande
          scomode che servono a evolvere.
        </p>
        <p>
          Scrivo da sempre, molto prima di sapere cosa significasse davvero mettersi a scrivere — se ne sarebbe mai
          uscito qualcosa di serio non lo sapevo, e forse è meglio così. Sono cresciuto a Lucca, ma è una geografia
          che conta poco. Quella che conta è la geografia dei miei spostamenti, dei viaggi che ci ridefiniscono e ci
          accrescono, e che con gli anni, senza che lo cercassi, è diventata anche la geografia dei miei libri.
        </p>
        <p>
          Le parole che si sono aggrumate in
          <router-link to="/libri/17-17" class="font-medium text-accent hover:underline">17:17</router-link>,
          in <router-link to="/libri/quello-che-resta" class="font-medium text-accent hover:underline">Quello che resta</router-link>,
          in <router-link to="/libri/in-un-giorno-qualunque" class="font-medium text-accent hover:underline">In un giorno qualunque</router-link>:
          libri che si soffermano sulla difficoltà di scegliere tra qualcosa che sappiamo essere profondamente
          giusto per noi e le aspettative che il mondo ripone in ciò che facciamo. Scrivo di scelte coraggiose,
          emozioni intense, bivi che conducono a destinazioni incerte — da raggiungere dopo aver camminato, essere
          inciampati, attraversato temporali neri come la notte più buia, e tramonti mozzafiato.
        </p>
        <p>
          Il viaggio, quello vero, l'ho messo per intero in
          <router-link to="/libri/emozioni-ditalia" class="font-medium text-accent hover:underline">Emozioni d'Italia</router-link>
          e in <router-link to="/su-e-giu-per-litalia" class="font-medium text-accent hover:underline">Su e giù per l'Italia</router-link>,
          il progetto che porto avanti con il magazine
          <a href="https://www.lordinario.it/luoghi/emozioni-ditalia-1-omaggio-a-lucca/" target="_blank" rel="noopener" class="font-medium text-accent hover:underline">L'Ordinario</a>.
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
