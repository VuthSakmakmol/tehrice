<template>
    <v-app-bar app flat color="white" elevation="1">
      <!-- Brand / Logo -->
      <v-toolbar-title class="font-weight-bold text-primary">
        🛒 MyShop
      </v-toolbar-title>
  
      <v-spacer />
  
      <!-- Public Navigation -->
      <v-btn text to="/">Home</v-btn>
      <v-btn text to="/guest/product-list">Products</v-btn>
  
      <!-- Login Button Always Visible -->
      <v-btn text color="primary" to="/login">
        <v-icon start>mdi-login</v-icon>
        Login
      </v-btn>
  
      <!-- Logged-In User Options -->
      <template v-if="userStore.isLoggedIn">
        <v-btn v-if="isCustomer" text to="/customer/dashboard">Dashboard</v-btn>
        <v-btn v-if="isAdmin" text to="/admin/dashboard">Admin</v-btn>
        <v-btn v-if="isSuperAdmin" text to="/superadmin/dashboard">SuperAdmin</v-btn>
  
        <v-menu>
          <template #activator="{ props }">
            <v-btn icon v-bind="props">
              <v-icon>mdi-account-circle</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item :title="userStore.user?.name" subtitle="Profile" />
            <v-divider />
            <v-list-item title="Logout" @click="logout" />
          </v-list>
        </v-menu>
      </template>
    </v-app-bar>
  </template>
  
  <script setup>
  import { useUserStore } from '@/stores/userStore'
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  const userStore = useUserStore()
  
  const logout = () => {
    userStore.logout()
    router.push('/')
  }
  
  const isCustomer = userStore.role === 'customer'
  const isAdmin = userStore.role === 'admin'
  const isSuperAdmin = userStore.role === 'superadmin'
  </script>
  