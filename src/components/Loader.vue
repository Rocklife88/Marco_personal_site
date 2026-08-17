<script setup lang="ts">
withDefaults(defineProps<{ label?: string }>(), { label: 'Preparo il viaggio…' })
</script>

<template>
  <div class="flex flex-col items-center gap-4">
    <svg viewBox="0 0 240 110" width="200" height="92" aria-hidden="true">
      <!-- sun -->
      <circle class="loader-sun-glow" cx="196" cy="26" r="20" fill="var(--ocra)" opacity="0.18" />
      <circle class="loader-sun" cx="196" cy="26" r="9" fill="var(--ocra)" />

      <!-- hills -->
      <path d="M0,110 C 40,78 80,100 130,84 C 170,72 210,96 240,80 L240,110 Z" fill="var(--terracotta)" opacity="0.1" />
      <path d="M0,110 C 60,92 100,106 150,94 C 190,84 220,102 240,92 L240,110 Z" fill="var(--ocra)" opacity="0.14" />

      <!-- the winding road -->
      <path
        id="loader-road"
        d="M8,66 C 48,10 88,10 120,52 C 152,94 192,94 232,40"
        fill="none"
        stroke="var(--border)"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-dasharray="1 9"
      />
      <path
        class="loader-road-trace"
        d="M8,66 C 48,10 88,10 120,52 C 152,94 192,94 232,40"
        fill="none"
        stroke="var(--accent)"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-dasharray="1 9"
      />

      <!-- traveling marker -->
      <g class="loader-marker">
        <circle r="6" fill="var(--surface)" />
        <circle r="6" fill="none" stroke="var(--accent)" stroke-width="2" />
        <circle r="2.5" fill="var(--accent)" />
      </g>
    </svg>
    <p class="eyebrow text-ink/40">{{ label }}</p>
  </div>
</template>

<style scoped>
.loader-marker {
  offset-path: path('M8,66 C 48,10 88,10 120,52 C 152,94 192,94 232,40');
  offset-distance: 0%;
  offset-rotate: 0deg;
}

.loader-road-trace {
  stroke-dasharray: 240;
  stroke-dashoffset: 240;
}

@media (prefers-reduced-motion: no-preference) {
  .loader-marker {
    animation: loader-travel 2.4s ease-in-out infinite;
  }
  .loader-road-trace {
    animation: loader-draw 2.4s ease-in-out infinite;
  }
  .loader-sun {
    animation: loader-pulse 2.4s ease-in-out infinite;
  }
  .loader-sun-glow {
    animation: loader-pulse 2.4s ease-in-out infinite reverse;
  }
}

@keyframes loader-travel {
  0% { offset-distance: 0%; }
  100% { offset-distance: 100%; }
}

@keyframes loader-draw {
  0% { stroke-dashoffset: 240; }
  100% { stroke-dashoffset: 0; }
}

@keyframes loader-pulse {
  0%, 100% { opacity: 0.7; }
  50% { opacity: 1; }
}
</style>
