<script setup lang="ts">
import Header from './components/layout/Header.vue'
import Footer from './components/layout/Footer.vue'
import Loader from './components/Loader.vue'
import ItalyMapBackground from './components/ItalyMapBackground.vue'
import CookieBanner from './components/CookieBanner.vue'
import { useLoading } from './composables/useLoading'

const { isLoading } = useLoading()
</script>

<template>
  <div class="relative flex min-h-screen flex-col">
    <ItalyMapBackground />
    <Header />
    <main class="flex-1">
      <router-view />
    </main>
    <Footer />

    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      leave-active-class="transition duration-200 ease-in"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isLoading"
        class="fixed inset-0 z-50 flex items-center justify-center bg-cream/85 backdrop-blur-sm"
        role="status"
        aria-live="polite"
      >
        <Loader />
      </div>
    </Transition>

    <CookieBanner />
  </div>
</template>
