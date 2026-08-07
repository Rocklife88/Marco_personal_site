<script setup lang="ts">
const props = defineProps<{
  youtubeId: string
  title: string
}>()

const src = `https://www.youtube-nocookie.com/embed/${props.youtubeId}`
</script>

<template>
  <div class="aspect-video w-full overflow-hidden rounded-lg bg-ink/5">
    <iframe
      :src="src"
      :title="title"
      class="h-full w-full"
      loading="lazy"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    />
  </div>
</template>
