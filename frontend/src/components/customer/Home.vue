<template>
    <v-container class="py-8 text-center">
      <v-card elevation="3" class="pa-6">
        <h2 class="text-h5 font-weight-bold mb-2">Welcome, {{ userName }}</h2>
        <div class="text-subtitle-2 text-grey-darken-1 mb-4">Customer Panel</div>
  
        <v-btn color="primary" @click="goToDashboard">Go to Dashboard</v-btn>
      </v-card>
    </v-container>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  import { useUserStore } from '@/stores/userStore'
  import { useRouter } from 'vue-router'
  
  const userStore = useUserStore()
  const router = useRouter()
  
  const userName = computed(() => userStore.user?.name || 'Customer')
  
  const goToDashboard = () => {
    router.push({ name: 'CustomerDashboard' })
  }
  </script>
  