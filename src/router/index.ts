import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/show',
      name: 'home',
    },
    {
      path: '/show',
      name: 'show',
      component: () => import('../views/ShowView.vue')
    },
    {
      path: '/entries',
      name: 'entries',
      component: () => import('../views/EntriesView.vue')
    }
  ]
})

export default router
