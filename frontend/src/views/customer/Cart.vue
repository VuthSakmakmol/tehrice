<template>
    <v-container class="py-6">
      <h2 class="text-h5 font-weight-bold mb-4">🛒 Your Cart</h2>
  
      <v-alert v-if="items.length === 0" type="info" border="start" colored-border>
        Your cart is empty. Start shopping now!
      </v-alert>
  
      <v-table v-else density="compact" class="mb-4">
        <thead>
          <tr>
            <th class="text-left">Product</th>
            <th class="text-left">Price</th>
            <th class="text-left">Qty</th>
            <th class="text-left">Subtotal</th>
            <th class="text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in items" :key="index">
            <td>{{ item.name }}</td>
            <td>${{ item.price.toFixed(2) }}</td>
            <td>
              <v-btn icon size="x-small" @click="decreaseQty(index)">
                <v-icon>mdi-minus</v-icon>
              </v-btn>
              {{ item.quantity }}
              <v-btn icon size="x-small" @click="increaseQty(index)">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </td>
            <td>${{ (item.price * item.quantity).toFixed(2) }}</td>
            <td>
              <v-btn icon color="red" @click="removeItem(index)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
  
      <div class="text-right">
        <div class="text-h6 font-weight-bold mb-2">
          Total: ${{ totalPrice.toFixed(2) }}
        </div>
        <v-btn color="primary" :disabled="items.length === 0" @click="checkout">
          Proceed to Checkout
        </v-btn>
      </div>
    </v-container>
  </template>
  
  <script setup>
  import { useCartStore } from '@/stores/cartStore'
  import { computed } from 'vue'
  
  const cartStore = useCartStore()
  const items = computed(() => cartStore.items)
  
  const increaseQty = (i) => cartStore.increaseQuantity(i)
  const decreaseQty = (i) => cartStore.decreaseQuantity(i)
  const removeItem = (i) => cartStore.removeItem(i)
  
  const totalPrice = computed(() =>
    items.value.reduce((total, item) => total + item.price * item.quantity, 0)
  )
  
  const checkout = () => {
    alert('Checkout not implemented yet')
    // Future: redirect to /checkout or call API
  }
  </script>
  