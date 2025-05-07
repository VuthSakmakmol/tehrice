<template>
    <v-container class="py-8">
      <!-- Greeting -->
      <v-row class="mb-6">
        <v-col cols="12">
          <h2 class="text-h5 font-weight-bold">👋 Welcome, {{ user?.name || 'Customer' }}!</h2>
          <p class="text-subtitle-2">Here’s a quick overview of your activity.</p>
        </v-col>
      </v-row>
  
      <!-- Summary Cards -->
      <v-row dense>
        <v-col cols="12" sm="4">
          <v-card elevation="3" class="pa-4">
            <div class="text-subtitle-1 font-weight-medium mb-1">🧾 Orders</div>
            <div class="text-h5 font-weight-bold">{{ stats.orders }}</div>
            <v-btn text color="primary" @click="goTo('/customer/orders')">View Orders</v-btn>
          </v-card>
        </v-col>
  
        <v-col cols="12" sm="4">
          <v-card elevation="3" class="pa-4">
            <div class="text-subtitle-1 font-weight-medium mb-1">❤️ Favorites</div>
            <div class="text-h5 font-weight-bold">{{ stats.favorites }}</div>
            <v-btn text color="primary" @click="goTo('/customer/favorites')">View Favorites</v-btn>
          </v-card>
        </v-col>
  
        <v-col cols="12" sm="4">
          <v-card elevation="3" class="pa-4">
            <div class="text-subtitle-1 font-weight-medium mb-1">💳 Payment Methods</div>
            <div class="text-h5 font-weight-bold">{{ stats.paymentMethods }}</div>
            <v-btn text color="primary" @click="goTo('/customer/payment-methods')">Manage</v-btn>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
  import { useUserStore } from '@/stores/userStore'
  import { useRouter } from 'vue-router'
  import { ref, onMounted } from 'vue'
  
  const router = useRouter()
  const userStore = useUserStore()
  const user = userStore.user
  
  const stats = ref({
    orders: 3,
    favorites: 5,
    paymentMethods: 2
  })
  
  const goTo = (path) => router.push(path)
  
  // In future: fetch stats from backend
  onMounted(() => {
    // fetch('/api/customer/stats')...
  })
  </script>
  