<template>
    <v-container class="py-8 text-center">
      <v-card elevation="3" class="pa-6">
        <v-avatar size="96" class="mb-4">
          <img src="https://randomuser.me/api/portraits/lego/2.jpg" alt="Admin Avatar" />
        </v-avatar>
  
        <h2 class="text-h5 font-weight-bold mb-2">Welcome, {{ userName }}</h2>
        <div class="text-subtitle-2 text-grey-darken-1 mb-4">Admin Panel</div>
  
        <v-row class="mt-4" dense>
          <v-col cols="12" sm="6">
            <v-btn block color="primary" @click="goTo('dashboard')">📊 Dashboard</v-btn>
          </v-col>
          <v-col cols="12" sm="6">
            <v-btn block color="green" @click="goTo('deliveries')">🚚 Manage Deliveries</v-btn>
          </v-col>
          <v-col cols="12" sm="6">
            <v-btn block color="orange" @click="goTo('customers')">🧍 Manage Customers</v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  import { useUserStore } from '@/stores/userStore'
  import { useRouter } from 'vue-router'
  
  const userStore = useUserStore()
  const router = useRouter()
  
  const userName = computed(() => userStore.user?.name || 'Admin')
  
  const goTo = (section) => {
    router.push(`/admin/${section}`)
  }
  </script>
  