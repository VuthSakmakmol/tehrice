<template>
    <v-container fluid class="pa-0">
      <!-- Hero Carousel -->
      <v-carousel cycle height="400">
        <v-carousel-item
          v-for="(img, index) in carouselImages"
          :key="index"
          :src="img"
          cover
        />
      </v-carousel>
  
      <!-- Product Preview -->
      <v-container class="mt-8">
        <h2 class="text-h5 font-weight-bold mb-4">The Best Selling Rice Bag</h2>
        <v-row>
          <v-col
            v-for="(product, index) in sampleProducts"
            :key="index"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <v-card elevation="4" class="rounded-lg">
              <v-img :src="product.image" height="180px" cover />
              <v-card-title>{{ product.name }}</v-card-title>
              <v-card-subtitle>Price: {{ product.price }}$</v-card-subtitle>
              <v-card-actions>
                <v-btn icon color="pink">
                  <v-icon>mdi-heart-outline</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-container>
  </template>
  
  <script setup>
  const carouselImages = [
    '/images/rice1.jpg',
    '/images/rice2.jpg',
    '/images/rice3.jpg',
  ]
  
  const sampleProducts = [
    {
      name: 'Rice bag',
      price: 30,
      image: '/images/product1.jpg',
    },
    {
      name: 'Rice bag',
      price: 30,
      image: '/images/product1.jpg',
    },
    {
      name: 'Rice bag',
      price: 30,
      image: '/images/product1.jpg',
    },
    {
      name: 'Rice bag',
      price: 30,
      image: '/images/product1.jpg',
    },
  ]
  </script>
  
  <style scoped>
  h2 {
    font-family: 'Roboto', sans-serif;
  }
  </style>
  