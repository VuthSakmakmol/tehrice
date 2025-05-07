<template>
    <v-container class="py-8">
      <!-- Page Title -->
      <v-row class="mb-6">
        <v-col cols="12" md="6">
          <h2 class="text-h5 font-weight-bold">🛍 All Products</h2>
        </v-col>
        <v-col cols="12" md="6" class="d-flex justify-end align-center">
          <v-text-field
            v-model="search"
            label="Search"
            append-inner-icon="mdi-magnify"
            dense
            hide-details
            class="mr-4"
          />
          <v-select
            v-model="selectedCategory"
            :items="categories"
            label="Category"
            dense
            clearable
            hide-details
            style="max-width: 180px;"
          />
        </v-col>
      </v-row>
  
      <!-- Product Grid -->
      <v-row>
        <v-col
          v-for="(product, index) in filteredProducts"
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
  
      <v-alert v-if="filteredProducts.length === 0" type="info" class="mt-6">
        No products match your search or filter.
      </v-alert>
    </v-container>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  
  const search = ref('')
  const selectedCategory = ref(null)
  
  const categories = ['Electronics', 'Shoes', 'Accessories']
  
  const products = ref([
    {
      name: 'Wireless Headphones',
      price: 59.99,
      category: 'Electronics',
      image: 'https://cdn.vuetifyjs.com/images/cards/headphones.jpg'
    },
    {
      name: 'Smart Watch',
      price: 89.99,
      category: 'Electronics',
      image: 'https://cdn.vuetifyjs.com/images/cards/watch.jpg'
    },
    {
      name: 'Running Shoes',
      price: 49.99,
      category: 'Shoes',
      image: 'https://cdn.vuetifyjs.com/images/cards/shoes.jpg'
    },
    {
      name: 'Leather Wallet',
      price: 19.99,
      category: 'Accessories',
      image: 'https://cdn.vuetifyjs.com/images/cards/road.jpg'
    }
  ])
  
  const filteredProducts = computed(() => {
    return products.value.filter((product) => {
      const matchSearch = product.name.toLowerCase().includes(search.value.toLowerCase())
      const matchCategory = !selectedCategory.value || product.category === selectedCategory.value
      return matchSearch && matchCategory
    })
  })
  
  const goToProduct = (product) => {
    alert(`Viewing: ${product.name}`)
    // In future: router.push(`/product/${product._id}`)
  }
  </script>
  