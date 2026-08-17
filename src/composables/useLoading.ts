import { ref } from 'vue'

const isLoading = ref(false)
let showTimer: ReturnType<typeof setTimeout> | undefined
let shownAt = 0

const SHOW_DELAY = 150 // avoid flashing the loader on fast, cached route chunks
const MIN_VISIBLE = 450 // once shown, keep it up long enough to read as intentional

function startLoading() {
  clearTimeout(showTimer)
  showTimer = setTimeout(() => {
    isLoading.value = true
    shownAt = Date.now()
  }, SHOW_DELAY)
}

function stopLoading() {
  clearTimeout(showTimer)
  if (!isLoading.value) return

  const wait = Math.max(0, MIN_VISIBLE - (Date.now() - shownAt))
  setTimeout(() => {
    isLoading.value = false
  }, wait)
}

export function useLoading() {
  return { isLoading, startLoading, stopLoading }
}
