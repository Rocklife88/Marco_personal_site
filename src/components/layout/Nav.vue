<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { Menu, X } from '@lucide/vue'

const links = [
  { to: '/', label: 'Home' },
  { to: '/chi-sono', label: 'Chi sono' },
  { to: '/su-e-giu-per-litalia', label: 'Su e giù per l\'Italia' },
  { to: '/libri', label: 'Libri' },
  { to: '/blog', label: 'Diario di viaggio' },
  { to: '/contatti', label: 'Contatti' }
]

const open = ref(false)
const route = useRoute()
watch(() => route.fullPath, () => { open.value = false })
</script>

<template>
  <nav class="relative">
    <div class="hidden items-center gap-x-6 md:flex">
      <router-link
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        class="text-xs font-semibold uppercase tracking-wider text-ink/70 transition hover:text-accent"
        active-class="text-accent"
      >
        {{ link.label }}
      </router-link>
    </div>

    <button
      class="flex items-center justify-center rounded-full border border-ink/10 p-2 text-ink transition hover:border-accent/40 hover:text-accent md:hidden"
      :aria-expanded="open"
      aria-label="Apri il menu"
      @click="open = !open"
    >
      <X v-if="open" :size="18" />
      <Menu v-else :size="18" />
    </button>

    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0 -translate-y-1"
      leave-active-class="transition duration-100 ease-in"
      leave-to-class="opacity-0"
    >
      <div
        v-if="open"
        class="fixed inset-x-0 top-[var(--header-height,4.5rem)] z-30 flex flex-col gap-1 border-b border-ink/10 bg-surface p-4 shadow-lg md:hidden"
      >
        <router-link
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="rounded-xl px-3 py-3 text-sm font-semibold uppercase tracking-wider text-ink/70 transition hover:bg-accent/5 hover:text-accent"
          active-class="text-accent"
        >
          {{ link.label }}
        </router-link>
      </div>
    </Transition>
  </nav>
</template>
