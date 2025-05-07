<template>
    <v-container class="py-6">
      <h2 class="text-h5 font-weight-bold mb-4">💳 Your Payment Methods</h2>
  
      <v-alert v-if="cards.length === 0" type="info" border="start" colored-border>
        No payment methods added yet.
      </v-alert>
  
      <v-card
        v-for="(card, index) in cards"
        :key="index"
        class="mb-4"
        elevation="2"
        rounded="lg"
      >
        <v-card-title class="d-flex justify-space-between align-center">
          <div>
            <span class="font-weight-bold">{{ card.type }}</span><br />
            **** **** **** {{ card.last4 }}
          </div>
          <v-btn icon color="red" @click="removeCard(index)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-subtitle class="text-grey-darken-1">
          Expires {{ card.expiry }}
        </v-card-subtitle>
      </v-card>
  
      <v-btn color="primary" class="mt-4" @click="addCard">
        <v-icon start>mdi-plus</v-icon> Add Payment Method
      </v-btn>
    </v-container>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  // Mock card data (replace with backend later)
  const cards = ref([
    {
      type: 'Visa',
      last4: '1234',
      expiry: '06/27'
    },
    {
      type: 'Mastercard',
      last4: '5678',
      expiry: '11/25'
    }
  ])
  
  const removeCard = (index) => {
    cards.value.splice(index, 1)
  }
  
  const addCard = () => {
    alert('Redirecting to Add Payment Method screen...')
    // Future: router.push('/customer/add-card')
  }
  </script>
  