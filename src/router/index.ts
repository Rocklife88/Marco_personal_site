import { createRouter, createWebHistory } from 'vue-router'
import { useLoading } from '../composables/useLoading'

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
      path: '/canale',
      name: 'canale',
      component: () => import('../views/Canale.vue')
    },
    {
      path: '/blog',
      name: 'blog',
      component: () => import('../views/Blog.vue')
    },
    {
      path: '/blog/:slug',
      name: 'blog-dettaglio',
      component: () => import('../views/BlogPostDetail.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/Admin.vue')
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

const { startLoading, stopLoading } = useLoading()

router.beforeEach(() => {
  startLoading()
})

router.afterEach(() => {
  stopLoading()
})

router.onError(() => {
  stopLoading()
})

export default router
