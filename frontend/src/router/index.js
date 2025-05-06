import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import Admin from '@/views/Admin.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

const routes = [
  { path: '/', name: 'Login', component: Login },
  {
    path: '/admin',
    component: DefaultLayout,
    children: [{ path: '', name: 'AdminHome', component: Admin }],
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Auth guard
router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem('superadmin')
  if (to.meta.requiresAuth && !isLoggedIn) {
    next('/')
  } else {
    next()
  }
})

export default router
