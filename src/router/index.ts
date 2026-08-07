import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue')
    },
    {
      path: '/chi-sono',
      name: 'chi-sono',
      component: () => import('../views/ChiSono.vue')
    },
    {
      path: '/libri',
      name: 'libri',
      component: () => import('../views/Libri.vue')
    },
    {
      path: '/libri/:slug',
      name: 'libro-dettaglio',
      component: () => import('../views/LibroDettaglio.vue')
    },
    {
      path: '/su-e-giu-per-litalia',
      name: 'su-e-giu-per-litalia',
      component: () => import('../views/SuEGiuPerLItalia.vue')
    },
    {
      path: '/blog',
      name: 'blog',
      component: () => import('../views/Blog.vue')
    },
    {
      path: '/contatti',
      name: 'contatti',
      component: () => import('../views/Contatti.vue')
    }
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
