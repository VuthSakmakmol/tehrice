<!-- src/views/customer/CustomerHome.vue -->
<template>
    <div>
      <h3 class="text-h5 mb-4">👋 Welcome, {{ userName || 'Guest' }}</h3>
  
      <v-img
        class="mb-6 rounded-xl elevation-4"
        :src="require('@/assets/rice-banner.jpg')"
        height="300px"
        cover
      />
  
      <v-row align-center="center" justify="start" class="mb-3">
        <v-btn variant="tonal" color="grey-lighten-1" rounded class="ms-4">Categories</v-btn>
      </v-row>
  
      <h4 class="text-h6 font-weight-bold ms-4 mb-2">The best selling rice bag</h4>
      <v-row class="px-4">
        <v-col
          v-for="n in 5"
          :key="n"
          cols="12"
          sm="6"
          md="4"
          lg="2"
        >
          <v-card class="pa-2">
            <v-img
              :src="require('@/assets/rice-bag.png')"
              height="160"
              cover
              class="mb-2"
            />
            <v-card-subtitle>Rice bag</v-card-subtitle>
            <v-card-text>Price: 30$</v-card-text>
            <v-btn icon color="pink" class="mt-1">
              <v-icon>mdi-heart</v-icon>
            </v-btn>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </template>
  
  <script setup>
  import { useUserStore } from '@/stores/user'
  const userStore = useUserStore()
  
  const store = useStore()
  const userName = computed(() => store.state.auth?.user?.fullName)
  </script>
  