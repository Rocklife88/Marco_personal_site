<script setup lang="ts">
import { reactive } from 'vue'
import { useHead } from '@unhead/vue'
import { Mail, Send, User, MessageSquare } from '@lucide/vue'

useHead({
  title: 'Contatti — Marco Pellegrini, scrittore',
  meta: [
    {
      name: 'description',
      content: 'Contatta Marco Pellegrini, scrittore: email e social.'
    }
  ]
})

const destinatario = 'marco.pellegrini2013@gmail.com'

const form = reactive({
  nome: '',
  email: '',
  messaggio: ''
})

function inviaMessaggio() {
  const subject = `Messaggio dal sito da ${form.nome || 'un lettore'}`
  const body = `${form.messaggio}\n\n—\n${form.nome}\n${form.email}`
  const mailto = `mailto:${destinatario}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  window.location.href = mailto
}
</script>

<template>
  <div class="mx-auto max-w-2xl px-6 py-16">
    <h1 class="mb-4 text-3xl font-semibold text-ink">Contatti</h1>
    <p class="leading-relaxed text-ink/80">
      Per presentazioni, eventi, collaborazioni — o anche solo per dirmi cosa ti ha lasciato una storia: scrivimi.
    </p>

    <form class="mt-10 flex flex-col gap-6" @submit.prevent="inviaMessaggio">
      <label class="flex flex-col gap-2">
        <span class="inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-ink/50">
          <User :size="14" /> Nome
        </span>
        <input
          v-model="form.nome"
          type="text"
          required
          placeholder="Il tuo nome"
          class="border-0 border-b border-ink/15 bg-transparent px-0 py-2 text-ink placeholder:text-ink/30 focus:border-terracotta"
        />
      </label>

      <label class="flex flex-col gap-2">
        <span class="inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-ink/50">
          <Mail :size="14" /> La tua email
        </span>
        <input
          v-model="form.email"
          type="email"
          required
          placeholder="nome@esempio.it"
          class="border-0 border-b border-ink/15 bg-transparent px-0 py-2 text-ink placeholder:text-ink/30 focus:border-terracotta"
        />
      </label>

      <label class="flex flex-col gap-2">
        <span class="inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-ink/50">
          <MessageSquare :size="14" /> Messaggio
        </span>
        <textarea
          v-model="form.messaggio"
          rows="5"
          required
          placeholder="Scrivi qui il tuo messaggio..."
          class="resize-none border-0 border-b border-ink/15 bg-transparent px-0 py-2 text-ink placeholder:text-ink/30 focus:border-terracotta"
        />
      </label>

      <button type="submit" class="btn btn-primary self-start">
        Invia il messaggio <Send :size="15" />
      </button>
      <p class="text-xs text-ink/40">
        Si aprirà il tuo programma di posta, pronto per l'invio a {{ destinatario }}.
      </p>
    </form>
  </div>
</template>
