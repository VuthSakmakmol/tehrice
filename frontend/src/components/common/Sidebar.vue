<template>
    <v-navigation-drawer app permanent width="240" color="grey-lighten-4">
      <v-list nav dense>
        <v-list-item class="text-h6 font-weight-bold mb-2" title="Navigation" />
  
        <!-- Admin Links -->
        <template v-if="role === 'admin'">
          <v-list-item to="/admin/dashboard" prepend-icon="mdi-view-dashboard" title="Dashboard" />
          <v-list-item to="/admin/products" prepend-icon="mdi-cube" title="Manage Products" />
          <v-list-item to="/admin/delivery" prepend-icon="mdi-truck" title="Delivery Users" />
        </template>
  
        <!-- SuperAdmin Links -->
        <template v-else-if="role === 'superadmin'">
          <v-list-item to="/superadmin/dashboard" prepend-icon="mdi-view-dashboard" title="Dashboard" />
          <v-list-item to="/superadmin/admins" prepend-icon="mdi-account-key" title="Admin Manager" />
        </template>
  
        <!-- Other Roles or Guest -->
        <template v-else>
          <v-list-item title="No access" prepend-icon="mdi-lock" />
        </template>
      </v-list>
    </v-navigation-drawer>
  </template>
  
  <script setup>
  import { useUserStore } from '@/stores/userStore'
  
  const userStore = useUserStore()
  const role = userStore.role
  </script>
  