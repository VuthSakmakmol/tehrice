<template>
    <v-container class="py-6">
      <h2 class="text-h5 font-weight-bold mb-4">❤️ Your Favorite Products</h2>
  
      <v-alert v-if="favorites.length === 0" type="info" border="start" colored-border>
        You haven't added any favorites yet.
      </v-alert>
  
      <v-row v-else>
        <v-col
          v-for="(product, index) in favorites"
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
            <v-card-subtitle class="text-grey-darken-1 mb-2">
              ${{ product.price.toFixed(2) }}
            </v-card-subtitle>
            <v-card-actions>
              <v-btn text color="primary" @click="viewProduct(product)">View</v-btn>
              <v-spacer />
              <v-btn icon color="red" @click="removeFavorite(index)">
                <v-icon>mdi-heart-broken</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  // Sample favorites (replace with actual store or API)
  const favorites = ref([
    {
      name: 'Bluetooth Headphones',
      price: 79.99,
      image: 'https://cdn.vuetifyjs.com/images/cards/headphones.jpg'
    },
    {
      name: 'Running Shoes',
      price: 59.99,
      image: 'https://cdn.vuetifyjs.com/images/cards/shoes.jpg'
    }
  ])
  
  const viewProduct = (product) => {
    alert(`Viewing ${product.name}`)
    // Future: router.push(`/product/${product._id}`)
  }
  
  const removeFavorite = (index) => {
    favorites.value.splice(index, 1)
  }
  </script>
  