<template>
    <v-container class="py-6">
      <h2 class="text-h5 font-weight-bold mb-6">📦 Your Orders</h2>
  
      <v-alert v-if="orders.length === 0" type="info" border="start" colored-border>
        You haven’t placed any orders yet.
      </v-alert>
  
      <v-table v-else density="compact">
        <thead>
          <tr>
            <th class="text-left">Order ID</th>
            <th class="text-left">Date</th>
            <th class="text-left">Items</th>
            <th class="text-left">Total</th>
            <th class="text-left">Status</th>
            <th class="text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(order, index) in orders" :key="index">
            <td>{{ order.orderId }}</td>
            <td>{{ order.date }}</td>
            <td>{{ order.items.length }}</td>
            <td>${{ order.total.toFixed(2) }}</td>
            <td>
              <v-chip
                :color="statusColor(order.status)"
                size="small"
                text-color="white"
                label
              >
                {{ order.status }}
              </v-chip>
            </td>
            <td>
              <v-btn variant="text" color="primary" @click="viewOrder(order)">Details</v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-container>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  // Mock orders (replace with API call)
  const orders = ref([
    {
      orderId: 'ORD-1001',
      date: '2025-05-01',
      items: [{ name: 'Watch' }, { name: 'Shoes' }],
      total: 139.98,
      status: 'Shipped',
    },
    {
      orderId: 'ORD-1002',
      date: '2025-05-05',
      items: [{ name: 'Backpack' }],
      total: 39.99,
      status: 'Processing',
    },
  ])
  
  const statusColor = (status) => {
    switch (status) {
      case 'Processing': return 'blue'
      case 'Shipped': return 'green'
      case 'Cancelled': return 'red'
      default: return 'grey'
    }
  }
  
  const viewOrder = (order) => {
    alert(`Viewing order: ${order.orderId}`)
    // In future: router.push(`/customer/orders/${order._id}`)
  }
  </script>
  