<!-- src/layouts/CustomerLayout.vue -->
<template>
    <v-app>
      <v-container>
        <!-- Top Bar -->
        <v-row align-center="center" justify="space-between" class="py-2">
          <v-col cols="auto">
            <h2 class="font-weight-bold">Tehrice Mill</h2>
          </v-col>
  
          <v-col cols="6">
            <v-text-field
              density="compact"
              rounded="lg"
              placeholder="Search product"
              append-inner-icon="mdi-tune"
              prepend-inner-icon="mdi-magnify"
              variant="solo"
              hide-details
            />
          </v-col>
  
          <v-col cols="auto">
            <v-btn icon class="me-2" color="cyan-lighten-4">
              <v-icon>mdi-translate</v-icon>
            </v-btn>
            <v-btn icon color="red" @click="goToLogin">
              <v-icon>mdi-logout</v-icon>
            </v-btn>
          </v-col>
        </v-row>
  
        <!-- Navigation -->
        <v-row class="mb-4" justify="center">
          <v-btn v-for="item in navItems" :key="item.label" class="mx-2" :to="item.to" rounded color="grey-lighten-2">
            {{ item.label }}
          </v-btn>
        </v-row>
  
        <!-- Router View -->
        <router-view />
      </v-container>
    </v-app>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router'
  const router = useRouter()
  
  const goToLogin = () => {
    router.push('/login')
  }
  
  const navItems = [
    { label: 'Home', to: '/' },
    { label: 'Product', to: '/product' },
    { label: 'Favorite', to: '/favorite' },
    { label: 'Cart', to: '/cart' },
    { label: 'Profile', to: '/profile' },
    { label: 'History', to: '/history' },
    { label: 'Contact us', to: '/contact' },
  ]
  </script>
  