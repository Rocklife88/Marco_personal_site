<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Cookie } from '@lucide/vue'

const visible = ref(false)
const STORAGE_KEY = 'cookie-consent'

onMounted(() => {
  try {
    if (!localStorage.getItem(STORAGE_KEY)) {
      visible.value = true
    }
  } catch (e) {
    visible.value = true
  }
})

function accept() {
  visible.value = false
  try { localStorage.setItem(STORAGE_KEY, 'accepted') } catch (e) {}
}
</script>

<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="opacity-0 translate-y-4"
    leave-active-class="transition duration-200 ease-in"
    leave-to-class="opacity-0 translate-y-4"
  >
    <div v-if="visible" class="fixed inset-x-0 bottom-0 z-40 p-4 sm:p-6" role="dialog" aria-label="Informativa cookie">
      <div class="mx-auto flex max-w-3xl flex-col items-start gap-4 rounded-[24px] border border-ink/10 bg-surface p-5 shadow-[0_20px_50px_rgba(20,14,8,0.18)] sm:flex-row sm:items-center sm:p-6">
        <Cookie :size="22" class="shrink-0 text-accent" />
        <p class="flex-1 text-sm leading-relaxed text-ink/75">
          Questo sito usa solo cookie tecnici necessari al suo funzionamento (es. per ricordare la scelta del tema
          chiaro/scuro). Non ci sono cookie di profilazione o di terze parti.
        </p>
        <button type="button" class="btn btn-primary w-full shrink-0 sm:w-auto" @click="accept">
          Ho capito
        </button>
      </div>
    </div>
  </Transition>
</template>
