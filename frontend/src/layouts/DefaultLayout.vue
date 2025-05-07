<template>
    <v-app>
      <!-- Top Navbar -->
      <Navbar />
  
      <v-main>
        <v-container fluid class="d-flex">
          <!-- Sidebar -->
          <Sidebar class="mr-4" />
  
          <!-- Main View Area -->
          <v-container fluid class="pa-4">
            <router-view />
          </v-container>
        </v-container>
      </v-main>
    </v-app>
  </template>
  
  <script setup>
  import Navbar from '@/components/common/Navbar.vue'
  import Sidebar from '@/components/common/Sidebar.vue'
  </script>
  