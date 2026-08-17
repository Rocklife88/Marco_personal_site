<script setup lang="ts">
withDefaults(defineProps<{ size?: number }>(), { size: 36 })
</script>

<template>
  <svg :width="size" :height="size" viewBox="0 0 40 40" aria-hidden="true">
    <circle cx="20" cy="20" r="19" fill="var(--accent)" />
    <circle cx="20" cy="20" r="15.5" fill="none" stroke="var(--surface)" stroke-width="0.75" opacity="0.35" />
    <text
      x="20"
      y="24.5"
      text-anchor="middle"
      font-family="'Fraunces', ui-serif, Georgia, serif"
      font-style="italic"
      font-weight="500"
      font-size="14.5"
      fill="var(--surface)"
    >MP</text>
  </svg>
</template>
