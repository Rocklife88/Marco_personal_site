<script setup lang="ts">
withDefaults(defineProps<{ size?: number }>(), { size: 36 })
</script>

<template>
  <svg :width="size" :height="size" viewBox="0 0 40 40" aria-hidden="true">
    <circle cx="20" cy="20" r="19" fill="var(--accent)" />
    <circle cx="20" cy="20" r="15.5" fill="none" stroke="var(--surface)" stroke-width="0.75" opacity="0.35" />
    <text
      x="20"
      y="23"
      text-anchor="middle"
      font-family="'Fraunces', ui-serif, Georgia, serif"
      font-style="italic"
      font-weight="600"
      font-size="16"
      fill="var(--surface)"
      letter-spacing="-0.5"
    >MP</text>
  </svg>
</template>
