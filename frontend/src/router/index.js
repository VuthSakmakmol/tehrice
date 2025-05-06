import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/dashboard', component: () => import('../views/Dashboard.vue') }, // optional
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
