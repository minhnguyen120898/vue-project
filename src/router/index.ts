import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
     // will match everything and put it under `$route.params.pathMatch`
     // { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
  ]
})

export default router
