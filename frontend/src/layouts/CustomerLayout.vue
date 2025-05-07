<template>
    <v-app>
      <!-- Top Navigation -->
      <Navbar />
  
      <!-- Routed Content Area -->
      <v-main>
        <v-container fluid class="pa-4">
          <router-view />
        </v-container>
      </v-main>
    </v-app>
  </template>
  
  <script setup>
  import Navbar from '@/components/common/Navbar.vue'
  </script>
  
  <style scoped>
  /* Optional: Add padding or background styling if needed */
  </style>
  