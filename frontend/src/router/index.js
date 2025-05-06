import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import DashboardSuperAdmin from '../views/DashboardSuperAdmin.vue';
import DashboardAdmin from '../views/DashboardAdmin.vue';
import DashboardDelivery from '../views/DashboardDelivery.vue';
import DashboardGuest from '../views/DashboardGuest.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  {
    path: '/dashboard/superadmin',
    component: DashboardSuperAdmin,
    meta: { requiresAuth: true, role: 'SuperAdmin' }
  },
  {
    path: '/dashboard/admin',
    component: DashboardAdmin,
    meta: { requiresAuth: true, role: 'Admin' }
  },
  {
    path: '/dashboard/delivery',
    component: DashboardDelivery,
    meta: { requiresAuth: true, role: 'Delivery' }
  },
  {
    path: '/dashboard/guest',
    component: DashboardGuest
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// ✅ Role-Based Navigation Guard
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');

  if (to.meta.requiresAuth) {
    if (!token) return next('/login');

    try {
      const decoded = JSON.parse(atob(token.split('.')[1])); // decode JWT
      if (to.meta.role && decoded.role !== to.meta.role) {
        return next('/login'); // redirect if role mismatch
      }
    } catch {
      return next('/login'); // token parse error
    }
  }

  next(); // allowed
});

export default router;
