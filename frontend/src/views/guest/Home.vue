<template>
    <v-container class="py-10">
      <!-- Hero Section -->
      <v-card class="pa-6 mb-10" elevation="5" rounded="xl">
        <v-row align="center" justify="space-between">
          <v-col cols="12" md="6">
            <h1 class="text-h4 font-weight-bold mb-4">🛒 Welcome to Our Store!</h1>
            <p class="text-body-1 mb-4">
              Explore the latest products, shop easily, and enjoy a smooth experience.
            </p>
            <v-btn color="primary" @click="goToProducts">Browse Products</v-btn>
          </v-col>
          <v-col cols="12" md="6" class="text-center">
            <v-img
              src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
              height="250"
              class="rounded-xl"
              cover
            />
          </v-col>
        </v-row>
      </v-card>
  
      <!-- Featured Products -->
      <v-row>
        <v-col cols="12">
          <h2 class="text-h6 font-weight-medium mb-4">🔥 Featured Products</h2>
        </v-col>
  
        <v-col
          v-for="(product, index) in products"
          :key="index"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <v-card class="h-100" elevation="2" rounded="lg">
            <v-img :src="product.image" height="160px" cover />
            <v-card-title class="text-subtitle-1 font-weight-bold">
              {{ product.name }}
            </v-card-title>
            <v-card-subtitle class="text-grey-darken-1">
              ${{ product.price.toFixed(2) }}
            </v-card-subtitle>
            <v-card-actions>
              <v-btn color="primary" variant="outlined" @click="goToProduct(product)">
                View
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  
  const products = ref([
    {
      name: 'Wireless Headphones',
      price: 59.99,
      image: 'https://cdn.vuetifyjs.com/images/cards/headphones.jpg'
    },
    {
      name: 'Smart Watch',
      price: 89.99,
      image: 'https://cdn.vuetifyjs.com/images/cards/watch.jpg'
    },
    {
      name: 'Running Shoes',
      price: 49.99,
      image: 'https://cdn.vuetifyjs.com/images/cards/shoes.jpg'
    },
    {
      name: 'Backpack',
      price: 39.99,
      image: 'https://cdn.vuetifyjs.com/images/cards/road.jpg'
    }
  ])
  
  const goToProducts = () => router.push('/guest/product-list')
  const goToProduct = (product) => {
    // You can replace this with real product detail routing later
    alert(`Clicked on ${product.name}`)
  }
  </script>
  