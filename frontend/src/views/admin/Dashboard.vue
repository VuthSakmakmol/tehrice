<template>
    <v-container class="py-6">
      <h2 class="text-h5 font-weight-bold mb-6">📊 Admin Dashboard</h2>
  
      <v-row dense>
        <v-col cols="12" sm="4">
          <v-card elevation="3" class="pa-4">
            <div class="text-subtitle-1 font-weight-medium mb-1">🛍 Total Products</div>
            <div class="text-h5 font-weight-bold">{{ stats.products }}</div>
          </v-card>
        </v-col>
  
        <v-col cols="12" sm="4">
          <v-card elevation="3" class="pa-4">
            <div class="text-subtitle-1 font-weight-medium mb-1">📦 Total Orders</div>
            <div class="text-h5 font-weight-bold">{{ stats.orders }}</div>
          </v-card>
        </v-col>
  
        <v-col cols="12" sm="4">
          <v-card elevation="3" class="pa-4">
            <div class="text-subtitle-1 font-weight-medium mb-1">🚚 Delivery Users</div>
            <div class="text-h5 font-weight-bold">{{ stats.deliveryUsers }}</div>
          </v-card>
        </v-col>
      </v-row>
  
      <v-divider class="my-6" />
  
      <v-row>
        <v-col cols="12" class="text-center">
          <p class="text-body-2 text-grey-darken-1">
            Use the sidebar to manage products, deliveries, and view orders.
          </p>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  
  // Placeholder stats (replace with API)
  const stats = ref({
    products: 12,
    orders: 36,
    deliveryUsers: 2
  })
  
  onMounted(() => {
    // In future: fetch('/api/admin/stats')...
  })
  </script>
  