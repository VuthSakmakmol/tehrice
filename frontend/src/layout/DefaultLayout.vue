<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>eCommerce</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text to="/">Home</v-btn>
      <v-btn v-if="!isLoggedIn" text to="/login">Login</v-btn>
      <v-btn v-else text :to="dashboardLink">Dashboard</v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

  <script setup>
  import { computed } from 'vue';
  import { useRouter } from 'vue-router';

  const router = useRouter();

  const token = localStorage.getItem('token');
  let role = null;

  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      role = payload.role || 'Guest';
    } catch (e) {
      role = 'Guest';
    }
  }

  const isLoggedIn = computed(() => !!token);

  const dashboardLink = computed(() => {
    if (!token) return '/dashboard/guest';
    switch (role) {
      case 'SuperAdmin':
        return '/dashboard/superadmin';
      case 'Admin':
        return '/dashboard/admin';
      case 'Delivery':
        return '/dashboard/delivery';
      default:
        return '/dashboard/guest';
    }
  });

  </script>
  