import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: () => import('@/views/home/home.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

export default router
