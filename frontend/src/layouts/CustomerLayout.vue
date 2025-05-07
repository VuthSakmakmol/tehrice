<template>
  <v-app>
    <!-- Top Navigation Bar -->
    <Navbar />

    <!-- Sidebar + Page Content -->
    <v-layout>

      <v-main class="pa-4">
        <router-view />
      </v-main>
    </v-layout>
  </v-app>
</template>

<script setup>
import Navbar from '@/components/common/Navbar.vue'
import Sidebar from '@/components/common/Sidebar.vue'
</script>
