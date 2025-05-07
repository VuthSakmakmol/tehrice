import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/userStore'

// Layouts
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import CustomerLayout from '@/layouts/CustomerLayout.vue'

// Guest / Auth Views
const Home = () => import('@/views/guest/Home.vue')
const ProductList = () => import('@/views/guest/ProductList.vue')
const Login = () => import('@/views/auth/Login.vue')
const Register = () => import('@/views/auth/Register.vue')
const ForgotPassword = () => import('@/views/auth/ForgotPassword.vue')

// Customer Views
const CustomerDashboard = () => import('@/views/customer/Dashboard.vue')
const Profile = () => import('@/views/customer/Profile.vue')
const Orders = () => import('@/views/customer/Orders.vue')
const Favorites = () => import('@/views/customer/Favorites.vue')
const PaymentMethods = () => import('@/views/customer/PaymentMethods.vue')

// Admin Views
const AdminDashboard = () => import('@/views/admin/Dashboard.vue')
const ProductManager = () => import('@/views/admin/ProductManager.vue')
const DeliveryManager = () => import('@/views/admin/DeliveryManager.vue')

// SuperAdmin Views
const SuperDashboard = () => import('@/views/superadmin/Dashboard.vue')
const AdminManager = () => import('@/views/superadmin/AdminManager.vue')

const routes = [
  // Public/Guest Routes
  {
    path: '/',
    component: CustomerLayout,
    children: [
      { path: '', component: Home },
      { path: 'guest/product-list', component: ProductList },
      { path: 'login', component: Login },
      { path: 'register', component: Register },
      { path: 'forgot-password', component: ForgotPassword }
    ]
  },

  // Customer Routes
  {
    path: '/customer',
    component: CustomerLayout,
    meta: { requiresAuth: true, role: 'customer' },
    children: [
      { path: 'dashboard', component: CustomerDashboard },
      { path: 'profile', component: Profile },
      { path: 'orders', component: Orders },
      { path: 'favorites', component: Favorites },
      { path: 'payment-methods', component: PaymentMethods }
    ]
  },

  // Admin Routes
  {
    path: '/admin',
    component: DefaultLayout,
    meta: { requiresAuth: true, role: 'admin' },
    children: [
      { path: 'dashboard', component: AdminDashboard },
      { path: 'products', component: ProductManager },
      { path: 'delivery', component: DeliveryManager }
    ]
  },

  // Super Admin Routes
  {
    path: '/superadmin',
    component: DefaultLayout,
    meta: { requiresAuth: true, role: 'superadmin' },
    children: [
      { path: 'dashboard', component: SuperDashboard },
      { path: 'admins', component: AdminManager }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Global Guard: Role-Based Access
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  const isLoggedIn = userStore.isLoggedIn
  const role = userStore.role

  if (to.meta.requiresAuth) {
    if (!isLoggedIn) {
      next('/login')
    } else if (to.meta.role && to.meta.role !== role) {
      next('/') // unauthorized role
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
