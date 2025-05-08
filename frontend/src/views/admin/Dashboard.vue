<template>
  <v-container class="py-6">
    <h2 class="text-h5 font-weight-bold mb-4">Admin Dashboard</h2>

    <!-- Delivery Card -->
    <v-card class="pa-4 mb-4" elevation="2" @click="goToDeliveryManager" style="cursor: pointer;">
      <v-row align-center="center" justify="space-between">
        <v-col cols="auto">
          <v-icon color="green" size="32">mdi-truck-delivery</v-icon>
        </v-col>
        <v-col>
          <div class="text-h6">Total Deliveries</div>
          <div class="text-subtitle-1 font-weight-bold">{{ deliveryCount }}</div>
        </v-col>
        <v-col cols="auto">
          <v-btn color="green" variant="text">Manage</v-btn>
        </v-col>
      </v-row>
    </v-card>

    <!-- Customer Card -->
    <v-card class="pa-4 mb-4" elevation="2" @click="goToCustomerManager" style="cursor: pointer;">
      <v-row align-center="center" justify="space-between">
        <v-col cols="auto">
          <v-icon color="orange" size="32">mdi-account-multiple</v-icon>
        </v-col>
        <v-col>
          <div class="text-h6">Total Customers</div>
          <div class="text-subtitle-1 font-weight-bold">{{ customerCount }}</div>
        </v-col>
        <v-col cols="auto">
          <v-btn color="orange" variant="text">Manage</v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/plugins/axios'
import { useRouter } from 'vue-router'

const router = useRouter()
const deliveryCount = ref(0)
const customerCount = ref(0)

const fetchDeliveryCount = async () => {
  try {
    const res = await api.get('/deliveries')
    deliveryCount.value = res.data.length
  } catch (err) {
    console.error('❌ Failed to load delivery count:', err)
  }
}

const fetchCustomerCount = async () => {
  try {
    const res = await api.get('/customers')
    customerCount.value = res.data.length
  } catch (err) {
    console.error('❌ Failed to load customer count:', err)
  }
}

const goToDeliveryManager = () => router.push('/admin/deliveries')
const goToCustomerManager = () => router.push('/admin/customers')


onMounted(() => {
  fetchDeliveryCount()
  fetchCustomerCount()
})
</script>
