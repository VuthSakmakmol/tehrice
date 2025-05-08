import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/userStore'

// Layouts
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import CustomerLayout from '@/layouts/CustomerLayout.vue'

// Pages (lazy-loaded)
const Login = () => import('@/views/auth/Login.vue')
const Register = () => import('@/views/auth/Register.vue')

// Customer
const CustomerDashboard = () => import('@/views/customer/Dashboard.vue')

// Admin
const AdminDashboard = () => import('@/views/admin/Dashboard.vue')

// Superadmin
const SuperDashboard = () => import('@/views/superadmin/Dashboard.vue')
const AdminManager = () => import('@/views/superadmin/AdminManager.vue')
const DeliveryManager = () => import('@/components/management/DeliveryManager.vue')
const CustomerManager = () => import('@/components/management/CustomerManager.vue')
  

const routes = [
  { path: '/login', component: Login },
  { path: '/register', component: Register },

  {
    path: '/customer',
    component: CustomerLayout,
    meta: { requiresAuth: true, role: 'customer' },
    children: [
      { path: 'dashboard', component: CustomerDashboard }
    ]
  },
  {
    path: '/admin',
    component: DefaultLayout,
    meta: { requiresAuth: true, role: 'admin' },
    children: [
      { path: 'dashboard', component: AdminDashboard },
      { path: 'deliveries', component: () => import('@/components/admin/DeliveryPage.vue') },
      { path: 'customers', component: () => import('@/components/admin/CustomerPage.vue') }
    ]
  },
  {
    path: '/superadmin',
    component: DefaultLayout,
    meta: { requiresAuth: true, role: 'superadmin' },
    children: [
      { path: 'dashboard', component: SuperDashboard },
      { path: 'admins', component: AdminManager },
      { path: 'deliveries', component: DeliveryManager },
      { path: 'customers', component: CustomerManager}
    ]
  },

  // Default fallback
  { path: '/:catchAll(.*)', redirect: '/login' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 🔐 Route Guard
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  const isLoggedIn = userStore.isLoggedIn
  const role = userStore.role

  if (to.meta.requiresAuth) {
    if (!isLoggedIn) {
      return next('/login')
    }
    if (to.meta.role && to.meta.role !== role) {
      return next('/login') // unauthorized
    }
    return next()
  }

  // If already logged in and trying to go to /login
  if (to.path === '/login' && isLoggedIn) {
    switch (role) {
      case 'admin':
        return next('/admin/dashboard')
      case 'superadmin':
        return next('/superadmin/dashboard')
      case 'customer':
        return next('/customer/dashboard')
    }
  }

  next()
})

export default router
