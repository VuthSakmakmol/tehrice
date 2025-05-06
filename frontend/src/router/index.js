import { createRouter, createWebHistory } from 'vue-router'

// ✅ Layouts
import CustomerLayout from '@/layouts/CustomerLayout.vue'
import AdminLayout from '@/layouts/AdminLayout.vue'
import SuperAdminLayout from '@/layouts/SuperAdminLayout.vue'

// ✅ Components
import Login from '@/components/Login.vue'
import GuestWelcome from '@/components/GuestWelcome.vue'

// ✅ Customer Pages
import CustomerHome from '@/pages/Customer/CustomerHome.vue'
import CustomerDashboard from '@/pages/Customer/Dashboard.vue'

// ✅ Admin Pages
import AdminDashboard from '@/pages/Admin/Dashboard.vue'

// ✅ SuperAdmin Pages
import SuperAdminDashboard from '@/pages/SuperAdmin/Dashboard.vue'
// If you remove SuperAdminHome.vue, comment this line or create the file:
import SuperAdminHome from '@/pages/SuperAdmin/Home.vue'

// ✅ Routes
const routes = [
  {
    path: '/',
    component: CustomerLayout,
    children: [
      {
        path: '',
        name: 'GuestWelcome',
        component: GuestWelcome
      },
      {
        path: 'customer/home',
        name: 'CustomerHome',
        component: CustomerHome
      },
      {
        path: 'customer/dashboard',
        name: 'CustomerDashboard',
        component: CustomerDashboard
      }
    ]
  },
  {
    path: '/admin',
    component: AdminLayout,
    children: [
      {
        path: 'dashboard',
        name: 'AdminDashboard',
        component: AdminDashboard
      }
    ]
  },
  {
    path: '/superadmin',
    component: SuperAdminLayout,
    children: [
      {
        path: 'dashboard',
        name: 'SuperAdminDashboard',
        component: SuperAdminDashboard
      },
      {
        path: 'home',
        name: 'SuperAdminHome',
        component: SuperAdminHome
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

// ✅ Create Router
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
