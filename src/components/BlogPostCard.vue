<script setup lang="ts">
export interface BlogPost {
  title: string
  excerpt: string
  url: string
  date: string
}

defineProps<{ post: BlogPost }>()
</script>

<template>
  <a
    :href="post.url"
    target="_blank"
    rel="noopener"
    class="flex flex-col gap-2 rounded-lg border border-ocra/20 bg-white p-5 transition hover:shadow-lg"
  >
    <span class="text-xs uppercase tracking-wide text-ink/50">{{ post.date }}</span>
    <h3 class="font-semibold text-ink hover:text-terracotta">{{ post.title }}</h3>
    <p class="text-sm text-ink/70">{{ post.excerpt }}</p>
  </a>
</template>
