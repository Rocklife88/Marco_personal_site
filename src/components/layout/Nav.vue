<script setup lang="ts">
const links = [
  { to: '/', label: 'Home' },
  { to: '/chi-sono', label: 'Chi sono' },
  { to: '/su-e-giu-per-litalia', label: 'Su e giù per l\'Italia' },
  { to: '/libri', label: 'Libri' },
  { to: '/blog', label: 'Diario di viaggio' },
  { to: '/contatti', label: 'Contatti' }
]
</script>

<template>
  <nav class="flex flex-wrap items-center gap-x-5 gap-y-2">
    <router-link
      v-for="link in links"
      :key="link.to"
      :to="link.to"
      class="text-xs font-semibold uppercase tracking-wider text-ink/70 transition hover:text-accent"
      active-class="text-accent"
    >
      {{ link.label }}
    </router-link>
  </nav>
</template>
