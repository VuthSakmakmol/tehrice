import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/userStore'

// Layouts
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import CustomerLayout from '@/layouts/CustomerLayout.vue'

// Pages
const Login = () => import('@/views/auth/Login.vue')
const Register = () => import('@/views/auth/Register.vue')

// Customer
const CustomerHome = () => import('@/views/customer/Home.vue')
const CustomerDashboard = () => import('@/views/customer/Dashboard.vue')

// Admin
const AdminHome = () => import('@/views/admin/Home.vue')
const AdminDashboard = () => import('@/views/admin/Dashboard.vue')
const AdminDeliveryPage = () => import('@/components/admin/DeliveryPage.vue')
const AdminCustomerPage = () => import('@/components/admin/CustomerPage.vue')

// Superadmin
const SuperHome = () => import('@/views/superadmin/Home.vue')
const SuperDashboard = () => import('@/views/superadmin/Dashboard.vue')
const AdminManager = () => import('@/views/superadmin/AdminManager.vue')
const DeliveryManager = () => import('@/components/management/DeliveryManager.vue')
const CustomerManager = () => import('@/components/management/CustomerManager.vue')
const PermissionManager = () => import('@/views/superadmin/PermissionManager.vue')
const routes = [
  { path: '/login', component: Login },
  { path: '/register', component: Register },

  // Customer routes
  {
    path: '/customer',
    component: CustomerLayout,
    meta: { requiresAuth: true, role: 'customer' },
    children: [
      { path: 'home', name: 'CustomerHome', component: CustomerHome },
      { path: 'dashboard', name: 'CustomerDashboard', component: CustomerDashboard }
    ]
  },

  // Admin routes
  {
    path: '/admin',
    component: DefaultLayout,
    meta: { requiresAuth: true, role: 'admin' },
    children: [
      { path: 'home', name: 'AdminHome', component: AdminHome },
      { path: 'dashboard', name: 'AdminDashboard', component: AdminDashboard },
      { path: 'deliveries', name: 'AdminDeliveries', component: AdminDeliveryPage },
      { path: 'customers', name: 'AdminCustomers', component: AdminCustomerPage }
    ]
  },

  // Superadmin routes
  {
    path: '/superadmin',
    component: DefaultLayout,
    meta: { requiresAuth: true, role: 'superadmin' },
    children: [
      { path: 'home', name: 'SuperAdminHome', component: SuperHome },
      { path: 'dashboard', name: 'SuperAdminDashboard', component: SuperDashboard },
      { path: 'admins', name: 'AdminManager', component: AdminManager },
      { path: 'deliveries', name: 'SuperAdminDeliveries', component: DeliveryManager },
      { path: 'customers', name: 'SuperAdminCustomers', component: CustomerManager },
      { path: 'permissions',name: 'PermissionManager',component: PermissionManager}
      
    ]
  },

  // Catch all
  { path: '/:catchAll(.*)', redirect: '/login' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Route Guard
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  const isLoggedIn = userStore.isLoggedIn
  const role = userStore.role

  if (to.meta.requiresAuth) {
    if (!isLoggedIn) return next('/login')
    if (to.meta.role && to.meta.role !== role) return next('/login')
    return next()
  }

  // Redirect logged-in users to their dashboard if accessing login
  if (to.path === '/login' && isLoggedIn) {
    switch (role) {
      case 'admin': return next('/admin/home')
      case 'superadmin': return next('/superadmin/home')
      case 'customer': return next('/customer/home')
    }
  }

  next()
})

export default router
