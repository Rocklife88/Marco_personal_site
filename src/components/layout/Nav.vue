<script setup lang="ts">
const links = [
  { to: '/', label: 'Home' },
  { to: '/chi-sono', label: 'Chi sono' },
  { to: '/su-e-giu-per-litalia', label: 'Su e giù per l\'Italia' },
  { to: '/libri', label: 'Libri' },
  { to: '/blog', label: 'Blog' },
  { to: '/contatti', label: 'Contatti' }
]
</script>

<template>
  <nav class="flex flex-wrap items-center gap-x-5 gap-y-2">
    <router-link
      v-for="link in links"
      :key="link.to"
      :to="link.to"
      class="text-sm font-medium text-ink/75 transition hover:text-terracotta"
      active-class="text-terracotta"
    >
      {{ link.label }}
    </router-link>
  </nav>
</template>
