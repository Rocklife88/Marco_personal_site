<script setup lang="ts">
withDefaults(defineProps<{ size?: number }>(), { size: 24 })
</script>

<template>
  <svg :width="size" :height="size" viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="12" fill="#3C986B" />
    <rect x="6" y="6.5" width="2.8" height="11" rx="1.4" fill="#fff" />
    <rect x="10.6" y="5" width="2.8" height="14" rx="1.4" fill="#fff" />
    <rect x="15.2" y="6.5" width="2.8" height="11" rx="1.4" fill="#fff" />
  </svg>
</template>
