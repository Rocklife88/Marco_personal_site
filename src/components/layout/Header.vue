<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Sun, Moon } from '@lucide/vue'
import Nav from './Nav.vue'
import Logo from '../Logo.vue'

const theme = ref<string>('')
const headerEl = ref<HTMLElement | null>(null)

function reportHeaderHeight() {
  if (headerEl.value) {
    document.documentElement.style.setProperty('--header-height', `${headerEl.value.offsetHeight}px`)
  }
}

function applyTheme(t: string) {
  document.documentElement.setAttribute('data-theme', t)
}

function toggleTheme() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
  applyTheme(theme.value)
  try { localStorage.setItem('site-theme', theme.value) } catch (e) {}
}

onMounted(() => {
  try {
    const saved = localStorage.getItem('site-theme')
    if (saved) {
      theme.value = saved
      applyTheme(saved)
    } else {
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      theme.value = prefersDark ? 'dark' : 'light'
      applyTheme(theme.value)
    }
  } catch (e) {}

  reportHeaderHeight()
  window.addEventListener('resize', reportHeaderHeight)
})
</script>

<template>
  <header ref="headerEl" class="sticky top-0 z-20 header-surface shadow-[0_10px_30px_rgba(33,26,22,0.03)] backdrop-blur-xl">
    <div class="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
      <router-link to="/" class="group flex flex-col items-center gap-1">
        <Logo :size="30" class="transition group-hover:scale-105" />
        <span class="font-display text-sm font-medium italic tracking-tight text-ink transition group-hover:text-accent">
          Marco Pellegrini
        </span>
      </router-link>
      <div class="flex items-center gap-3">
        <Nav />
        <button
          @click="toggleTheme"
          :aria-pressed="theme === 'dark'"
          class="rounded-full border border-ink/10 p-2 text-ink transition hover:border-accent/40 hover:text-accent"
          title="Cambia tema chiaro/scuro"
        >
          <Moon v-if="theme === 'dark'" :size="16" />
          <Sun v-else :size="16" />
        </button>
      </div>
    </div>
  </header>
</template>
